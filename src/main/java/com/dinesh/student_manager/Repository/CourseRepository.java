package com.dinesh.student_manager.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dinesh.student_manager.Entity.Course.Course;
import com.dinesh.student_manager.dto.PublicCourseDetailsResponse;
import com.dinesh.student_manager.dto.PublicCourseResponse;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCourseCode(String courseCode);

    List<Course> findByTitleContainingIgnoreCase(String title);

    boolean existsByCourseCode(String courseCode);

    @Query("""
            SELECT new com.dinesh.student_manager.dto.PublicCourseResponse(
                c.id,
                c.title,
                c.description,
                COUNT(e.id)
            )
            FROM Course c
            LEFT JOIN c.enrollments e
            WHERE c.status = com.dinesh.student_manager.Entity.Course.CourseStatus.ACTIVE
            GROUP BY c.id, c.title, c.description
            ORDER BY c.id
            """)
    List<PublicCourseResponse> findPublicCourses();

    @Query("""
            SELECT new com.dinesh.student_manager.dto.PublicCourseDetailsResponse(
                c.id,
                c.courseCode,
                c.title,
                c.description,
                c.durationInMonths,
                c.fee,
                COUNT(e.id)
            )
            FROM Course c
            LEFT JOIN c.enrollments e
            WHERE c.id = :id
              AND c.status = com.dinesh.student_manager.Entity.Course.CourseStatus.ACTIVE
            GROUP BY
                c.id,
                c.courseCode,
                c.title,
                c.description,
                c.durationInMonths,
                c.fee
            """)
    Optional<PublicCourseDetailsResponse> findPublicCourseById(
            @Param("id") Long id);
}