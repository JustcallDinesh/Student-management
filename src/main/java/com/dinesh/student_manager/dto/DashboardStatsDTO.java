package com.dinesh.student_manager.dto;

public class DashboardStatsDTO {

    private long totalStudents;
    private long totalCourses;
    private long totalEnrollments;
    private long activeStudents;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(
            long totalStudents,
            long totalCourses,
            long totalEnrollments,
            long activeStudents) {

        this.totalStudents = totalStudents;
        this.totalCourses = totalCourses;
        this.totalEnrollments = totalEnrollments;
        this.activeStudents = activeStudents;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalCourses() {
        return totalCourses;
    }

    public void setTotalCourses(long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public long getTotalEnrollments() {
        return totalEnrollments;
    }

    public void setTotalEnrollments(long totalEnrollments) {
        this.totalEnrollments = totalEnrollments;
    }

    public long getActiveStudents() {
        return activeStudents;
    }

    public void setActiveStudents(long activeStudents) {
        this.activeStudents = activeStudents;
    }
}