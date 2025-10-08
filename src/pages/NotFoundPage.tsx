import { ArrowLeftIcon } from "@phosphor-icons/react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer pointer-fine:hover:-translate-y-1 active:bg-blue-700 transition"
        onClick={() => window.history.back()}
      >
        <ArrowLeftIcon className="w-4 h-4 inline-block mr-2" />
        Go Back
      </button>
    </div>
  );
}
