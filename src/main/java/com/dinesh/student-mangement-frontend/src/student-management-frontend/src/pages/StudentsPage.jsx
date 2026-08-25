import StudentHeader from "../components/students/StudentHeader";
import StudentForm from "../components/students/StudentForm";
import StudentTable from "../components/students/StudentTable";

import useStudents from "../hooks/useStudents";
import StudentSearch from "../components/students/StudentSearch";
import Pagination from "../components/students/Pagination";
import ConfirmModal from "../components/common/ConfirmModal";
import TableSkeleton from "../components/common/TableSkeleton";
import EmptyState from "../components/common/EmptyState";

const StudentsPage = () => {
  const {
    students,
    loading,
    filteredStudents,
    statusFilter,
    setStatusFilter,
    sortedStudents,
    handleSort,
    sortField,
    sortDirection,

    searchTerm,
    setSearchTerm,
    formData,
    error,
    successMessage,
    submitLoading,
    editingStudentId,

    paginatedStudents,

    currentPage,

    totalPages,

    previousPage,

    nextPage,

    goToPage,

    fetchStudents,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,

    selectedStudent,
    deleteLoading,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useStudents();

  return (
    <div className="space-y-6">
      <StudentHeader fetchStudents={fetchStudents} />

      <StudentSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        totalStudents={students.length}
        filteredCount={filteredStudents.length}
      />

      {loading ? (
        <TableSkeleton />
      ) : paginatedStudents.length === 0 ? (
        <EmptyState
          title="No Students Found"
          description="There are no students available. Create your first student to get started."
          buttonText="Add Student"
          onButtonClick={() => setShowForm(true)}
        />
      ) : (
        <>
          <StudentTable
            students={paginatedStudents}
            handleEdit={handleEdit}
            openDeleteModal={openDeleteModal}
            handleSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            previousPage={previousPage}
            nextPage={nextPage}
            goToPage={goToPage}
          />
        </>
      )}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Student"
        message={
          selectedStudent
            ? `Are you sure you want to delete "${selectedStudent.fullName}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />

      <StudentForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingStudentId={editingStudentId}
        resetForm={resetForm}
        submitLoading={submitLoading}
        successMessage={successMessage}
        error={error}
      />
    </div>
  );
};

export default StudentsPage;
