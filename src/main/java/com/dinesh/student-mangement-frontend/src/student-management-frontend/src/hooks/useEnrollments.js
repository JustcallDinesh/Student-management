import { useEffect, useState } from "react";

import {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../services/enrollmentService";

import { getStudents } from "../services/studentService";
import { getCourses } from "../services/courseService";

const initialFormState = {
  studentId: "",
  courseId: "",
  enrollmentDate: "",
  status: "ENROLLED",
};

const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [editingEnrollmentId, setEditingEnrollmentId] = useState(null);

  const [formData, setFormData] = useState(initialFormState);

  //--------------------------------------------------------

  const loadPageData = async () => {
    try {
      setLoading(true);

      const [
        enrollmentResponse,
        studentResponse,
        courseResponse,
      ] = await Promise.all([
        getEnrollments(),
        getStudents(),
        getCourses(),
      ]);

      setEnrollments(enrollmentResponse.data || []);
      setStudents(studentResponse.data || []);
      setCourses(courseResponse.data || []);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  //--------------------------------------------------------

  useEffect(() => {
    loadPageData();
  }, []);

  //--------------------------------------------------------

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //--------------------------------------------------------

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingEnrollmentId(null);
  };

  //--------------------------------------------------------

  const handleEdit = (enrollment) => {
    setEditingEnrollmentId(enrollment.id);

    setFormData({
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      enrollmentDate: enrollment.enrollmentDate,
      status: enrollment.status,
    });

    setSuccessMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //--------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);
    setSuccessMessage("");
    setError("");

    try {
      const payload = {
        studentId: Number(formData.studentId),
        courseId: Number(formData.courseId),
        enrollmentDate: formData.enrollmentDate,
        status: formData.status,
      };

      if (editingEnrollmentId) {
        await updateEnrollment(editingEnrollmentId, payload);

        setSuccessMessage(
          "Enrollment updated successfully."
        );
      } else {
        await createEnrollment(payload);

        setSuccessMessage(
          "Student enrolled successfully."
        );
      }

      resetForm();

      await loadPageData();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save enrollment.");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  //--------------------------------------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this enrollment?"
    );

    if (!confirmed) return;

    try {
      await deleteEnrollment(id);

      setSuccessMessage(
        "Enrollment deleted successfully."
      );

      await loadPageData();
    } catch (err) {
      console.error(err);

      setError("Failed to delete enrollment.");
    }
  };

  //--------------------------------------------------------

  return {
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
  };
};

export default useEnrollments;