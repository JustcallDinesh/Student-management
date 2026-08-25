import { useCallback, useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

const useDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
    activeStudents: 0,
  });

  const [enrollmentTrend, setEnrollmentTrend] = useState([]);

  const [courseDistribution, setCourseDistribution] = useState([]);

  const [recentStudents, setRecentStudents] = useState([]);

  const [recentEnrollments, setRecentEnrollments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const loadDashboard = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [
        statsData,
        enrollmentTrendData,
        courseDistributionData,
        recentStudentsData,
        recentEnrollmentsData,
      ] = await Promise.all([
        dashboardService.getStats(),

        dashboardService.getEnrollmentTrend(),

        dashboardService.getCourseDistribution(),

        dashboardService.getRecentStudents(),

        dashboardService.getRecentEnrollments(),
      ]);

      setStats({
        students: statsData?.totalStudents ?? 0,
        courses: statsData?.totalCourses ?? 0,
        enrollments: statsData?.totalEnrollments ?? 0,
        activeStudents: statsData?.activeStudents ?? 0,
      });

      setEnrollmentTrend(enrollmentTrendData || []);

      setCourseDistribution(courseDistributionData || []);

      setRecentStudents(recentStudentsData || []);

      setRecentEnrollments(recentEnrollmentsData || []);
    } catch (err) {
      console.error("Dashboard loading failed:", err);

      setError("Unable to load dashboard data. Please try again.");
    } finally {
      setLoading(false);

      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    stats,
    enrollmentTrend,
    courseDistribution,
    recentStudents,
    recentEnrollments,

    loading,
    refreshing,
    error,

    refreshDashboard: () => loadDashboard(true),
  };
};

export default useDashboard;
