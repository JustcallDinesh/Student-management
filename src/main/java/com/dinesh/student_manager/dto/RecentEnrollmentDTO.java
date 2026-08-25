package com.dinesh.student_manager.dto;

public class RecentEnrollmentDTO {

    private Long id;
    private String studentName;
    private String courseName;
    private String enrollmentDate;
    private String status;

    public RecentEnrollmentDTO() {
    }

    public RecentEnrollmentDTO(
            Long id,
            String studentName,
            String courseName,
            String enrollmentDate,
            String status) {

        this.id = id;
        this.studentName = studentName;
        this.courseName = courseName;
        this.enrollmentDate = enrollmentDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(String enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}