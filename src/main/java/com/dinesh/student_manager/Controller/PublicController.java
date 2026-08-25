package com.dinesh.student_manager.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinesh.student_manager.Entity.StudentStatus;
import com.dinesh.student_manager.Repository.CourseRepository;
import com.dinesh.student_manager.Repository.EnrollmentRepository;
import com.dinesh.student_manager.Repository.StudentRepository;
import com.dinesh.student_manager.dto.PublicCourseDetailsResponse;
import com.dinesh.student_manager.dto.PublicCourseResponse;
import com.dinesh.student_manager.dto.PublicStatsResponse;

@RestController
@RequestMapping("/public")
public class PublicController {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;

    public PublicController(
            CourseRepository courseRepository,
            StudentRepository studentRepository,
            EnrollmentRepository enrollmentRepository) {

        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @GetMapping("/courses")
    public ResponseEntity<List<PublicCourseResponse>> getPublicCourses() {

        return ResponseEntity.ok(
                courseRepository.findPublicCourses());
    }

    @GetMapping("/stats")
    public ResponseEntity<PublicStatsResponse> getPublicStats() {

        long totalStudents = studentRepository.count();

        long totalCourses = courseRepository.count();

        long totalEnrollments = enrollmentRepository.count();

        long activeStudents = studentRepository.countByStatus(
                StudentStatus.ACTIVE);

        PublicStatsResponse response = new PublicStatsResponse(
                totalStudents,
                totalCourses,
                totalEnrollments,
                activeStudents);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<PublicCourseDetailsResponse> getPublicCourse(
            @PathVariable Long id) {

        return courseRepository.findPublicCourseById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}