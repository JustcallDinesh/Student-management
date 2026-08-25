import { FaSort, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { isAdmin } from "../../utils/permissions";
import { useAuth } from "../../context/AuthContext";
const renderSortIcon = (field, sortField, sortDirection) => {
  if (sortField !== field) {
    return <FaSort className="inline ml-2 text-slate-400" />;
  }

  return sortDirection === "asc" ? (
    <FaArrowUp className="inline ml-2 text-indigo-500" />
  ) : (
    <FaArrowDown className="inline ml-2 text-indigo-500" />
  );
};
const StudentTable = ({
  loading,
  students,
  handleEdit,
  handleDelete,
  handleSort,
  sortField,
  sortDirection,

  isDeleteModalOpen,
  selectedStudent,
  deleteLoading,

  openDeleteModal,
  closeDeleteModal,
  confirmDelete,
}) => {
  const { role } = useAuth();
  return (
    <div className="rounded-xl  p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Student List</h3>

      {loading ? (
        <p className="text-slate-500">Loading students...</p>
      ) : students.length === 0 ? (
        <div className="py-10 text-center text-slate-400">
          No students found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th
                  onClick={() => handleSort("id")}
                  className="cursor-pointer px-4 py-3 text-left"
                >
                  ID
                  {renderSortIcon("id", sortField, sortDirection)}
                </th>

                <th
                  onClick={() => handleSort("fullName")}
                  className="cursor-pointer px-4 py-3 text-left"
                >
                  Full Name
                  {renderSortIcon("fullName", sortField, sortDirection)}
                </th>

                <th
                  onClick={() => handleSort("email")}
                  className="cursor-pointer px-4 py-3 text-left"
                >
                  Email
                  {renderSortIcon("email", sortField, sortDirection)}
                </th>

                <th
                  onClick={() => handleSort("phone")}
                  className="cursor-pointer px-4 py-3 text-left"
                >
                  Phone
                  {renderSortIcon("phone", sortField, sortDirection)}
                </th>

                <th
                  onClick={() => handleSort("dateOfBirth")}
                  className="cursor-pointer px-4 py-3 text-left"
                >
                  DOB
                  {renderSortIcon("dateOfBirth", sortField, sortDirection)}
                </th>

                <th
                  onClick={() => handleSort("gender")}
                  className="cursor-pointer px-4 py-3 text-left"
                >
                  Gender
                  {renderSortIcon("gender", sortField, sortDirection)}
                </th>

                <th
                  onClick={() => handleSort("status")}
                  className="cursor-pointer px-4 py-3 text-left"
                >
                  Status
                  {renderSortIcon("status", sortField, sortDirection)}
                </th>

                <th className="px-4 py-3 text-left">Address</th>

                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 hover:bg-cyan-800  transition"
                >
                  <td className="px-4 py-3">{student.id}</td>

                  <td className="px-4 py-3 font-medium">{student.fullName}</td>

                  <td className="px-4 py-3">{student.email}</td>

                  <td className="px-4 py-3">{student.phone}</td>

                  <td className="px-4 py-3">{student.dateOfBirth}</td>

                  <td className="px-4 py-3">{student.gender}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 max-w-xs truncate">
                    {student.address}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      {isAdmin(role)&&(
                        <button
                        onClick={() => handleEdit(student)}
                        className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 transition"
                      >
                        Edit
                      </button>
                      )}

                      {isAdmin(role) && (
                        <button
                          onClick={() => openDeleteModal(student)}
                          className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
