package com.example.infusette.business.services;

import org.springframework.security.core.Authentication;

import com.example.infusette.dao.entites.User;
import com.example.infusette.exception.DuplicateUserException;
import com.example.infusette.web.dto.AuthenticationUserDTO;
public interface AuthenticationService {
   
    User register(User user) throws DuplicateUserException;
   AuthenticationUserDTO login(Authentication authentication);
}
