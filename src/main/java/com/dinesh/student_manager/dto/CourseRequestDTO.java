package com.dinesh.student_manager.dto;

//package com.dinesh.student_manager.dto;

import java.math.BigDecimal;

import com.dinesh.student_manager.Entity.Course.CourseStatus;

//import com.dinesh.student_manager.Entity.CourseStatus;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CourseRequestDTO {

    @NotBlank(message = "Course code is required")
    @Size(max = 30, message = "Course code must be at most 30 characters")
    private String courseCode;

    @NotBlank(message = "Course title is required")
    @Size(max = 100, message = "Course title must be at most 100 characters")
    private String title;

    @Size(max = 500, message = "Description must be at most 500 characters")
    private String description;

    @NotNull(message = "Duration is required")
    private Integer durationInMonths;

    @NotNull(message = "Fee is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Fee must be zero or positive")
    private BigDecimal fee;

    @NotNull(message = "Course status is required")
    private CourseStatus status;

    public CourseRequestDTO() {
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
}
