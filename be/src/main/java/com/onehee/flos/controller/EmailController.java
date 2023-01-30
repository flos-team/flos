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

    @GetMapping
    public ResponseEntity<?> sendMail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        mailService.sendEmail(emailVerificationRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> verifyCode(@RequestBody EmailVerificationRequestDTO emailVerificationRequestDTO) {
        if (mailService.verifyEmail(emailVerificationRequestDTO)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }
}
