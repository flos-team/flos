package com.onehee.flos.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenDTO;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.LogoutDTO;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.MemberInfoResponseDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

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

    void updatePassword(MemberPasswordUpdateRequestDTO memberPasswordUpdateRequestDTO);

    List<MemberResponseDTO> getMemberListByNickname(MemberSearchRequestDTO memberSearchRequestDTO);
}
