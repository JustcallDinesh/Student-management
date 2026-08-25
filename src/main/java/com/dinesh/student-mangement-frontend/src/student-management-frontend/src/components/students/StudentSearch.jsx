import { FaMagnifyingGlass } from "react-icons/fa6";

const StudentSearch = ({
  searchTerm,
  setSearchTerm,
  
  statusFilter,
  setStatusFilter,
  
  totalStudents,
  filteredCount,
}) => {
  return (
    <div className="glass-card rounded-3xl p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Side */}

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}

          <div className="relative">

            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-80 rounded-2xl py-3 pl-12 pr-4"
            />

          </div>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="glass-input rounded-2xl px-4 py-3"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>

        </div>

        {/* Counter */}

        <div className="text-sm text-slate-300">

          Showing

          <span className="mx-2 font-bold text-white">
            {filteredCount}
          </span>

          of

          <span className="mx-2 font-bold text-indigo-300">
            {totalStudents}
          </span>

          students

        </div>

      </div>
    </div>
  );
};

export default StudentSearch;