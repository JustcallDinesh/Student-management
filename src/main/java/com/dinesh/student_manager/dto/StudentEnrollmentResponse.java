package com.dinesh.student_manager.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.dinesh.student_manager.Entity.EnrollmentStatus;

public class StudentEnrollmentResponse {

    private Long enrollmentId;

    private Long courseId;

    private String courseCode;

    private String courseTitle;

    private String description;

    private Integer durationInMonths;

    private BigDecimal fee;

    private LocalDate enrollmentDate;

    private EnrollmentStatus status;

    public StudentEnrollmentResponse() {
    }

    public StudentEnrollmentResponse(
            Long enrollmentId,
            Long courseId,
            String courseCode,
            String courseTitle,
            String description,
            Integer durationInMonths,
            BigDecimal fee,
            LocalDate enrollmentDate,
            EnrollmentStatus status) {

        this.enrollmentId = enrollmentId;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.description = description;
        this.durationInMonths = durationInMonths;
        this.fee = fee;
        this.enrollmentDate = enrollmentDate;
        this.status = status;
    }

    public Long getEnrollmentId() {
        return enrollmentId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public String getDescription() {
        return description;
    }

    public Integer getDurationInMonths() {
        return durationInMonths;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public EnrollmentStatus getStatus() {
        return status;
    }
}