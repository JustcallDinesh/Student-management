package com.dinesh.student_manager.dto;

// package com.dinesh.student_manager.dto;

public class EnrollmentTrendDTO {

    private String month;
    private long enrollments;

    public EnrollmentTrendDTO() {
    }

    public EnrollmentTrendDTO(String month, long enrollments) {
        this.month = month;
        this.enrollments = enrollments;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public long getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(long enrollments) {
        this.enrollments = enrollments;
    }
}