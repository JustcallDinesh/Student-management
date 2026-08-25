package com.dinesh.student_manager.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dinesh.student_manager.Entity.StudentStatus;
import com.dinesh.student_manager.Repository.CourseRepository;
import com.dinesh.student_manager.Repository.EnrollmentRepository;
import com.dinesh.student_manager.Repository.StudentRepository;
import com.dinesh.student_manager.dto.CourseDistributionDTO;
import com.dinesh.student_manager.dto.DashboardStatsDTO;
import com.dinesh.student_manager.dto.EnrollmentTrendDTO;
import com.dinesh.student_manager.dto.RecentEnrollmentDTO;
import com.dinesh.student_manager.dto.RecentStudentDTO;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public DashboardServiceImpl(
            StudentRepository studentRepository,
            CourseRepository courseRepository,
            EnrollmentRepository enrollmentRepository) {

        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public DashboardStatsDTO getDashboardStats() {

        long totalStudents = studentRepository.count();

        long totalCourses = courseRepository.count();

        long totalEnrollments = enrollmentRepository.count();

        long activeStudents = studentRepository.countByStatus(StudentStatus.ACTIVE);

        return new DashboardStatsDTO(
                totalStudents,
                totalCourses,
                totalEnrollments,
                activeStudents);
    }

    @Override
    public List<EnrollmentTrendDTO> getEnrollmentTrend() {

        List<Object[]> results = enrollmentRepository.getEnrollmentTrend();

        return results.stream()
                .map(row -> new EnrollmentTrendDTO(
                        (String) row[0],
                        ((Number) row[1]).longValue()))
                .toList();
    }

    @Override
    public List<CourseDistributionDTO> getCourseDistribution() {

        List<Object[]> results = enrollmentRepository.getCourseDistribution();

        return results.stream()
                .map(row -> new CourseDistributionDTO(
                        (String) row[0],
                        ((Number) row[1]).longValue()))
                .toList();
    }

    @Override
    public List<RecentStudentDTO> getRecentStudents() {

        return studentRepository
                .findTop5ByOrderByIdDesc()
                .stream()
                .map(student -> new RecentStudentDTO(
                        student.getId(),
                        student.getFullName(),
                        student.getEmail(),
                        student.getStatus().name()))
                .toList();
    }

    @Override
    public List<RecentEnrollmentDTO> getRecentEnrollments() {

        return enrollmentRepository
                .findTop5ByOrderByEnrollmentDateDesc()
                .stream()
                .map(enrollment -> new RecentEnrollmentDTO(
                        enrollment.getId(),
                        enrollment.getStudent().getFullName(),
                        enrollment.getCourse().getTitle(),
                        enrollment.getEnrollmentDate().toString(),
                        enrollment.getStatus().name()))
                .toList();
    }
}