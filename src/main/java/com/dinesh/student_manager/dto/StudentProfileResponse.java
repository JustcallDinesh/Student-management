package com.dinesh.student_manager.dto;

import java.time.LocalDate;

import com.dinesh.student_manager.Entity.StudentStatus;

public class StudentProfileResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
    private String gender;
    private StudentStatus status;

    public StudentProfileResponse() {
    }

    public StudentProfileResponse(
            Long id,
            String fullName,
            String email,
            String phone,
            String address,
            LocalDate dateOfBirth,
            String gender,
            StudentStatus status) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public StudentStatus getStatus() {
        return status;
    }
}