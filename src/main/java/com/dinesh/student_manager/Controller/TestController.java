package com.dinesh.student_manager.Controller;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinesh.student_manager.Entity.AppUser;
import com.dinesh.student_manager.Repository.UserRepository;

@RestController
public class TestController {
	private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public TestController(
            UserRepository repository,
            PasswordEncoder passwordEncoder) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }
	    @GetMapping("/users")
	    public List<AppUser> getUsers() {

	        return repository.findAll();
	    }
	    @GetMapping("/encode")
	    public String encode() {
	        return passwordEncoder.encode("1234");
	    }
}
