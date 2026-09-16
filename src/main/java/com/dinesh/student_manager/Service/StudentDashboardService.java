package com.dinesh.student_manager.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dinesh.student_manager.Entity.Enrollment;
import com.dinesh.student_manager.Entity.Student;
import com.dinesh.student_manager.Repository.CourseRepository;
import com.dinesh.student_manager.Repository.EnrollmentRepository;
import com.dinesh.student_manager.Repository.StudentRepository;
//import com.dinesh.student_manager.dto.StudentDashboardResponse;

@Service
public class StudentDashboardService {

	private final StudentRepository studentRepository;
	private final EnrollmentRepository enrollmentRepository;
	private final CourseRepository courseRepository;

	public StudentDashboardService(StudentRepository studentRepository, EnrollmentRepository enrollmentRepository,
			CourseRepository courseRepository) {

		this.studentRepository = studentRepository;
		this.enrollmentRepository = enrollmentRepository;
		this.courseRepository = courseRepository;
	}

	public StudentDashboardService getDashboard(String username) {

		Student student = studentRepository.findByUserUsername(username)
				.orElseThrow(() -> new RuntimeException("Student profile not found"));

		// get student's enrollments
		List<Enrollment> enrollments = enrollmentRepository.findByStudentId(student.getId());
		return null;

		// build dashboard response

		// return response
	}
}