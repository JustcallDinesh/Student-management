package com.dinesh.student_manager.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dinesh.student_manager.Entity.AppUser;
import com.dinesh.student_manager.Repository.UserRepository;
import com.dinesh.student_manager.dto.RegisterRequest;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByUsername(
                request.getUsername())) {

            return "Username already exists";
        }

        AppUser user = new AppUser();

        user.setUsername(
                request.getUsername());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole(
                request.getRole());

        userRepository.save(user);

        return "User Registered Successfully";
    }
}
