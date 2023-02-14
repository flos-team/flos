package com.onehee.flos.model.service;

import com.onehee.flos.auth.model.repository.RedisRepository;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.EmailReportRequestDTO;
import com.onehee.flos.model.dto.request.EmailVerificationRequestDTO;
import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.repository.MemberRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.Duration;

@Service
@RequiredArgsConstructor
@Log4j2
public class MailServiceImpl implements MailService {

    // 메일 인증시간
    @Value("${spring.mail.expire.verification}")
    private Long verifyExpire;

    // 인증 유효기간
    @Value("${spring.mail.expire.approved}")
    private Long approvedExpire;

    @Value("${spring.mail.username}")
    private String sender;

    @Value("${spring.mail.description}")
    private String senderDescription;

    @Value("${spring.mail.reportfrom}")
    private String reciever;

    private final JavaMailSender emailSender;
    private final RedisRepository redisRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void sendSignUpEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        String to = emailVerificationRequestDTO.getEmail();
        String code = getCode();
        String subject = "[Flos] 회원가입 인증코드";

        // 이메일 중복체크
        if (memberRepository.existsByEmailAndProviderType(to, ProviderType.LOCAL)) {
            throw new BadRequestException("이미 해당 이메일로 가입된 계정이 있습니다.");
        }

        // 메일 전송
        sendEmail(subject, code, to);

        // redis에 등록
        redisRepository.setValue("verification:" + code, to, Duration.ofMillis(verifyExpire));
    }

    @Override
    @Transactional
    public void sendPasswordResetEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        String to = emailVerificationRequestDTO.getEmail();
        String code = getCode();
        String subject = "[Flos] 비밀번호 재설정 인증코드";

        // 이메일 중복체크
        if (!memberRepository.existsByEmailAndProviderType(to, ProviderType.LOCAL)) {
            throw  new BadRequestException("해당 이메일로 가입된 계정을 찾을 수 없습니다.");
        }

        // 메일 전송
        sendEmail(subject, code, to);

        // redis에 등록
        redisRepository.setValue("resetPassword:" + code, to, Duration.ofMillis(verifyExpire));
    }

    @Override
    public boolean verifySignUpEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) {
        String email = emailVerificationRequestDTO.getEmail();
        String code = emailVerificationRequestDTO.getCode();
        String table = "verification:";

        return verifyEmail(email, code, table);
    }

    @Override
    public boolean verifyPasswordResetEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) {
        String email = emailVerificationRequestDTO.getEmail();
        String code = emailVerificationRequestDTO.getCode();
        String table = "resetPassword:";

        return verifyEmail(email, code, table);
    }

    @Override
    public void sendReportMessage(EmailReportRequestDTO emailReportRequestDTO) throws MessagingException, UnsupportedEncodingException {
        String from = emailReportRequestDTO.getSender();
        String message = emailReportRequestDTO.getMessage();
        String subject = "[Flos] 문의 메일 발송";

        sendReport(subject, message, from);
    }

    private String getCode() {
        return RandomString.make(10);
    }

    private void sendEmail(String subject, String code, String to) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
        messageHelper.setSubject(subject);
        messageHelper.setText("인증 코드: " + code);
        messageHelper.setFrom(sender, senderDescription);
        messageHelper.setTo(to);
        emailSender.send(message);
    }

    private void sendReport(String subject, String msg, String from) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
        messageHelper.setSubject(subject);
        messageHelper.setText("<html><body><h2>[FLOS 문의 발송] " + from + " 회원</h2><p>" + msg + "</p><br><br><br><footer><p>Copyright © 2023 원희 조, All rights reserved.</p></footer></body></html>", true);
        messageHelper.setFrom(from);
        messageHelper.setTo(reciever);
        emailSender.send(message);
    }

    private boolean verifyEmail(String email, String code, String table) {
        String emailInRedis = redisRepository.getValue(table + code);
        if (email.equals(emailInRedis)) {
            redisRepository.setValue("approved_" + table + code, email, Duration.ofMillis(approvedExpire));
            return true;
        }
        return false;
    }
}
