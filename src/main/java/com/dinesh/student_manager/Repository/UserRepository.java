package com.dinesh.student_manager.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dinesh.student_manager.Entity.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByUsername(String username);

    boolean existsByUsername(String username);}

