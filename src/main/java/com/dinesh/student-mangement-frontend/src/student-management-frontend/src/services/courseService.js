import api from "./api";

// ===============================
// GET ALL COURSES
// ===============================

export const getCourses = () => {
  return api.get("/courses");
};

// ===============================
// GET COURSE BY ID
// ===============================

export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};

// ===============================
// CREATE COURSE
// ===============================

export const createCourse = (course) => {
  return api.post("/courses", course);
};

// ===============================
// UPDATE COURSE
// ===============================

export const updateCourse = (id, course) => {
  return api.put(`/courses/${id}`, course);
};

// ===============================
// DELETE COURSE
// ===============================

export const deleteCourse = (id) => {
  return api.delete(`/courses/${id}`);
};