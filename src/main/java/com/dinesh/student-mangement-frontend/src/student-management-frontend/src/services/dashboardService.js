import api from "./api";

const dashboardService = {

  getStats: async () => {
    const response = await api.get("/dashboard/stats");
    console.log(response.data)
    return response.data;
  },

  getEnrollmentTrend: async () => {
    const response = await api.get(
      "/dashboard/enrollment-trend"
    );

    return response.data;
  },

  getCourseDistribution: async () => {
    const response = await api.get(
      "/dashboard/course-distribution"
    );
    console.log(response.data)

    return response.data;
  },

  getRecentStudents: async () => {
    const response = await api.get(
      "/dashboard/recent-students"
    );

    return response.data;
  },

  getRecentEnrollments: async () => {
    const response = await api.get(
      "/dashboard/recent-enrollments"
    );

    return response.data;
  },

};

export default dashboardService;