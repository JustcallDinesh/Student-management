//package com.dinesh.student_manager.Controller;
//
//import com.dinesh.student_manager.Service.StudentService;
//import com.dinesh.student_manager.dto.StudentRequestDTO;
//import com.dinesh.student_manager.dto.StudentResponseDTO;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.eq;
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.when;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//
//@WebMvcTest(StudentController.class)
//class StudentControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private StudentService studentService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Test
//    @DisplayName("POST /students - should create student")
//    void testAddStudent() throws Exception {
//        StudentRequestDTO request = new StudentRequestDTO();
//        request.setName("Dinesh");
//        request.setCourse("Java");
//
//        StudentResponseDTO response =
//                new StudentResponseDTO(1L, "Dinesh", "Java");
//
//        when(studentService.saveStudent(any(StudentRequestDTO.class)))
//                .thenReturn(response);
//
//        mockMvc.perform(post("/students")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.name").value("Dinesh"))
//                .andExpect(jsonPath("$.course").value("Java"));
//    }
//
//    @Test
//    @DisplayName("GET /students - should return all students")
//    void testGetAllStudents() throws Exception {
//        List<StudentResponseDTO> students = List.of(
//                new StudentResponseDTO(1L, "Dinesh", "Java"),
//                new StudentResponseDTO(2L, "Arun", "Spring Boot")
//        );
//
//        when(studentService.getAllStudents()).thenReturn(students);
//
//        mockMvc.perform(get("/students"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.size()").value(2))
//                .andExpect(jsonPath("$[0].name").value("Dinesh"))
//                .andExpect(jsonPath("$[1].name").value("Arun"));
//    }
//
//    @Test
//    @DisplayName("GET /students/{id} - should return student by id")
//    void testGetStudentById() throws Exception {
//        StudentResponseDTO student =
//                new StudentResponseDTO(1L, "Dinesh", "Java");
//
//        when(studentService.getStudentById(1L)).thenReturn(student);
//
//        mockMvc.perform(get("/students/1"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.name").value("Dinesh"))
//                .andExpect(jsonPath("$.course").value("Java"));
//    }
//
//    @Test
//    @DisplayName("PUT /students/{id} - should update student")
//    void testUpdateStudent() throws Exception {
//        StudentRequestDTO request = new StudentRequestDTO();
//        request.setName("Updated Dinesh");
//        request.setCourse("Spring Boot");
//
//        StudentResponseDTO response =
//                new StudentResponseDTO(1L, "Updated Dinesh", "Spring Boot");
//
//        when(studentService.updateStudentById(eq(1L), any(StudentRequestDTO.class)))
//                .thenReturn(response);
//
//        mockMvc.perform(put("/students/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id").value(1))
//                .andExpect(jsonPath("$.name").value("Updated Dinesh"))
//                .andExpect(jsonPath("$.course").value("Spring Boot"));
//    }
//
//    @Test
//    @DisplayName("DELETE /students/{id} - should delete student")
//    void testDeleteStudent() throws Exception {
//        doNothing().when(studentService).deleteById(1L);
//
//        mockMvc.perform(delete("/students/1"))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Student deleted successfully"));
//    }
//
//    @Test
//    @DisplayName("POST /students - should return 400 when name is blank")
//    void testAddStudentValidationFailure() throws Exception {
//        StudentRequestDTO request = new StudentRequestDTO();
//        request.setName("");
//        request.setCourse("Java");
//
//        mockMvc.perform(post("/students")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isBadRequest());
//    }
//}