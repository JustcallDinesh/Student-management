package com.dinesh.student_manager.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dinesh.student_manager.Entity.Student;
import com.dinesh.student_manager.Entity.StudentStatus;

@Repository
public interface StudentRepository
		extends JpaRepository<Student, Long> {
	Optional<Student> findByFullName(String fullName);

	Optional<Student> findByFullNameAndEmail(String fullName, String email);

	boolean existsByEmail(String email);

	
	@Query("SELECT s FROM Student s")
	List<Student> getAllStudentsJPQL();

	long countByStatus(StudentStatus status);

	List<Student> findTop5ByOrderByIdDesc();
	Optional<Student> findByEmail(String email);
	Optional<Student> findByUserUsername(String username);

	// @Query("""
	// SELECT s FROM Student s
	// WHERE s.fullname=:fullname
	// AND s.course=:course
	// """)
	// List<Student> findByFullNameAndCourse(
	// @Param("name") String fullname,
	// @Param("course") String course
	// );
	//
	// //native query Execution part
	// @Query(
	// value = """
	// SELECT COUNT(*)
	// FROM students
	// """,
	// nativeQuery = true)
	// Long countStudentsNative();

	
}
