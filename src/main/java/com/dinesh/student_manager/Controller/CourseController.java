package com.dinesh.student_manager.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.dinesh.student_manager.Service.CourseService;
import com.dinesh.student_manager.dto.CourseRequestDTO;
import com.dinesh.student_manager.dto.CourseResponseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // =========================
    // ADMIN ONLY
    // =========================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourseResponseDTO createCourse(
            @Valid @RequestBody CourseRequestDTO dto) {

        return courseService.createCourse(dto);
    }


    // =========================
    // ADMIN + USER
    // =========================

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public List<CourseResponseDTO> getAllCourses() {

        return courseService.getAllCourses();
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public CourseResponseDTO getCourseById(
            @PathVariable Long id) {

        return courseService.getCourseById(id);
    }


    // =========================
    // ADMIN ONLY
    // =========================

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public CourseResponseDTO updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequestDTO dto) {

        return courseService.updateCourse(id, dto);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteCourse(
            @PathVariable Long id) {

        courseService.deleteCourse(id);

        return "Course deleted successfully";
    }
}