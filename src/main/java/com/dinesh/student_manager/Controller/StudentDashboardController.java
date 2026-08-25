package com.dinesh.student_manager.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinesh.student_manager.Service.StudentService;
import com.dinesh.student_manager.dto.StudentEnrollmentResponse;
import com.dinesh.student_manager.dto.StudentProfileResponse;

@RestController
@RequestMapping("/student")
public class StudentDashboardController {

    private final StudentService studentService;

    public StudentDashboardController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileResponse> getMyProfile(
            Authentication authentication) {

        String username = authentication.getName();

        StudentProfileResponse profile = studentService.getStudentProfile(username);

        return ResponseEntity.ok(profile);
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<StudentEnrollmentResponse>> getMyEnrollments(
            Authentication authentication) {

        String username = authentication.getName();

        List<StudentEnrollmentResponse> enrollments = studentService.getMyEnrollments(username);

        return ResponseEntity.ok(enrollments);
    }
}