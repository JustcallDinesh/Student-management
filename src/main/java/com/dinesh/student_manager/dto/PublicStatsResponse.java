package com.dinesh.student_manager.dto;

public class PublicStatsResponse {

    private long totalStudents;
    private long totalCourses;
    private long totalEnrollments;
    private long activeStudents;

    public PublicStatsResponse() {
    }

    public PublicStatsResponse(
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

    public long getTotalCourses() {
        return totalCourses;
    }

    public long getTotalEnrollments() {
        return totalEnrollments;
    }

    public long getActiveStudents() {
        return activeStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public void setTotalCourses(long totalCourses) {
        this.totalCourses = totalCourses;
    }

    public void setTotalEnrollments(long totalEnrollments) {
        this.totalEnrollments = totalEnrollments;
    }

    public void setActiveStudents(long activeStudents) {
        this.activeStudents = activeStudents;
    }
}