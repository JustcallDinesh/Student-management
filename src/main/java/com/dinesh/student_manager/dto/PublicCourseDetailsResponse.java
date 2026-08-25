package com.dinesh.student_manager.dto;

import java.math.BigDecimal;

public class PublicCourseDetailsResponse {

    private Long id;
    private String courseCode;
    private String title;
    private String description;
    private Integer durationInMonths;
    private BigDecimal fee;
    private long studentCount;

    public PublicCourseDetailsResponse() {
    }

    public PublicCourseDetailsResponse(
            Long id,
            String courseCode,
            String title,
            String description,
            Integer durationInMonths,
            BigDecimal fee,
            long studentCount) {

        this.id = id;
        this.courseCode = courseCode;
        this.title = title;
        this.description = description;
        this.durationInMonths = durationInMonths;
        this.fee = fee;
        this.studentCount = studentCount;
    }

    public Long getId() {
        return id;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public String getTitle() {
        return title;
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

    public long getStudentCount() {
        return studentCount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDurationInMonths(Integer durationInMonths) {
        this.durationInMonths = durationInMonths;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public void setStudentCount(long studentCount) {
        this.studentCount = studentCount;
    }
}