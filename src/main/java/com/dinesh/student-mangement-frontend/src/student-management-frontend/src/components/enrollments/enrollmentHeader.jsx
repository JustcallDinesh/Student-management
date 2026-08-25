const EnrollmentHeader = ({ loadPageData }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Enrollments
        </h2>

        <p className="mt-1 text-slate-500">
          Manage student course enrollments.
        </p>
      </div>

      <button
        onClick={loadPageData}
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>
  );
};

export default EnrollmentHeader;