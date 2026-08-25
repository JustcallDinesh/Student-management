package com.dinesh.student_manager.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dinesh.student_manager.Entity.Enrollment;
import com.dinesh.student_manager.Entity.Student;
import com.dinesh.student_manager.Entity.Course.Course;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudentId(Long studentId);

    List<Enrollment> findByCourseId(Long courseId);

    Optional<Enrollment> findByStudentAndCourse(Student student, Course course);

    boolean existsByStudentAndCourse(Student student, Course course);

    @Query(value = """
            SELECT
                TO_CHAR(enrollment_date, 'Mon') AS month,
                COUNT(*) AS enrollments
            FROM enrollments
            WHERE enrollment_date >= CURRENT_DATE - INTERVAL '11 months'
            GROUP BY
                DATE_TRUNC('month', enrollment_date),
                TO_CHAR(enrollment_date, 'Mon')
            ORDER BY
                DATE_TRUNC('month', enrollment_date)
            """, nativeQuery = true)
    List<Object[]> getEnrollmentTrend();

    @Query(value = """
            SELECT
                c.title AS course,
                COUNT(e.id) AS enrollments
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            GROUP BY c.id, c.title
            ORDER BY COUNT(e.id) DESC
            """, nativeQuery = true)
    List<Object[]> getCourseDistribution();

    List<Enrollment> findTop5ByOrderByEnrollmentDateDesc();
}
