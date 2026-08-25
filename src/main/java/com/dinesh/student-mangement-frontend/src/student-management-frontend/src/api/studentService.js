import api from "../services/api";


export const getMyProfile = async () => {
  const response = await api.get("/student/profile");
  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await api.get("/student/enrollments");
  return response.data;
};