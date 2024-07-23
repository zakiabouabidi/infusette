package com.example.infusette.web.dto;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.example.infusette.dao.entites.User;


public record AuthenticationUserDTO(
        Long id,
        String email,
        List<String> roles) {
    public static AuthenticationUserDTO toAuthenticationUserDTO(User user) {
        List<String> roles = user.getRole().getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .toList();
        return new AuthenticationUserDTO(user.getId(), user.getEmail(), roles);
    }
}
