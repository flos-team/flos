package com.onehee.flos.controller;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.EmailReportRequestDTO;
import com.onehee.flos.model.dto.request.EmailVerificationRequestDTO;
import com.onehee.flos.model.service.MailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
@Tag(name = "이메일API", description = "인증 이메일 발송, 인증 처리를 담당합니다.")
public class EmailController {

    private final MailService mailService;

    @Tag(name = "이메일API")
    @Operation(summary = "회원가입 이메일 발송 메서드", description = "회원가입 인증 이메일을 발송합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "이메일이 정상적으로 발송되었습니다."),
            @ApiResponse(responseCode = "400", description = "올바르지 않은 이메일을 입력했습니다."),
            @ApiResponse(responseCode = "500", description = "이메일을 보내는 과정에 문제가 생겼습니다.")
    })
    @GetMapping("/sign-up")
    public ResponseEntity<?> sendSignUpMail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        mailService.sendSignUpEmail(emailVerificationRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @Tag(name = "이메일API")
    @Operation(summary = "회원가입 이메일 인증 메서드", description = "발송한 회원가입 인증 이메일코드를 승인합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "이메일이 정상적으로 인증되었습니다.."),
            @ApiResponse(responseCode = "400", description = "이메일과 대응되는 코드가 올바르게 입력되지 않았습니다."),
    })
    @PostMapping("/sign-up")
    public ResponseEntity<?> verifySignUpCode(@RequestBody EmailVerificationRequestDTO emailVerificationRequestDTO) {
        if (mailService.verifySignUpEmail(emailVerificationRequestDTO)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        throw new BadRequestException("인증에 실패했습니다.");
    }

    @Tag(name = "이메일API")
    @Operation(summary = "비밀번호 초기화 이메일 인증 발송 메서드", description = "비밀번호 초기화 인증 이메일을 발송합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "이메일이 정상적으로 발송되었습니다."),
            @ApiResponse(responseCode = "400", description = "올바르지 않은 이메일을 입력했습니다."),
            @ApiResponse(responseCode = "500", description = "이메일을 보내는 과정에 문제가 생겼습니다.")
    })
    @GetMapping("/reset-password")
    public ResponseEntity<?> sendResetPasswordMail(EmailVerificationRequestDTO emailVerificationRequestDTO) throws MessagingException, UnsupportedEncodingException {
        mailService.sendPasswordResetEmail(emailVerificationRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @Tag(name = "이메일API")
    @Operation(summary = "비밀번호 초기화 이메일 인증 메서드", description = "발송한 비밀번호 초기화 인증 이메일코드를 승인합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "이메일이 정상적으로 인증되었습니다.."),
            @ApiResponse(responseCode = "400", description = "이메일과 대응되는 코드가 올바르게 입력되지 않았습니다."),
    })
    @PostMapping("/reset-password")
    public ResponseEntity<?> verifyResetPasswordCode(@RequestBody EmailVerificationRequestDTO emailVerificationRequestDTO) {
        if (mailService.verifyPasswordResetEmail(emailVerificationRequestDTO)) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        throw new BadRequestException("인증에 실패했습니다.");
    }
    @Tag(name = "이메일API")
    @Operation(summary = "이메일 문의 전송 메서드", description = "관리자에게 문의 메일을 보냅니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일이 정상적으로 발송되었습니다."),
            @ApiResponse(responseCode = "400", description = "올바르지 않은 메세지를 입력했습니다."),
            @ApiResponse(responseCode = "500", description = "이메일을 보내는 과정에 문제가 생겼습니다.")
    })
    @PostMapping("/report")
    public ResponseEntity<?> sendReportMessage(@RequestBody EmailReportRequestDTO emailReportRequestDTO) throws MessagingException, UnsupportedEncodingException {
        mailService.sendReportMessage(emailReportRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
