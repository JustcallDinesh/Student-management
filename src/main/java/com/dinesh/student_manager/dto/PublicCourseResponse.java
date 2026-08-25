package com.dinesh.student_manager.dto;

public class PublicCourseResponse {

    private Long id;
    private String title;
    private String description;
    private long studentCount;

    public PublicCourseResponse() {
    }

    public PublicCourseResponse(
            Long id,
            String title,
            String description,
            long studentCount) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.studentCount = studentCount;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public long getStudentCount() {
        return studentCount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStudentCount(long studentCount) {
        this.studentCount = studentCount;
    }
}