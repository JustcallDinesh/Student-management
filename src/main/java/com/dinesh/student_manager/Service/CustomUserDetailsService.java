package com.dinesh.student_manager.Service;


import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dinesh.student_manager.Entity.AppUser;
import com.dinesh.student_manager.Repository.UserRepository;


@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository repository;

    public CustomUserDetailsService(
            UserRepository repository) {

        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String username)
            throws UsernameNotFoundException {

        AppUser appUser =
                repository.findByUsername(username)
                .orElseThrow(() ->
                    new UsernameNotFoundException(
                            "User not found"));

        return new User(
                appUser.getUsername(),
                appUser.getPassword(),
                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + appUser.getRole())));
    }
}
