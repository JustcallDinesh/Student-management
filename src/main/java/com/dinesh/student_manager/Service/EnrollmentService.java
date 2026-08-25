package com.dinesh.student_manager.Service;

//package com.dinesh.student_manager.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

//import com.dinesh.student_manager.Entity.Course;
import com.dinesh.student_manager.Entity.Enrollment;
import com.dinesh.student_manager.Entity.Student;
import com.dinesh.student_manager.Entity.Course.Course;
import com.dinesh.student_manager.Repository.CourseRepository;
import com.dinesh.student_manager.Repository.EnrollmentRepository;
import com.dinesh.student_manager.Repository.StudentRepository;
import com.dinesh.student_manager.dto.EnrollmentRequestDTO;
import com.dinesh.student_manager.dto.EnrollmentResponseDTO;
import com.dinesh.student_manager.exception.StudentNotFoundException;

@Service
public class EnrollmentService {

    private static final Logger logger =
            LoggerFactory.getLogger(EnrollmentService.class);

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             StudentRepository studentRepository,
                             CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    public EnrollmentResponseDTO enrollStudent(EnrollmentRequestDTO dto) {
        logger.info("Enrollment request received for studentId={} and courseId={}",
                dto.getStudentId(), dto.getCourseId());

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with id: " + dto.getStudentId()));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException(
                        "Course not found with id: " + dto.getCourseId()));

        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            throw new RuntimeException("Student is already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(dto.getEnrollmentDate());
        enrollment.setStatus(dto.getStatus());

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);

        logger.info("Enrollment created successfully with id: {}", savedEnrollment.getId());

        return mapToResponseDTO(savedEnrollment);
    }

    public List<EnrollmentResponseDTO> getAllEnrollments() {
        logger.info("Fetching all enrollments");

        return enrollmentRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public EnrollmentResponseDTO getEnrollmentById(Long id) {
        logger.info("Fetching enrollment by id: {}", id);

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + id));

        return mapToResponseDTO(enrollment);
    }

    public List<EnrollmentResponseDTO> getEnrollmentsByStudentId(Long studentId) {
        logger.info("Fetching enrollments by studentId: {}", studentId);

        return enrollmentRepository.findByStudentId(studentId)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public List<EnrollmentResponseDTO> getEnrollmentsByCourseId(Long courseId) {
        logger.info("Fetching enrollments by courseId: {}", courseId);

        return enrollmentRepository.findByCourseId(courseId)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public EnrollmentResponseDTO updateEnrollment(Long id, EnrollmentRequestDTO dto) {
        logger.info("Updating enrollment with id: {}", id);

        Enrollment existingEnrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + id));

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with id: " + dto.getStudentId()));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException(
                        "Course not found with id: " + dto.getCourseId()));

        existingEnrollment.setStudent(student);
        existingEnrollment.setCourse(course);
        existingEnrollment.setEnrollmentDate(dto.getEnrollmentDate());
        existingEnrollment.setStatus(dto.getStatus());

        Enrollment updatedEnrollment = enrollmentRepository.save(existingEnrollment);

        logger.info("Enrollment updated successfully with id: {}", updatedEnrollment.getId());

        return mapToResponseDTO(updatedEnrollment);
    }

    public void deleteEnrollment(Long id) {
        logger.info("Deleting enrollment with id: {}", id);

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + id));

        enrollmentRepository.delete(enrollment);

        logger.info("Enrollment deleted successfully with id: {}", id);
    }

    private EnrollmentResponseDTO mapToResponseDTO(Enrollment enrollment) {
        return new EnrollmentResponseDTO(
                enrollment.getId(),
                enrollment.getStudent().getId(),
                enrollment.getStudent().getFullName(),
                enrollment.getCourse().getId(),
                enrollment.getCourse().getCourseCode(),
                enrollment.getCourse().getTitle(),
                enrollment.getEnrollmentDate(),
                enrollment.getStatus(),
                enrollment.getCreatedAt(),
                enrollment.getUpdatedAt()
        );
    }
}