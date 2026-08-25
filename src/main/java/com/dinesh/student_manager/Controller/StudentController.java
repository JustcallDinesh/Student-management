package com.dinesh.student_manager.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dinesh.student_manager.Service.StudentService;
import com.dinesh.student_manager.dto.StudentRequestDTO;
import com.dinesh.student_manager.dto.StudentResponseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // =========================
    // ADMIN ONLY
    // =========================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudentResponseDTO createStudent(
            @Valid @RequestBody StudentRequestDTO dto) {

        return studentService.createStudent(dto);
    }


    // =========================
    // ADMIN + USER
    // =========================

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public List<StudentResponseDTO> getAllStudents() {

        return studentService.getAllStudents();
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public StudentResponseDTO getStudentById(
            @PathVariable Long id) {

        return studentService.getStudentById(id);
    }


    // =========================
    // ADMIN ONLY
    // =========================

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public StudentResponseDTO updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequestDTO dto) {

        return studentService.updateStudent(id, dto);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully";
    }

    
}