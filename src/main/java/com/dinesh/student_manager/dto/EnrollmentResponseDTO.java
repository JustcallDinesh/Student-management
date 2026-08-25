package com.dinesh.student_manager.dto;

//package com.dinesh.student_manager.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.dinesh.student_manager.Entity.EnrollmentStatus;

public class EnrollmentResponseDTO {

    private Long id;

    private Long studentId;
    private String studentName;

    private Long courseId;
    private String courseCode;
    private String courseTitle;

    private LocalDate enrollmentDate;
    private EnrollmentStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public EnrollmentResponseDTO() {
    }

    public EnrollmentResponseDTO(Long id,
                                 Long studentId,
                                 String studentName,
                                 Long courseId,
                                 String courseCode,
                                 String courseTitle,
                                 LocalDate enrollmentDate,
                                 EnrollmentStatus status,
                                 LocalDateTime createdAt,
                                 LocalDateTime updatedAt) {
        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseId = courseId;
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.enrollmentDate = enrollmentDate;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getStudentName() {
        return studentName;
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

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public EnrollmentStatus getStatus() {
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

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public void setStatus(EnrollmentStatus status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
