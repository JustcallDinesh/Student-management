import EnrollmentHeader from "../components/enrollments/EnrollmentHeader";
import EnrollmentForm from "../components/enrollments/EnrollmentForm";
import EnrollmentTable from "../components/enrollments/EnrollmentTable";

import useEnrollments from "../hooks/useEnrollments";

const EnrollmentsPage = () => {
  const {
    enrollments,
    students,
    courses,

    loading,
    submitLoading,

    error,
    successMessage,

    editingEnrollmentId,

    formData,

    loadPageData,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useEnrollments();

  return (
    <div className="space-y-6">

      <EnrollmentHeader
        loadPageData={loadPageData}
      />

      <EnrollmentForm
        students={students}
        courses={courses}

        formData={formData}

        handleChange={handleChange}
        handleSubmit={handleSubmit}

        editingEnrollmentId={editingEnrollmentId}
        resetForm={resetForm}

        submitLoading={submitLoading}

        successMessage={successMessage}
        error={error}
      />

      <EnrollmentTable
        enrollments={enrollments}
        loading={loading}

        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default EnrollmentsPage;