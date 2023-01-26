package com.onehee.flos.model.service;

import com.onehee.flos.auth.model.service.JwtTokenProvider;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.LoginRequestDTO;
import com.onehee.flos.model.dto.request.SignUpRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(SignUpRequestDTO signUpRequestDTO) {
        // 아이디 패턴검사 (Validated 어노테이션을 사용해도 괜찮을 것 같음) 필요함 추가할것

        // 아이디 중복검사
        if (memberRepository.existsByEmailAndProviderType(signUpRequestDTO.getEmail(), ProviderType.LOCAL)) {
            throw new BadRequestException("이미 가입된 이메일 주소 입니다.");
        }
        Member member = signUpRequestDTO.toEntity();
        member.setPassword(passwordEncoder.encode(signUpRequestDTO.getPassword()));
        memberRepository.save(member);
    }

    @Override
    public MemberResponseDTO login(LoginRequestDTO loginRequestDTO) {
        String password = passwordEncoder.encode(loginRequestDTO.getPassword());
        Member member = memberRepository.findByEmailAndPassword(loginRequestDTO.getEmail(), password)
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호가 잘못되었습니다."));
        return MemberResponseDTO.toDto(member);
    }
}
