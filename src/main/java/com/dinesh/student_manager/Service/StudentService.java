package com.dinesh.student_manager.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.dinesh.student_manager.Entity.Student;
import com.dinesh.student_manager.Repository.StudentRepository;
import com.dinesh.student_manager.dto.StudentProfileResponse;
import com.dinesh.student_manager.dto.StudentRequestDTO;
import com.dinesh.student_manager.dto.StudentResponseDTO;
import com.dinesh.student_manager.exception.StudentNotFoundException;

import org.springframework.transaction.annotation.Transactional;

import com.dinesh.student_manager.Entity.Enrollment;
import com.dinesh.student_manager.Repository.EnrollmentRepository;
import com.dinesh.student_manager.dto.StudentEnrollmentResponse;

@Service
public class StudentService {

    private static final Logger logger = LoggerFactory.getLogger(StudentService.class);

    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;

    public StudentService(
            StudentRepository studentRepository,
            EnrollmentRepository enrollmentRepository) {

        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public StudentResponseDTO createStudent(StudentRequestDTO dto) {
        logger.info("Creating student with email: {}", dto.getEmail());

        if (studentRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Student already exists with email: " + dto.getEmail());
        }

        Student student = new Student();
        mapRequestToStudent(dto, student);

        Student savedStudent = studentRepository.save(student);

        logger.info("Student created successfully with id: {}", savedStudent.getId());

        return mapToResponseDTO(savedStudent);
    }

    public List<StudentResponseDTO> getAllStudents() {
        logger.info("Fetching all students");

        return studentRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public StudentResponseDTO getStudentById(Long id) {
        logger.info("Fetching student by id: {}", id);

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id: " + id));

        return mapToResponseDTO(student);
    }

    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO dto) {
        logger.info("Updating student with id: {}", id);

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id: " + id));

        if (!existingStudent.getEmail().equals(dto.getEmail())
                && studentRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Another student already exists with email: " + dto.getEmail());
        }

        mapRequestToStudent(dto, existingStudent);

        Student updatedStudent = studentRepository.save(existingStudent);

        logger.info("Student updated successfully with id: {}", updatedStudent.getId());

        return mapToResponseDTO(updatedStudent);
    }

    public void deleteStudent(Long id) {
        logger.info("Deleting student with id: {}", id);

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id: " + id));

        studentRepository.delete(student);

        logger.info("Student deleted successfully with id: {}", id);
    }

    private void mapRequestToStudent(StudentRequestDTO dto, Student student) {
        student.setFullName(dto.getFullName());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setDateOfBirth(dto.getDateOfBirth());
        student.setGender(dto.getGender());
        student.setAddress(dto.getAddress());
        student.setStatus(dto.getStatus());
    }

    private StudentResponseDTO mapToResponseDTO(Student student) {
        return new StudentResponseDTO(
                student.getId(),
                student.getFullName(),
                student.getEmail(),
                student.getPhone(),
                student.getDateOfBirth(),
                student.getGender(),
                student.getAddress(),
                student.getStatus(),
                student.getCreatedAt(),
                student.getUpdatedAt());
    }

    public StudentProfileResponse getStudentProfile(String username) {

        Student student = studentRepository
                .findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        return new StudentProfileResponse(
                student.getId(),
                student.getFullName(),
                student.getEmail(),
                student.getPhone(),
                student.getAddress(),
                student.getDateOfBirth(),
                student.getGender(),
                student.getStatus());
    }

    @Transactional(readOnly = true)
    public List<StudentEnrollmentResponse> getMyEnrollments(String username) {

        logger.info("Fetching enrollments for student username: {}", username);

        Student student = studentRepository
                .findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(student.getId());

        return enrollments.stream()
                .map(enrollment -> {

                    var course = enrollment.getCourse();

                    return new StudentEnrollmentResponse(
                            enrollment.getId(),
                            course.getId(),
                            course.getCourseCode(),
                            course.getTitle(),
                            course.getDescription(),
                            course.getDurationInMonths(),
                            course.getFee(),
                            enrollment.getEnrollmentDate(),
                            enrollment.getStatus());
                })
                .toList();
    }

}