package com.onehee.flos.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenResponse;
import com.onehee.flos.auth.model.repository.RedisRepository;
import com.onehee.flos.auth.model.service.JwtTokenProvider;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.exception.UnauthorizedEmailException;
import com.onehee.flos.model.dto.LogoutDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisRepository redisRepository;

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
    public TokenResponse login(LoginRequestDTO loginRequestDTO) throws JsonProcessingException {
        Member member = memberRepository.findByEmailAndProviderType(loginRequestDTO.getEmail(), ProviderType.LOCAL)
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호가 잘못되었습니다."));
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), member.getPassword())) {
            throw new BadRequestException("아이디 혹은 비밀번호가 잘못되었습니다.");
        }
        return jwtTokenProvider.generateTokenByMember(member);
    }

    @Override
    public MemberResponseDTO updateMember(MemberUpdateRequestDTO memberUpdateRequestDTO) {
        String newNickname = memberUpdateRequestDTO.getNickname();
        return null;
    }

    @Override
    public void deleteMember() {

    }

    @Override
    public void resetPassword(MemberFindPasswordDTO memberFindPasswordDTO) {

    }

    @Override
    public boolean isExistEmail(MemberEmailCheckRequestDTO memberEmailCheckRequestDTO) {
        return memberRepository.existsByEmailAndProviderType(memberEmailCheckRequestDTO.getEmail(), ProviderType.LOCAL);
    }

    @Override
    public boolean isExistNickname(MemberNicknameCheckRequestDTO memberNicknameCheckRequestDTO) {
        return memberRepository.existsByNickname(memberNicknameCheckRequestDTO.getNickname());
    }
}
