import { useEffect, useState } from "react";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService";

const initialFormState = {
  courseCode: "",
  title: "",
  description: "",
  durationInMonths: "",
  fee: "",
  status: "ACTIVE",
};

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [editingCourseId, setEditingCourseId] = useState(null);

  const [formData, setFormData] = useState(initialFormState);

  //--------------------------------------------------

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await getCourses();

      setCourses(response.data || []);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  //--------------------------------------------------

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //--------------------------------------------------

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingCourseId(null);
  };

  //--------------------------------------------------

  const handleEdit = (course) => {
    setEditingCourseId(course.id);

    setFormData({
      courseCode: course.courseCode || "",
      title: course.title || "",
      description: course.description || "",
      durationInMonths: course.durationInMonths || "",
      fee: course.fee || "",
      status: course.status || "ACTIVE",
    });

    setError("");
    setSuccessMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //--------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = {
        ...formData,
        durationInMonths: Number(formData.durationInMonths),
        fee: Number(formData.fee),
      };

      if (editingCourseId) {
        await updateCourse(editingCourseId, payload);

        setSuccessMessage("Course updated successfully");
      } else {
        await createCourse(payload);

        setSuccessMessage("Course added successfully");
      }

      resetForm();

      await fetchCourses();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to save course");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  //--------------------------------------------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) return;

    try {
      await deleteCourse(id);

      setSuccessMessage("Course deleted successfully");

      fetchCourses();
    } catch (err) {
      console.error(err);

      setError("Failed to delete course");
    }
  };

  //--------------------------------------------------

  return {
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
  };
};

export default useCourses;