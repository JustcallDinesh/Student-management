import CourseHeader from "../components/courses/CourseHeader";
import CourseForm from "../components/courses/CourseForm";
import CourseTable from "../components/courses/CourseTable";

import useCourses from "../hooks/useCourses";

const CoursesPage = () => {
  const {
    courses,
    loading,

    formData,

    error,
    successMessage,

    submitLoading,

    editingCourseId,

    fetchCourses,

    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useCourses();

  return (
    <div className="space-y-6">

      <CourseHeader
        fetchCourses={fetchCourses}
      />

      <CourseTable
        courses={courses}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <CourseForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingCourseId={editingCourseId}
        resetForm={resetForm}
        submitLoading={submitLoading}
        successMessage={successMessage}
        error={error}
      />

      

    </div>
  );
};

export default CoursesPage;