import api from "./api";

// ===============================
// GET ALL ENROLLMENTS
// ===============================

export const getEnrollments = () => {
  return api.get("/enrollments");
};

// ===============================
// GET ENROLLMENT BY ID
// ===============================

export const getEnrollmentById = (id) => {
  return api.get(`/enrollments/${id}`);
};

// ===============================
// CREATE ENROLLMENT
// ===============================

export const createEnrollment = (enrollment) => {
  return api.post("/enrollments", enrollment);
};

// ===============================
// UPDATE ENROLLMENT
// ===============================

export const updateEnrollment = (id, enrollment) => {
  return api.put(`/enrollments/${id}`, enrollment);
};

// ===============================
// DELETE ENROLLMENT
// ===============================

export const deleteEnrollment = (id) => {
  return api.delete(`/enrollments/${id}`);
};

// ===============================
// GET ENROLLMENTS BY STUDENT
// ===============================

export const getEnrollmentsByStudent = (studentId) => {
  return api.get(`/enrollments/student/${studentId}`);
};

// ===============================
// GET ENROLLMENTS BY COURSE
// ===============================

export const getEnrollmentsByCourse = (courseId) => {
  return api.get(`/enrollments/course/${courseId}`);
};