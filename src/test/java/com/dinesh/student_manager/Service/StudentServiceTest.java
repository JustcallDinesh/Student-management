//package com.dinesh.student_manager.Service;
//
////package com.dinesh.student_manager.Service;
//
//import com.dinesh.student_manager.Entity.Student;
//import com.dinesh.student_manager.Repository.StudentRepository;
//import com.dinesh.student_manager.dto.StudentRequestDTO;
//import com.dinesh.student_manager.dto.StudentResponseDTO;
//import com.dinesh.student_manager.exception.StudentNotFoundException;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//class StudentServiceTest {
//
//    @Mock
//    private StudentRepository repository;
//
//    @InjectMocks
//    private StudentService studentService;
//
//    private Student student;
//    private StudentRequestDTO requestDTO;
//
//    @BeforeEach
//    void setUp() {
//        student = new Student();
//        student.setId(1L);
//        student.setName("Dinesh");
//        student.setCourse("Java");
//
//        requestDTO = new StudentRequestDTO();
//        requestDTO.setName("Dinesh");
//        requestDTO.setCourse("Java");
//    }
//
//    @Test
//    void saveStudent_shouldSaveAndReturnResponseDTO() {
//        when(repository.save(any(Student.class))).thenReturn(student);
//
//        StudentResponseDTO response = studentService.saveStudent(requestDTO);
//
//        assertNotNull(response);
//        assertEquals(1L, response.getId());
//        assertEquals("Dinesh", response.getName());
//        assertEquals("Java", response.getCourse());
//
//        verify(repository, times(1)).save(any(Student.class));
//    }
//
//    @Test
//    void getStudentById_shouldReturnStudent_whenStudentExists() {
//        when(repository.findById(1L)).thenReturn(Optional.of(student));
//
//        StudentResponseDTO response = studentService.getStudentById(1L);
//
//        assertNotNull(response);
//        assertEquals(1L, response.getId());
//        assertEquals("Dinesh", response.getName());
//        assertEquals("Java", response.getCourse());
//
//        verify(repository, times(1)).findById(1L);
//    }
//
//    @Test
//    void getStudentById_shouldThrowException_whenStudentNotFound() {
//        when(repository.findById(99L)).thenReturn(Optional.empty());
//
//        StudentNotFoundException exception = assertThrows(
//                StudentNotFoundException.class,
//                () -> studentService.getStudentById(99L)
//        );
//
//        assertEquals("Student not found with id: 99", exception.getMessage());
//        verify(repository, times(1)).findById(99L);
//    }
//
//    @Test
//    void updateStudentById_shouldUpdateStudentAndReturnResponseDTO() {
//        StudentRequestDTO updateDto = new StudentRequestDTO();
//        updateDto.setName("Arun");
//        updateDto.setCourse("Spring Boot");
//
//        Student updatedStudent = new Student();
//        updatedStudent.setId(1L);
//        updatedStudent.setName("Arun");
//        updatedStudent.setCourse("Spring Boot");
//
//        when(repository.findById(1L)).thenReturn(Optional.of(student));
//        when(repository.save(any(Student.class))).thenReturn(updatedStudent);
//
//        StudentResponseDTO response = studentService.updateStudentById(1L, updateDto);
//
//        assertNotNull(response);
//        assertEquals(1L, response.getId());
//        assertEquals("Arun", response.getName());
//        assertEquals("Spring Boot", response.getCourse());
//
//        verify(repository, times(1)).findById(1L);
//        verify(repository, times(1)).save(any(Student.class));
//    }
//
//    @Test
//    void deleteById_shouldDeleteStudent_whenStudentExists() {
//        when(repository.findById(1L)).thenReturn(Optional.of(student));
//
//        studentService.deleteById(1L);
//
//        verify(repository, times(1)).findById(1L);
//        verify(repository, times(1)).delete(student);
//    }
//
//    @Test
//    void deleteById_shouldThrowException_whenStudentNotFound() {
//        when(repository.findById(99L)).thenReturn(Optional.empty());
//
//        StudentNotFoundException exception = assertThrows(
//                StudentNotFoundException.class,
//                () -> studentService.deleteById(99L)
//        );
//
//        assertEquals("Student not found with id: 99", exception.getMessage());
//        verify(repository, times(1)).findById(99L);
//        verify(repository, never()).delete(any(Student.class));
//    }
//}
