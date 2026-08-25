package com.dinesh.student_manager.Controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.dinesh.student_manager.Entity.AppUser;
import com.dinesh.student_manager.Entity.RefreshToken;
import com.dinesh.student_manager.Entity.Student;
import com.dinesh.student_manager.Entity.StudentStatus;
import com.dinesh.student_manager.Repository.StudentRepository;
import com.dinesh.student_manager.Repository.UserRepository;
import com.dinesh.student_manager.Service.RefreshTokenService;
import com.dinesh.student_manager.dto.JwtResponse;
import com.dinesh.student_manager.dto.LoginRequest;
import com.dinesh.student_manager.dto.MessageResponse;
import com.dinesh.student_manager.dto.RefreshTokenRequest;
import com.dinesh.student_manager.dto.RegisterRequest;
import com.dinesh.student_manager.security.JwtService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {

        private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

        private final AuthenticationManager authenticationManager;
        private final JwtService jwtService;
        private final RefreshTokenService refreshTokenService;
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final StudentRepository studentRepository;

        public AuthController(
                        AuthenticationManager authenticationManager,
                        JwtService jwtService,
                        RefreshTokenService refreshTokenService,
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder,
                        StudentRepository studentRepository) {

                this.authenticationManager = authenticationManager;
                this.jwtService = jwtService;
                this.refreshTokenService = refreshTokenService;
                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.studentRepository = studentRepository;
        }

        // LOGIN
        @PostMapping("/login")
        public ResponseEntity<JwtResponse> login(
                        @Valid @RequestBody LoginRequest request) {

                logger.info(
                                "Login request received for username: {}",
                                request.getUsername());

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getUsername(),
                                                request.getPassword()));

                logger.info(
                                "Authentication successful for username: {}",
                                request.getUsername());

                AppUser user = userRepository
                                .findByUsername(request.getUsername())
                                .orElseThrow(() -> new RuntimeException(
                                                "User not found"));

                String accessToken = jwtService.generateToken(
                                user.getUsername(),
                                user.getRole());

                RefreshToken refreshToken = refreshTokenService.createRefreshToken(
                                user.getUsername());

                logger.info(
                                "Access token and refresh token generated for username: {}",
                                request.getUsername());

                return ResponseEntity.ok(
                                new JwtResponse(
                                                accessToken,
                                                refreshToken.getToken()));
        }

        // REFRESH ACCESS TOKEN
        @PostMapping("/refresh")
        public ResponseEntity<JwtResponse> refreshToken(
                        @Valid @RequestBody RefreshTokenRequest request) {

                String requestRefreshToken = request.getRefreshToken();

                logger.info(
                                "Refresh token request received");

                RefreshToken refreshToken = refreshTokenService
                                .findByToken(requestRefreshToken)
                                .map(refreshTokenService::verifyExpiration)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Refresh token not found"));

                String username = refreshToken.getUser().getUsername();

                String role = refreshToken.getUser().getRole();

                String newAccessToken = jwtService.generateToken(
                                username,
                                refreshToken.getUser().getRole());

                RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(
                                username);

                logger.info(
                                "New access token generated using refresh token for username: {} with role: {}",
                                username,
                                role);

                return ResponseEntity.ok(
                                new JwtResponse(
                                                newAccessToken,
                                                newRefreshToken.getToken()));
        }

        // LOGOUT
        @PostMapping("/logout/{username}")
        public ResponseEntity<MessageResponse> logout(@PathVariable String username) {
                logger.info("Logout request received for username: {}", username);

                AppUser user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found: " + username));

                refreshTokenService.deleteByUser(user);

                logger.info("User logged out successfully: {}", username);

                return ResponseEntity.ok(new MessageResponse("Logged out successfully"));
        }

        // REGISTER
        @Transactional
        @PostMapping("/register")
        public ResponseEntity<?> register(
                        @Valid @RequestBody RegisterRequest request) {

                logger.info(
                                "Register request received for username: {}",
                                request.getUsername());

                // 1. Check username
                if (userRepository.existsByUsername(request.getUsername())) {

                        return ResponseEntity
                                        .badRequest()
                                        .body(Map.of(
                                                        "message",
                                                        "Username already exists"));
                }

                // 2. Check email
                if (studentRepository.existsByEmail(request.getEmail())) {

                        return ResponseEntity
                                        .badRequest()
                                        .body(Map.of(
                                                        "message",
                                                        "Email already exists"));
                }

                // =========================================
                // 3. CREATE APP USER
                // =========================================

                AppUser user = new AppUser();

                user.setUsername(
                                request.getUsername());

                user.setPassword(
                                passwordEncoder.encode(
                                                request.getPassword()));

                // Never take role from frontend
                user.setRole("USER");

                // Save user
                AppUser savedUser = userRepository.save(user);

                // =========================================
                // 4. CREATE STUDENT
                // =========================================

                Student student = new Student();

                student.setFullName(
                                request.getFullName());

                student.setEmail(
                                request.getEmail());

                student.setPhone(
                                request.getPhone());

                student.setGender(
                                request.getGender());

                student.setAddress(
                                request.getAddress());

                student.setStatus(
                                StudentStatus.ACTIVE);

                // =========================================
                // 5. CONNECT STUDENT WITH USER
                // =========================================

                student.setUser(savedUser);

                // =========================================
                // 6. SAVE STUDENT
                // =========================================

                Student savedStudent = studentRepository.save(student);

                // =========================================
                // 7. RESPONSE
                // =========================================

                logger.info(
                                "User and student created successfully: {}",
                                savedUser.getUsername());

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(
                                                Map.of(
                                                                "message",
                                                                "Registration successful",

                                                                "username",
                                                                savedUser.getUsername(),

                                                                "role",
                                                                savedUser.getRole(),

                                                                "studentId",
                                                                savedStudent.getId()));
        }


}