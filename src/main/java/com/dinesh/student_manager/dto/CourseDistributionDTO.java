package com.dinesh.student_manager.dto;

// package com.dinesh.student_manager.dto;

public class CourseDistributionDTO {

    private String course;
    private long enrollments;

    public CourseDistributionDTO() {
    }

    public CourseDistributionDTO(String course, long enrollments) {
        this.course = course;
        this.enrollments = enrollments;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public long getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(long enrollments) {
        this.enrollments = enrollments;
    }
}
