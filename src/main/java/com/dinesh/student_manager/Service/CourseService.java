package com.dinesh.student_manager.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.dinesh.student_manager.Entity.Course.Course;
//import com.dinesh.student_manager.Entity.Course;
import com.dinesh.student_manager.Repository.CourseRepository;
import com.dinesh.student_manager.dto.CourseRequestDTO;
import com.dinesh.student_manager.dto.CourseResponseDTO;

@Service
public class CourseService {

    private static final Logger logger =
            LoggerFactory.getLogger(CourseService.class);

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public CourseResponseDTO createCourse(CourseRequestDTO dto) {
        logger.info("Creating course with code: {}", dto.getCourseCode());

        if (courseRepository.existsByCourseCode(dto.getCourseCode())) {
            throw new RuntimeException("Course already exists with code: " + dto.getCourseCode());
        }

        Course course = new Course();
        mapRequestToCourse(dto, course);

        Course savedCourse = courseRepository.save(course);

        logger.info("Course created successfully with id: {}", savedCourse.getId());

        return mapToResponseDTO(savedCourse);
    }

    public List<CourseResponseDTO> getAllCourses() {
        logger.info("Fetching all courses");

        return courseRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public CourseResponseDTO getCourseById(Long id) {
        logger.info("Fetching course by id: {}", id);

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        return mapToResponseDTO(course);
    }

    public CourseResponseDTO updateCourse(Long id, CourseRequestDTO dto) {
        logger.info("Updating course with id: {}", id);

        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        if (!existingCourse.getCourseCode().equals(dto.getCourseCode())
                && courseRepository.existsByCourseCode(dto.getCourseCode())) {
            throw new RuntimeException("Another course already exists with code: " + dto.getCourseCode());
        }

        mapRequestToCourse(dto, existingCourse);

        Course updatedCourse = courseRepository.save(existingCourse);

        logger.info("Course updated successfully with id: {}", updatedCourse.getId());

        return mapToResponseDTO(updatedCourse);
    }

    public void deleteCourse(Long id) {
        logger.info("Deleting course with id: {}", id);

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        courseRepository.delete(course);

        logger.info("Course deleted successfully with id: {}", id);
    }

    private void mapRequestToCourse(CourseRequestDTO dto, Course course) {
        course.setCourseCode(dto.getCourseCode());
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setDurationInMonths(dto.getDurationInMonths());
        course.setFee(dto.getFee());
        course.setStatus(dto.getStatus());
    }

    private CourseResponseDTO mapToResponseDTO(Course course) {
        return new CourseResponseDTO(
                course.getId(),
                course.getCourseCode(),
                course.getTitle(),
                course.getDescription(),
                course.getDurationInMonths(),
                course.getFee(),
                course.getStatus(),
                course.getCreatedAt(),
                course.getUpdatedAt()
        );
    }
}