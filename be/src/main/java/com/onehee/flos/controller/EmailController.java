package com.onehee.flos.controller;

import com.onehee.flos.model.dto.request.EmailVerificationRequestDTO;
import com.onehee.flos.model.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final MailService mailService;

    @GetMapping("/sign-up")
    public ResponseEntity<?> sendSignUpMail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        mailService.sendSignUpEmail(emailVerificationRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> verifySignUpCode(@RequestBody EmailVerificationRequestDTO emailVerificationRequestDTO) {
        if (mailService.verifySignUpEmail(emailVerificationRequestDTO)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/reset-password")
    public ResponseEntity<?> sendResetPasswordMail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        mailService.sendPasswordResetEmail(emailVerificationRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> verifyResetPasswordCode(@RequestBody EmailVerificationRequestDTO emailVerificationRequestDTO) {
        if (mailService.verifyPasswordResetEmail(emailVerificationRequestDTO)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }

}
