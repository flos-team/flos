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
import com.onehee.flos.model.dto.response.MemberReportResponseDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.dto.type.MemberRelation;
import com.onehee.flos.model.entity.*;
import com.onehee.flos.model.entity.type.Conclusion;
import com.onehee.flos.model.entity.type.MemberStatus;
import com.onehee.flos.model.entity.type.MessageType;
import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.repository.*;
import com.onehee.flos.util.FilesHandler;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final FlowerRepository flowerRepository;
    private final NotificationRepository notificationRepository;
    private final FollowRepository followRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisRepository redisRepository;
    private final FilesHandler filesHandler;
    private final PostRepository postRepository;
    private final WeatherResourceRepository weatherResourceRepository;
    private final AttendanceRepository attendanceRepository;
    private final ReportRepository reportRepository;
    private final BanRepository banRepository;

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
    @Transactional
    public TokenDTO login(LoginRequestDTO loginRequestDTO) throws JsonProcessingException {
        Member member = memberRepository.findByEmailAndProviderType(loginRequestDTO.getEmail(), ProviderType.LOCAL)
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호가 잘못되었습니다."));
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), member.getPassword())) {
            throw new BadRequestException("아이디 혹은 비밀번호가 잘못되었습니다.");
        }

        if (MemberStatus.INACTIVE.equals(member.getStatus())) {
            member.setStatus(MemberStatus.ACTIVE);
        }

        if (banRepository.existsByMemberAndReleaseDateAfter(member, LocalDate.now())) {
            throw new BadRequestException("이용정지 처분을 받은 계정입니다.");
        }

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime yesterday = now.minusDays(1);

        if (member.getCreatedAt().plusDays(1).isBefore(now)) {
            if (
                    !postRepository.existsByWriterAndCreatedAtIsAfter(member, yesterday)
                            && !notificationRepository.existsByMemberAndMessageTypeAndCheckedAtAfter(member, MessageType.NOFEED24H, yesterday)
            ) {
                Post lastPost = postRepository.findFirstByWriterOrderByCreatedAtDesc(member);
                if (lastPost != null) {
                    long time = ChronoUnit.HOURS.between(lastPost.getCreatedAt(), LocalDateTime.now());
                    Notification notification = Notification.builder()
                            .member(member)
                            .messageType(MessageType.NOFEED24H)
                            .message(String.format(MessageType.NOFEED24H.getMessage(), member.getNickname(), time))
                            .build();
                    notificationRepository.save(notification);
                }
            }

            if (
                    !weatherResourceRepository.existsByOwnerAndUsedAtAfter(member, yesterday)
                            && !notificationRepository.existsByMemberAndMessageTypeAndCheckedAtAfter(member, MessageType.NOCAREPLANT24H, yesterday)
            ) {
                Flower flower = flowerRepository.findByOwnerAndGardeningIsFalse(member).orElse(null);
                if (flower != null) {
                    Notification notification = Notification.builder()
                            .member(member)
                            .messageType(MessageType.NOCAREPLANT24H)
                            .message(String.format(MessageType.NOCAREPLANT24H.getMessage(), member.getNickname(), flower.getName()))
                            .build();
                    notificationRepository.save(notification);
                }
            }
        }


        member.setLastLoginAt(now);
        if (!attendanceRepository.existsByMemberAndLoginDate(member, now.toLocalDate())) {
            attendanceRepository.save(Attendance.builder()
                    .member(member)
                    .loginDate(now.toLocalDate())
                    .build()
            );
        }

        return jwtTokenProvider.generateTokenByMember(member);
    }

    @Override
    @Transactional
    public MemberInfoResponseDTO updateMember(MemberUpdateRequestDTO memberUpdateRequestDTO) {
        Member member = memberRepository.findById(SecurityManager.getCurrentMember().getId())
                .orElseThrow(() -> new BadRequestException("회원 정보를 조회 할 수 없습니다."));
        if (memberUpdateRequestDTO.getNickname() != null) {
            if (!memberUpdateRequestDTO.getNickname().equals(member.getNickname()) && memberRepository.existsByNicknameIgnoreCase(memberUpdateRequestDTO.getNickname())) {
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
        member.setModifiedAt(LocalDateTime.now());
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
        member.setModifiedAt(LocalDateTime.now());
    }

    @Override
    public boolean isExistEmail(MemberEmailCheckRequestDTO memberEmailCheckRequestDTO) {
        return memberRepository.existsByEmailAndProviderType(memberEmailCheckRequestDTO.getEmail(), ProviderType.LOCAL);
    }

    @Override
    public boolean isExistNickname(MemberNicknameCheckRequestDTO memberNicknameCheckRequestDTO) {
        return memberRepository.existsByNicknameIgnoreCase(memberNicknameCheckRequestDTO.getNickname());
    }

    @Override
    @Transactional(readOnly = true)
    public MemberInfoResponseDTO getMemberInfo(MemberSelectRequestDTO memberSelectRequestDTO) {

        Member other = memberRepository.findById(memberSelectRequestDTO.getId())
                .orElseThrow(() -> new BadRequestException("회원 정보를 조회 할 수 없습니다."));
        Member me = SecurityManager.getCurrentMember();
        boolean isFollower = followRepository.existsByOwnerAndFollower(me, other);
        boolean isFollowing = followRepository.existsByOwnerAndFollower(other, me);

        MemberRelation memberRelation;

        if (isFollower && isFollowing) {
            memberRelation = MemberRelation.FRIEND;
        } else if (isFollower) {
            memberRelation = MemberRelation.FOLLOWER;
        } else if (isFollowing) {
            memberRelation = MemberRelation.FOLLOWED;
        } else {
            memberRelation = MemberRelation.OTHER;
        }

        MemberInfoResponseDTO memberInfoResponseDTO = MemberInfoResponseDTO.toDto(other);
        memberInfoResponseDTO.setMemberRelation(memberRelation);

        return memberInfoResponseDTO;
    }

    @Override
    public void updatePassword(MemberPasswordUpdateRequestDTO memberPasswordUpdateRequestDTO) {
        Member me = SecurityManager.getCurrentMember();
        if (!passwordEncoder.matches(memberPasswordUpdateRequestDTO.getCurrentPassword(), me.getPassword())) {
            throw new BadRequestException("현재 비밀번호가 일치하지 않습니다.");
        }
        me.setPassword(passwordEncoder.encode(memberPasswordUpdateRequestDTO.getNewPassword()));
        me.setModifiedAt(LocalDateTime.now());
        memberRepository.save(me);
    }

    @Override
    public List<MemberResponseDTO> getMemberListByNickname(MemberSearchRequestDTO memberSearchRequestDTO) {
        Member me = SecurityManager.getCurrentMember();
        List<Member> memberList = memberRepository.findAllByNicknameLikeIgnoreCase(memberSearchRequestDTO.getNickname() + "%");
        return memberList.stream().map(MemberResponseDTO::toDto).collect(Collectors.toList());
    }

    @Override
    public void sueMember(MemberSueRequestDTO memberSueRequestDTO) {
        Member me = SecurityManager.getCurrentMember();
        Member target = memberRepository.findById(memberSueRequestDTO.getId())
                .orElseThrow(() -> new BadRequestException("회원 정보를 조회할 수 없습니다."));

        Report report = Report.builder()
                .reporter(me)
                .target(target)
                .description(memberSueRequestDTO.getDescription())
                .createdAt(LocalDateTime.now())
                .build();

        reportRepository.save(report);
    }

    @Override
    @Transactional
    public List<MemberReportResponseDTO> getMemberReport(MemberReportRequestDTO memberReportRequestDTO) {
        List<Report> result;
        if (memberReportRequestDTO.getReporterId() != null && memberReportRequestDTO.getTargetId() != null) {
            Member reporter = memberRepository.findById(memberReportRequestDTO.getReporterId())
                    .orElseThrow(() -> new BadRequestException("신고한 사람의 계정이 존재하지 않습니다."));
            Member target = memberRepository.findById(memberReportRequestDTO.getTargetId())
                    .orElseThrow(() -> new BadRequestException("신고당한 사람의 계정이 존재하지 않습니다."));
            result = reportRepository.findAllByReporterAndTarget(reporter, target);
        } else if (memberReportRequestDTO.getReporterId() != null) {
            Member reporter = memberRepository.findById(memberReportRequestDTO.getReporterId())
                    .orElseThrow(() -> new BadRequestException("신고한 사람의 계정이 존재하지 않습니다."));
            result = reportRepository.findAllByReporter(reporter);
        } else if (memberReportRequestDTO.getTargetId() != null) {
            Member target = memberRepository.findById(memberReportRequestDTO.getTargetId())
                    .orElseThrow(() -> new BadRequestException("신고당한 사람의 계정이 존재하지 않습니다."));
            result = reportRepository.findAllByTarget(target);
        } else {
            result = reportRepository.findAll();
        }
        List<MemberReportResponseDTO> body;
        if (memberReportRequestDTO.getIsConclusion() != null && memberReportRequestDTO.getIsConclusion()) {
            body = result.stream().filter((report) -> report.getConclusion() != null).map(MemberReportResponseDTO::toDTO).collect(Collectors.toList());
        } else if (memberReportRequestDTO.getIsConclusion() != null) {
            body = result.stream().filter((report) -> report.getConclusion() == null).map(MemberReportResponseDTO::toDTO).collect(Collectors.toList());
        } else {
            body = result.stream().map(MemberReportResponseDTO::toDTO).collect(Collectors.toList());
        }
        return body;
    }

    @Override
    @Transactional
    public List<MemberReportResponseDTO> processReport(MemberReportProcessRequestDTO memberReportProcessRequestDTO) {
        Report report = reportRepository.findById(memberReportProcessRequestDTO.getId())
                .orElseThrow(() -> new BadRequestException("해당 신고건을 찾을 수 없습니다."));

        if (!Conclusion.REJECT.equals(report.getConclusion()) && !Conclusion.REJECT.equals(memberReportProcessRequestDTO.getConclusion())) {
            throw new BadRequestException("이미 처리된 신고건에 중복 징계 할 수 없습니다.");
        }

        if (!Conclusion.REJECT.equals(report.getConclusion())) {
            int sentence = report.getConclusion().getDay();
            Ban oldBan = banRepository.findByMember(report.getTarget());
            oldBan.setReleaseDate(oldBan.getReleaseDate().minusDays(sentence));
        }

        List<Report> reports = reportRepository.findAllByTargetAndConclusionIsNull(report.getTarget());
        LocalDateTime now = LocalDateTime.now();


        reports.forEach(r -> {
            r.setConclusion(memberReportProcessRequestDTO.getConclusion());
            r.setConfirmedAt(now);
        });

        reportRepository.saveAllAndFlush(reports);

        if (Conclusion.REJECT.equals(memberReportProcessRequestDTO.getConclusion())) {
            return getMemberReport(new MemberReportRequestDTO());
        }

        Ban ban = banRepository.findByMember(report.getTarget());

        if (ban == null) {
            ban = Ban.builder()
                    .member(report.getTarget())
                    .releaseDate(LocalDate.now().plusDays(memberReportProcessRequestDTO.getConclusion().ordinal()))
                    .build();
        } else {
            ban.setReleaseDate(ban.getReleaseDate().plusDays(memberReportProcessRequestDTO.getConclusion().ordinal()));
        }

        banRepository.save(ban);

        return getMemberReport(new MemberReportRequestDTO());
    }

    @Override
    public List<MemberResponseDTO> getAllMember() {
        return memberRepository.findAll().stream().map(MemberResponseDTO::toDto).collect(Collectors.toList());
    }
}
