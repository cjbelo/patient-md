import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet, redirect } from "react-router-dom";
import { isAuthed } from "@/utils/auth";
import Spinner from "./components/Spinner";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const PatientsPage = lazy(() => import("@/pages/PatientsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function RootLayout() {
  return (
    <>
      <Suspense
        fallback={
          <div className="p-4">
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
}

async function indexLoader() {
  return isAuthed() ? redirect("/dashboard") : redirect("/login");
}

async function dashboardLoader() {
  if (!isAuthed()) return redirect("/login");
  return null;
}

async function loginLoader() {
  if (isAuthed()) return redirect("/dashboard");
  return null;
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, loader: indexLoader, element: <div /> },
      { path: "dashboard", loader: dashboardLoader, element: <DashboardPage /> },
      { path: "patients", loader: dashboardLoader, element: <PatientsPage /> },
      { path: "login", loader: loginLoader, element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
