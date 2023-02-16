package com.onehee.flos.auth.model.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.onehee.flos.auth.model.dto.OAuth2UserDTO;
import com.onehee.flos.auth.model.dto.TokenDTO;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.entity.*;
import com.onehee.flos.model.entity.type.MemberStatus;
import com.onehee.flos.model.entity.type.MessageType;
import com.onehee.flos.model.repository.*;
import com.onehee.flos.util.FilesHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final FilesHandler filesHandler;
    private final AttendanceRepository attendanceRepository;
    private final PostRepository postRepository;
    private final NotificationRepository notificationRepository;
    private final WeatherResourceRepository weatherResourceRepository;
    private final FlowerRepository flowerRepository;
    private final BanRepository banRepository;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        OAuth2UserDTO oAuth2UserDTO = OAuth2UserDTO.toDto(oAuth2User);

        if (!memberRepository.existsByEmailAndProviderType(oAuth2UserDTO.getEmail(), oAuth2UserDTO.getProviderType())) {
            FileEntity profileImage = filesHandler.saveUrlImage(oAuth2UserDTO);
            Member member = Member.builder()
                    .email(oAuth2UserDTO.getEmail())
                    .providerType(oAuth2UserDTO.getProviderType())
                    .profileImage(profileImage)
                    .nickname(oAuth2UserDTO.getProviderType().toString() + "_" + UUID.randomUUID().toString())
                    .password(PasswordEncoderFactories.createDelegatingPasswordEncoder().encode(UUID.randomUUID().toString()))
                    .build();
            member = memberRepository.saveAndFlush(member);
            profileImage.setMember(member);
        }

        Member loginMember = memberRepository.findByEmailAndProviderType(oAuth2UserDTO.getEmail(), oAuth2UserDTO.getProviderType())
                .orElseThrow(() -> new RuntimeException("소셜 회원 등록과정중에 에러가 발생했습니다."));

        if (MemberStatus.INACTIVE.equals(loginMember.getStatus())) {
            loginMember.setStatus(MemberStatus.ACTIVE);
        }

        TokenDTO tokenDTO = jwtTokenProvider.generateTokenByMember(loginMember);
        log.info("{}", tokenDTO);

        if (banRepository.existsByMemberAndReleaseDateAfter(loginMember, LocalDate.now())) {
            throw new BadRequestException("이용정지 처분을 받은 계정입니다.");
        }

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime yesterday = now.minusDays(1);

        if (loginMember.getCreatedAt().plusDays(1).isBefore(now)) {
            if (
                    !postRepository.existsByWriterAndCreatedAtIsAfter(loginMember, yesterday)
                            && !notificationRepository.existsByMemberAndMessageTypeAndCheckedAtAfter(loginMember, MessageType.NOFEED24H, yesterday)
            ) {
                Post lastPost = postRepository.findFirstByWriterOrderByCreatedAtDesc(loginMember);
                if (lastPost != null) {
                    long time = ChronoUnit.HOURS.between(lastPost.getCreatedAt(), LocalDateTime.now());
                    Notification notification = Notification.builder()
                            .member(loginMember)
                            .messageType(MessageType.NOFEED24H)
                            .message(String.format(MessageType.NOFEED24H.getMessage(), loginMember.getNickname(), time))
                            .build();
                    notificationRepository.save(notification);
                }
            }

            if (
                    !weatherResourceRepository.existsByOwnerAndUsedAtAfter(loginMember, yesterday)
                            && !notificationRepository.existsByMemberAndMessageTypeAndCheckedAtAfter(loginMember, MessageType.NOCAREPLANT24H, yesterday)
            ) {
                Flower flower = flowerRepository.findByOwnerAndGardeningIsFalse(loginMember).orElse(null);
                if (flower != null) {
                    Notification notification = Notification.builder()
                            .member(loginMember)
                            .messageType(MessageType.NOCAREPLANT24H)
                            .message(String.format(MessageType.NOCAREPLANT24H.getMessage(), loginMember.getNickname(), flower.getName()))
                            .build();
                    notificationRepository.save(notification);
                }
            }
        }

        loginMember.setLastLoginAt(now);
        attendanceRepository.save(Attendance.builder()
                .member(loginMember)
                .loginDate(now.toLocalDate())
                .build()
        );

        writeTokenResponse(response, tokenDTO);
    }

    private void writeTokenResponse(HttpServletResponse response, TokenDTO tokenDTO) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        ResponseCookie cookie = jwtTokenProvider.getRtkCookie(tokenDTO.getRtk());
        response.setHeader("Set-Cookie", cookie.toString());
        response.setHeader("Authorization", "Bearer " + tokenDTO.getAtk());
        response.sendRedirect("https://i8b210.p.ssafy.io/main");
    }
}
