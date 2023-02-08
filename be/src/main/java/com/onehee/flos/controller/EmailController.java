package com.onehee.flos.controller;

import com.onehee.flos.model.dto.request.EmailVerificationRequestDTO;
import com.onehee.flos.model.service.MailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
@Tag(name = "이메일API", description = "인증 이메일 발송, 인증 처리를 담당합니다.")
public class EmailController {

    private final MailService mailService;

    @Tag(name = "이메일API")
    @Operation(summary = "회원가입 인증 이메일 발송 메서드", description = "회원가입 인증 이메일을 발송합니다.")
    @GetMapping("/sign-up")
    public ResponseEntity<?> sendSignUpMail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        mailService.sendSignUpEmail(emailVerificationRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @Tag(name = "이메일API")
    @Operation(summary = "회원가입 인증 이메일 인증 메서드", description = "발송한 회원가입 인증 이메일코드를 승인합니다.")
    @PostMapping("/sign-up")
    public ResponseEntity<?> verifySignUpCode(@RequestBody EmailVerificationRequestDTO emailVerificationRequestDTO) {
        if (mailService.verifySignUpEmail(emailVerificationRequestDTO)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

    @Tag(name = "이메일API")
    @Operation(summary = "", description = "")
    @GetMapping("/reset-password")
    public ResponseEntity<?> sendResetPasswordMail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        mailService.sendPasswordResetEmail(emailVerificationRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @Tag(name = "이메일API")
    @Operation(summary = "", description = "")
    @PostMapping("/reset-password")
    public ResponseEntity<?> verifyResetPasswordCode(@RequestBody EmailVerificationRequestDTO emailVerificationRequestDTO) {
        if (mailService.verifyPasswordResetEmail(emailVerificationRequestDTO)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

}
