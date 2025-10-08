// src/components/RecentPatients.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_PATIENTS } from "@/graphql/operations";
import type { Patient, PatientConnection } from "@/graphql/types";
import { useUIStore } from "@/store/uiStore";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { DotsThreeOutlineVerticalIcon as DotsIcon, PencilIcon, VideoCameraIcon, UserIcon } from "@phosphor-icons/react";
import { displayCondition, formatDate, statusBadge } from "@/utils/patientUI";

export default function RecentPatients() {
  const { page, pageSize, search, gender } = useUIStore();

  const variables = React.useMemo(
    () => ({ page, pageSize, search, gender: gender || undefined }),
    [page, pageSize, search, gender]
  );

  const { data, previousData, loading, error, networkStatus, refetch } = useQuery<{ patients: PatientConnection }>(
    GET_PATIENTS,
    {
      variables,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first", // after the first fetch, prefer cached results
      notifyOnNetworkStatusChange: true, // report loading when variables change
      returnPartialData: true, // keep something in `data`
    }
  );

  const result = data ?? previousData;
  const total = result?.patients?.total ?? 0;
  const rawNodes = result?.patients?.nodes ?? [];
  const isInitialLoading = loading && !previousData; // only true on very first load
  const isPageChanging = loading && !!previousData; // changing vars (page/search)

  const nodes: Patient[] = React.useMemo(
    () =>
      rawNodes.filter((p): p is Patient => {
        return !!p && typeof p.id === "string" && typeof p.name === "string";
      }),
    [rawNodes]
  );

  if (isInitialLoading) {
    return (
      <div className="flex items-center gap-2 mb-4 text-gray-500">
        <Spinner /> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 text-rose-600 text-sm">
        Failed to load patients.{" "}
        <button className="cursor-pointer text-blue-500 pointer-fine:hover:underline" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-medium leading-6 text-dark">Recent Patients</h3>
        <div className="flex items-center gap-3">
          {networkStatus === 4 ||
            (isPageChanging && (
              <span className="text-xs text-gray-500 flex items-center gap-2">
                <Spinner size="sm" /> Refreshing...
              </span>
            ))}
          <Link to="/patients" className="text-sm text-blue-500 hover:text-blue-700 font-medium">
            View all
          </Link>
        </div>
      </div>

      <div className="bg-white overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Visit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {nodes.map((p: Patient) => {
              const avatar = p.avatar ?? "";
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-slow">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {avatar ? (
                          <img className="h-10 w-10 rounded-full object-cover" src={avatar} alt={`${p.name} avatar`} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-dark">{p.name}</div>
                        <div className="text-sm text-gray-500">{displayCondition(p.conditions)}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(p.lastVisit)}</div>
                    <div className="text-sm text-gray-500">{p.visitType}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-500 cursor-pointer pointer-fine:hover:text-blue-700"
                        aria-label={`Edit ${p.name}`}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-500 cursor-pointer pointer-fine:hover:text-green-700"
                        aria-label={`Start video with ${p.name}`}
                      >
                        <VideoCameraIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-500 cursor-pointer pointer-fine:hover:text-gray-700"
                        aria-label={`More actions for ${p.name}`}
                      >
                        <DotsIcon weight="fill" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {nodes.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <Pagination total={total} />
      </div>
    </div>
  );
}
