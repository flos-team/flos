package com.onehee.flos.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenResponse;
import com.onehee.flos.model.dto.request.LoginRequestDTO;
import com.onehee.flos.model.dto.request.MemberFindPasswordDTO;
import com.onehee.flos.model.dto.request.MemberSignUpRequestDTO;
import com.onehee.flos.model.dto.request.MemberUpdateRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {

    void createMember(MemberSignUpRequestDTO memberSignUpRequestDTO);

    TokenResponse login(LoginRequestDTO loginRequestDTO) throws JsonProcessingException;

    void updateMember(MemberUpdateRequestDTO memberUpdateRequestDTO);

    void deleteMember();

    void resetPassword(MemberFindPasswordDTO memberFindPasswordDTO);

}
