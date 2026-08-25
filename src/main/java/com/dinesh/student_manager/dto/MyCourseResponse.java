package com.dinesh.student_manager.dto;

import java.time.LocalDate;

public class MyCourseResponse {

    private Long enrollmentId;

    private Long courseId;

    private String courseCode;

    private String title;

    private String description;

    private Integer durationInMonths;

    private LocalDate enrollmentDate;

    private String enrollmentStatus;

    public MyCourseResponse() {
    }

    public MyCourseResponse(
            Long enrollmentId,
            Long courseId,
            String courseCode,
            String title,
            String description,
            Integer durationInMonths,
            LocalDate enrollmentDate,
            String enrollmentStatus) {

        this.enrollmentId = enrollmentId;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.title = title;
        this.description = description;
        this.durationInMonths = durationInMonths;
        this.enrollmentDate = enrollmentDate;
        this.enrollmentStatus = enrollmentStatus;
    }

    // getters and setters
}