package com.onehee.flos.model.service;

import com.onehee.flos.auth.model.repository.RedisRepository;
import com.onehee.flos.model.dto.request.EmailVerificationRequestDTO;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    // 메일 인증시간
    @Value("${spring.mail.expire.verification}")
    private Long verifyExpire;

    // 인증 유효기간
    @Value("${spring.mail.expire.approved}")
    private Long approvedExpire;

    private final JavaMailSender emailSender;
    private final RedisRepository redisRepository;

    @Override
    public void sendEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        String email = emailVerificationRequestDTO.getEmail();
        String code = getCode();

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
        messageHelper.setSubject("[Flos] 이메일 인증코드 입니다.");
        messageHelper.setText("인증 코드" + code);
        messageHelper.setFrom("joykst961@gmail.com", "Flos 운영팀");
        messageHelper.setTo(email);
        emailSender.send(message);

        // redis에 등록
        redisRepository.setValue("verification:" + code, email, Duration.ofMillis(verifyExpire));
    }

    @Override
    public boolean verifyEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) {
        String email = emailVerificationRequestDTO.getEmail();
        String code = emailVerificationRequestDTO.getCode();

        String emailInRedis = redisRepository.getValue("verification" + code);
        if (email.equals(emailInRedis)) {
            redisRepository.setValue("approved:" + code, email, Duration.ofMillis(approvedExpire));
        }
        return false;
    }

    private String getCode() {
        return RandomString.make(10);
    }
}
