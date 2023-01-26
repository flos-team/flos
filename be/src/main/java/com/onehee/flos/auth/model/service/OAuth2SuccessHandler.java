package com.onehee.flos.auth.model.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.onehee.flos.auth.model.dto.OAuth2UserDTO;
import com.onehee.flos.auth.model.dto.TokenResponse;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.RoleType;
import com.onehee.flos.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        OAuth2UserDTO oAuth2UserDTO = OAuth2UserDTO.toDto(oAuth2User);

        if (!memberRepository.existsByEmailAndProviderType(oAuth2UserDTO.getEmail(), oAuth2UserDTO.getProviderType())) {
            Member member = Member.builder()
                    .email(oAuth2UserDTO.getEmail())
                    .providerType(oAuth2UserDTO.getProviderType())
                    .picture(oAuth2UserDTO.getPicture())
                    .roleType(RoleType.USER)
                    .build();
            memberRepository.saveAndFlush(member);
        }
        Member loginMember = memberRepository.findByEmailAndProviderType(oAuth2UserDTO.getEmail(), oAuth2UserDTO.getProviderType());

        TokenResponse tokenResponse = jwtTokenProvider.generateTokenByMember(loginMember);
        log.info("{}", tokenResponse);

        writeTokenResponse(response, tokenResponse);
    }

    private void writeTokenResponse(HttpServletResponse response, TokenResponse tokenResponse) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.addHeader("Authorization", "Bearer " + tokenResponse.getAtk());
        PrintWriter writer = response.getWriter();
        writer.println(objectMapper.writeValueAsString(tokenResponse));
        writer.flush();
    }
}
