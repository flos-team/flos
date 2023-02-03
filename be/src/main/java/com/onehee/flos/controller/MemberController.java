package com.onehee.flos.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.auth.model.dto.TokenDTO;
import com.onehee.flos.auth.model.service.JwtTokenProvider;
import com.onehee.flos.model.dto.LogoutDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.MemberInfoResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.service.MemberService;
import com.onehee.flos.util.CookieUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Tag(name = "멤버API", description = "멤버, 토큰 관련 처리를 담당합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Log4j2
public class MemberController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    @Operation(summary = "자체 회원가입 메서드", description = "flos 자체 회원가입 메서드입니다.")
    @PostMapping("/sign-up")
    @Tag(name = "멤버API")
    public ResponseEntity<?> signUp(@RequestBody MemberSignUpRequestDTO memberSignUpRequestDTO) {
        memberService.createMember(memberSignUpRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @Operation(summary = "로그인 메서드", description = "로그인에 성공하면 엑세스 토큰과 리프레시 토큰을 발행합니다.")
    @PostMapping("/login")
    @Tag(name = "멤버API")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO, HttpServletResponse response) throws JsonProcessingException {
        TokenDTO tokenDTO = memberService.login(loginRequestDTO);
        ResponseCookie cookie = jwtTokenProvider.getRtkCookie(tokenDTO.getRtk());
        response.setHeader("Authorization", "Bearer " + tokenDTO.getAtk());
        response.setHeader("Set-Cookie", cookie.toString());
        return new ResponseEntity<TokenDTO>(tokenDTO, HttpStatus.OK);
    }

    @Operation(summary = "로그아웃 메서드", description = "요청사용자의 리프레시토큰을 만료시키고 사용된 엑세스 토큰을 사용할 수 없게 만듭니다.")
    @GetMapping("/logout")
    @Tag(name = "멤버API")
    public ResponseEntity<?> logout(@AuthenticationPrincipal MemberDetails memberDetails, @RequestHeader(name = "Authorization") String atk, HttpServletRequest request, HttpServletResponse response) {
        memberService.logout(LogoutDTO.builder().atk(atk.substring("Bearer ".length())).email(memberDetails.getMember().getEmail()).build());
        ResponseCookie cookie = jwtTokenProvider.getRtkCookie(CookieUtil.getRtk(request), 0);
        response.setHeader("Set-Cookie", cookie.toString());
        response.setHeader("Authorization", null);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "회원정보 메서드", description = "로그인 중인 회원의 정보를 반환합니다.")
    @GetMapping("/info")
    @Tag(name = "멤버API")
    public ResponseEntity<?> getInfo(@AuthenticationPrincipal MemberDetails memberDetails) {
        Member member = memberDetails.getMember();
        return new ResponseEntity<MemberInfoResponseDTO>(MemberInfoResponseDTO.toDto(member), HttpStatus.OK);
    }

    @Operation(summary = "중복이메일 체크 메서드", description = "이메일의 중복 여부를 확인합니다. 회원가입시 keyUp 이벤트에 사용합니다.")
    @GetMapping("/check/email")
    @Tag(name = "멤버API")
    public ResponseEntity<?> checkEmail(MemberEmailCheckRequestDTO memberEmailCheckRequestDTO) {
        return new ResponseEntity<Boolean>(memberService.isExistEmail(memberEmailCheckRequestDTO), HttpStatus.OK);
    }

    @Operation(summary = "중복닉네임 체크 메서드", description = "닉네임의 중복 여부를 확인합니다.")
    @GetMapping("/check/nickname")
    @Tag(name = "멤버API")
    public ResponseEntity<?> checkNickname(MemberNicknameCheckRequestDTO memberEmailCheckRequestDTO) {
        return new ResponseEntity<Boolean>(memberService.isExistNickname(memberEmailCheckRequestDTO), HttpStatus.OK);
    }

    @Operation(summary = "회원정보 수정 메서드", description = "회원정보(이메일, 프로필사진)을 업데이트 합니다.")
    @PutMapping("/info")
    @Tag(name = "멤버API")
    public ResponseEntity<?> updateMember(MemberUpdateRequestDTO memberUpdateRequestDTO) {
        return new ResponseEntity<MemberInfoResponseDTO>(memberService.updateMember(memberUpdateRequestDTO), HttpStatus.CREATED);
    }

    @Operation(summary = "비밀번호 재설정 메서드", description = "비밀번호를 재설정합니다. 승인된 이메일 인증번호를 함께 보내야 합니다.")
    @PutMapping("/reset-password")
    @Tag(name = "멤버API")
    public ResponseEntity<?> resetPassword(@RequestBody MemberResetPasswordDTO memberResetPasswordDTO, @AuthenticationPrincipal MemberDetails memberDetails, @RequestHeader(name = "Authorization", required = false) String atk) {
        log.info("{}", memberDetails);
        memberService.resetPassword(memberResetPasswordDTO);
        if (memberDetails != null) {
            memberService.logout(LogoutDTO.builder().atk(atk.substring("Bearer ".length())).email(memberDetails.getMember().getEmail()).build());
        }
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "회원 탈퇴 메서드", description = "회원을 비활성화 상태로 만듭니다.")
    @DeleteMapping("/quit")
    @Tag(name = "멤버API")
    public ResponseEntity<?> quitMember() {
        memberService.deleteMember();
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
