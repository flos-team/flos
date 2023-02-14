package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.request.EmailReportRequestDTO;
import com.onehee.flos.model.dto.request.EmailVerificationRequestDTO;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@Service
public interface MailService {
    void sendSignUpEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException;
    void sendPasswordResetEmail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException;
    boolean verifySignUpEmail(EmailVerificationRequestDTO emailVerificationRequestDTO);
    boolean verifyPasswordResetEmail(EmailVerificationRequestDTO emailVerificationRequestDTO);
    void sendReportMessage(EmailReportRequestDTO emailReportRequestDTO) throws MessagingException, UnsupportedEncodingException;
}
