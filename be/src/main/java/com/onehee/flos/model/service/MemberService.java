package com.onehee.flos.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenResponse;
import com.onehee.flos.model.dto.request.LoginRequestDTO;
import com.onehee.flos.model.dto.request.SignUpRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {
    void signUp(SignUpRequestDTO signUpRequestDTO);
    TokenResponse login(LoginRequestDTO loginRequestDTO) throws JsonProcessingException;
}
