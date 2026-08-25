package com.dinesh.student_manager.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dinesh.student_manager.Service.EnrollmentService;
import com.dinesh.student_manager.dto.EnrollmentRequestDTO;
import com.dinesh.student_manager.dto.EnrollmentResponseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    // ========================================
    // ADMIN ONLY - CREATE
    // ========================================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EnrollmentResponseDTO enrollStudent(
            @Valid @RequestBody EnrollmentRequestDTO dto) {

        return enrollmentService.enrollStudent(dto);
    }


    // ========================================
    // ADMIN + USER - READ
    // ========================================

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public List<EnrollmentResponseDTO> getAllEnrollments() {

        return enrollmentService.getAllEnrollments();
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public EnrollmentResponseDTO getEnrollmentById(
            @PathVariable Long id) {

        return enrollmentService.getEnrollmentById(id);
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/student/{studentId}")
    public List<EnrollmentResponseDTO> getEnrollmentsByStudentId(
            @PathVariable Long studentId) {

        return enrollmentService.getEnrollmentsByStudentId(studentId);
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/course/{courseId}")
    public List<EnrollmentResponseDTO> getEnrollmentsByCourseId(
            @PathVariable Long courseId) {

        return enrollmentService.getEnrollmentsByCourseId(courseId);
    }


    // ========================================
    // ADMIN ONLY - UPDATE
    // ========================================

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public EnrollmentResponseDTO updateEnrollment(
            @PathVariable Long id,
            @Valid @RequestBody EnrollmentRequestDTO dto) {

        return enrollmentService.updateEnrollment(id, dto);
    }


    // ========================================
    // ADMIN ONLY - DELETE
    // ========================================

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteEnrollment(
            @PathVariable Long id) {

        enrollmentService.deleteEnrollment(id);

        return "Enrollment deleted successfully";
    }
}