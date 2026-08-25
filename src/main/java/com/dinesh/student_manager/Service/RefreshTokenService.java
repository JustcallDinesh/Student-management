package com.dinesh.student_manager.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dinesh.student_manager.Entity.AppUser;
import com.dinesh.student_manager.Entity.RefreshToken;
import com.dinesh.student_manager.Repository.RefreshTokenRepository;
import com.dinesh.student_manager.Repository.UserRepository;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    private final long refreshTokenDurationMs = 7 * 24 * 60 * 60 * 1000; // 7 days

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository,
                               UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public RefreshToken createRefreshToken(String username) {

        AppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        Optional<RefreshToken> existingTokenOptional = refreshTokenRepository.findByUser(user);

        RefreshToken refreshToken;

        if (existingTokenOptional.isPresent()) {
            // update existing row instead of inserting a new one
            refreshToken = existingTokenOptional.get();
        } else {
            // create new row only if user has no refresh token yet
            refreshToken = new RefreshToken();
            refreshToken.setUser(user);
        }

        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token was expired. Please login again.");
        }
        return token;
    }

    @Transactional
    public void deleteByUser(AppUser user) {
        refreshTokenRepository.deleteByUser(user);
    }
}