package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.request.EmailVerificationRequestDTO;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@Service
public interface MailService {
    void sendEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException;
    boolean verifyEmail(EmailVerificationRequestDTO emailVerificationRequestDTO);
}
