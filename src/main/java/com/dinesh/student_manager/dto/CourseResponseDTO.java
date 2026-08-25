package com.dinesh.student_manager.dto;

//package com.dinesh.student_manager.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.dinesh.student_manager.Entity.Course.CourseStatus;

//import com.dinesh.student_manager.Entity.CourseStatus;

public class CourseResponseDTO {

    private Long id;
    private String courseCode;
    private String title;
    private String description;
    private Integer durationInMonths;
    private BigDecimal fee;
    private CourseStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CourseResponseDTO() {
    }

    public CourseResponseDTO(Long id,
                             String courseCode,
                             String title,
                             String description,
                             Integer durationInMonths,
                             BigDecimal fee,
                             CourseStatus status,
                             LocalDateTime createdAt,
                             LocalDateTime updatedAt) {
        this.id = id;
        this.courseCode = courseCode;
        this.title = title;
        this.description = description;
        this.durationInMonths = durationInMonths;
        this.fee = fee;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public CourseStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
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

    public void setStatus(CourseStatus status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
