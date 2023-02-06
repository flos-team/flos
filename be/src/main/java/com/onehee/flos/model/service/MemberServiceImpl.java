package com.onehee.flos.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenDTO;
import com.onehee.flos.auth.model.repository.RedisRepository;
import com.onehee.flos.auth.model.service.JwtTokenProvider;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.exception.UnauthorizedEmailException;
import com.onehee.flos.model.dto.LogoutDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.MemberInfoResponseDTO;
import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.MemberStatus;
import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.repository.MemberRepository;
import com.onehee.flos.util.FilesHandler;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisRepository redisRepository;
    private final FilesHandler filesHandler;

    @Override
    @Transactional
    public void createMember(MemberSignUpRequestDTO memberSignUpRequestDTO) {
        // 아이디 패턴검사 (Validated 어노테이션을 사용해도 괜찮을 것 같음) 필요함 추가할것

        // 아이디 중복검사
        if (memberRepository.existsByEmailAndProviderType(memberSignUpRequestDTO.getEmail(), ProviderType.LOCAL)) {
            throw new BadRequestException("이미 가입된 이메일 주소 입니다.");
        }
        if (memberSignUpRequestDTO.getCode() == null || !memberSignUpRequestDTO.getEmail().equals(redisRepository.getValue("approved_verification:" + memberSignUpRequestDTO.getCode()))) {
            throw new UnauthorizedEmailException("인증되지 않은 이메일 주소입니다.");
        }
        Member member = memberSignUpRequestDTO.toEntity();
        member.setPassword(passwordEncoder.encode(memberSignUpRequestDTO.getPassword()));
        memberRepository.save(member);
        redisRepository.deleteValue("approved_verification:" + memberSignUpRequestDTO.getCode());
        redisRepository.deleteValue("verification:" + memberSignUpRequestDTO.getCode());
    }

    @Override
    public void logout(LogoutDTO logoutDTO) {
        jwtTokenProvider.abandonTokens(logoutDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public TokenDTO login(LoginRequestDTO loginRequestDTO) throws JsonProcessingException {
        Member member = memberRepository.findByEmailAndProviderType(loginRequestDTO.getEmail(), ProviderType.LOCAL)
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호가 잘못되었습니다."));
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), member.getPassword())) {
            throw new BadRequestException("아이디 혹은 비밀번호가 잘못되었습니다.");
        }
        return jwtTokenProvider.generateTokenByMember(member);
    }

    @Override
    @Transactional
    public MemberInfoResponseDTO updateMember(MemberUpdateRequestDTO memberUpdateRequestDTO) {
        Member member = memberRepository.findById(SecurityManager.getCurrentMember().getId())
                .orElseThrow(() -> new BadRequestException("회원 정보를 조회 할 수 없습니다."));
        if (memberUpdateRequestDTO.getNickname() != null) {
            if (!memberUpdateRequestDTO.getNickname().equals(member.getNickname()) && memberRepository.existsByNickname(memberUpdateRequestDTO.getNickname())) {
                throw new BadRequestException("이미 해당 닉네임이 존재합니다.");
            }
            member.setNickname(memberUpdateRequestDTO.getNickname());
        }
        if (memberUpdateRequestDTO.getProfileImage() != null) {
            try {
                FileEntity profileImage = filesHandler.saveFile(memberUpdateRequestDTO.getProfileImage());
                log.info("{}", profileImage);
                profileImage.setMember(member);
                member.setProfileImage(profileImage);
            } catch (IOException e) {
                throw new BadRequestException("프로필 사진 등록 중에 문제가 발생했습니다.");
            }
        }
        if (memberUpdateRequestDTO.getIntroduction() != null) {
            member.setIntroduction(memberUpdateRequestDTO.getIntroduction());
        }
        member = memberRepository.saveAndFlush(member);
        return MemberInfoResponseDTO.toDto(member);
    }

    @Override
    public void deleteMember() {
        Member member = SecurityManager.getCurrentMember();
        member.setStatus(MemberStatus.INACTIVE);
        memberRepository.save(member);
    }

    @Override
    @Transactional
    public void resetPassword(MemberResetPasswordDTO memberResetPasswordDTO) {
        // 비밀번호 패턴검사 (Validated 어노테이션을 사용해도 괜찮을 것 같음) 필요함 추가할것

        // 이메일 유효검사
        log.info("{}", memberResetPasswordDTO.getEmail());
        Member member = memberRepository.findByEmailAndProviderType(memberResetPasswordDTO.getEmail(), ProviderType.LOCAL)
                .orElseThrow(() -> new BadRequestException("해당 이메일 주소로 가입된 계정이 존재하지 않습니다."));


        if (memberResetPasswordDTO.getCode() == null || !memberResetPasswordDTO.getEmail().equals(redisRepository.getValue("approved_resetPassword:" + memberResetPasswordDTO.getCode()))) {
            throw new UnauthorizedEmailException("인증되지 않은 이메일 주소입니다.");
        }

        member.setPassword(passwordEncoder.encode(memberResetPasswordDTO.getPassword()));
        redisRepository.deleteValue("approved_resetPassword:" + memberResetPasswordDTO.getCode());
        redisRepository.deleteValue("resetPassword:" + memberResetPasswordDTO.getCode());
    }

    @Override
    public boolean isExistEmail(MemberEmailCheckRequestDTO memberEmailCheckRequestDTO) {
        return memberRepository.existsByEmailAndProviderType(memberEmailCheckRequestDTO.getEmail(), ProviderType.LOCAL);
    }

    @Override
    public boolean isExistNickname(MemberNicknameCheckRequestDTO memberNicknameCheckRequestDTO) {
        return memberRepository.existsByNickname(memberNicknameCheckRequestDTO.getNickname());
    }

    @Override
    public MemberInfoResponseDTO getMemberInfo(MemberSelectRequestDTO memberSelectRequestDTO) {
        Member member = memberRepository.findById(memberSelectRequestDTO.getId())
                .orElseThrow(() -> new BadRequestException("회원 정보를 조회 할 수 없습니다."));

        return MemberInfoResponseDTO.toDto(member);
    }
}
