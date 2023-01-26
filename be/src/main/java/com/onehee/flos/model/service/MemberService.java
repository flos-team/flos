package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.request.LoginRequestDTO;
import com.onehee.flos.model.dto.request.SignUpRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {
    void signUp(SignUpRequestDTO signUpRequestDTO);
    MemberResponseDTO login(LoginRequestDTO loginRequestDTO);
}
