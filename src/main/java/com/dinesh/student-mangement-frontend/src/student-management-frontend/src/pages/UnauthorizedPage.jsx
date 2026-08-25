import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl">

        <div className="text-7xl font-bold text-red-400">
          403
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Access Denied
        </h1>

        <p className="mt-3 text-slate-300">
          You do not have permission to access this page.
        </p>

        <Link
          to="/dashboard"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
};

export default UnauthorizedPage;