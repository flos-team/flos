package com.onehee.flos.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenDTO;
import com.onehee.flos.model.dto.LogoutDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Member;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface MemberService {

    void createMember(MemberSignUpRequestDTO memberSignUpRequestDTO);

    TokenDTO login(LoginRequestDTO loginRequestDTO) throws JsonProcessingException;

    MemberResponseDTO updateMember(MemberUpdateRequestDTO memberUpdateRequestDTO);

    void deleteMember();

    void resetPassword(MemberResetPasswordDTO memberResetPasswordDTO);

    boolean isExistEmail(MemberEmailCheckRequestDTO memberEmailCheckRequestDTO);

    boolean isExistNickname(MemberNicknameCheckRequestDTO memberNicknameCheckRequestDTO);

    void logout(LogoutDTO logoutDTO);

}
