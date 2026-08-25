package com.dinesh.student_manager.security;

import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

        @Value("${jwt.secret}")
        private String secret;

        private Key getSignKey() {

                return Keys.hmacShaKeyFor(
                                secret.getBytes());
        }

        public String generateToken(String username, String role) {

                return Jwts.builder()
                                .subject(username)
                                .claim("role", role)
                                .issuedAt(new Date())
                                .expiration(
                                                new Date(
                                                                System.currentTimeMillis()
                                                                                + 1000L * 60 * 60 * 24))
                                .signWith(getSignKey())
                                .compact();
        }

        public String extractUsername(
                        String token) {

                return Jwts.parser()
                                .verifyWith(
                                                (javax.crypto.SecretKey) getSignKey())
                                .build()
                                .parseSignedClaims(token)
                                .getPayload()
                                .getSubject();
        }

        public boolean isTokenValid(
                        String token,
                        String username) {

                String extractedUsername = extractUsername(token);

                return extractedUsername
                                .equals(username);
        }

}
