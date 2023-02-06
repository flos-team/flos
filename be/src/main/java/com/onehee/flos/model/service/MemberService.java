package com.onehee.flos.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenDTO;
import com.onehee.flos.model.dto.LogoutDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.MemberInfoResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {

    void createMember(MemberSignUpRequestDTO memberSignUpRequestDTO);

    TokenDTO login(LoginRequestDTO loginRequestDTO) throws JsonProcessingException;

    MemberInfoResponseDTO updateMember(MemberUpdateRequestDTO memberUpdateRequestDTO);

    void deleteMember();

    void resetPassword(MemberResetPasswordDTO memberResetPasswordDTO);

    boolean isExistEmail(MemberEmailCheckRequestDTO memberEmailCheckRequestDTO);

    boolean isExistNickname(MemberNicknameCheckRequestDTO memberNicknameCheckRequestDTO);

    void logout(LogoutDTO logoutDTO);

    MemberInfoResponseDTO getMemberInfo(MemberSelectRequestDTO memberSelectRequestDTO);

}
