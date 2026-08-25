package com.dinesh.student_manager.dto;

import java.util.List;

public class StudentDashboardResponse {

    private StudentProfileResponse profile;

    private int totalCourses;

    private int activeCourses;

    private int completedCourses;

    private List<MyCourseResponse> courses;

    private List<PublicCourseDetailsResponse> availableCourses;

    public StudentDashboardResponse() {
    }

    public StudentDashboardResponse(
            StudentProfileResponse profile,
            int totalCourses,
            int activeCourses,
            int completedCourses,
            List<MyCourseResponse> courses,
            List<PublicCourseDetailsResponse> availableCourses) {

        this.profile = profile;
        this.totalCourses = totalCourses;
        this.activeCourses = activeCourses;
        this.completedCourses = completedCourses;
        this.courses = courses;
        this.availableCourses = availableCourses;
    }

    // getters and setters
}