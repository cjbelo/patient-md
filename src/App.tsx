import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet, redirect } from "react-router-dom";
import { isAuthed } from "@/utils/auth";
import Spinner from "@/components/Spinner";
import MainLayout from "@/layouts/MainLayout";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const PatientsPage = lazy(() => import("@/pages/PatientsPage"));
const AppointmentsPage = lazy(() => import("@/pages/AppointmentsPage"));
const VideoConsultPage = lazy(() => import("@/pages/VideoConsultPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function RootLayout() {
  return (
    <Suspense
      fallback={
        <div className="p-4">
          <Spinner />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}

async function indexLoader() {
  return isAuthed() ? redirect("/dashboard") : redirect("/login");
}

async function loginLoader() {
  if (isAuthed()) return redirect("/dashboard");
  return null;
}

async function protectedLoader() {
  if (!isAuthed()) return redirect("/login");
  return null;
}

function ProtectedLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, loader: indexLoader, element: <div /> },
      { path: "login", loader: loginLoader, element: <LoginPage /> },
      {
        loader: protectedLoader,
        element: <ProtectedLayout />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "patients", element: <PatientsPage /> },
          { path: "appointments", element: <AppointmentsPage /> },
          { path: "video-consultation", element: <VideoConsultPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
