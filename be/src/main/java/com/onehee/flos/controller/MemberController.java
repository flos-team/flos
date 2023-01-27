package com.onehee.flos.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenResponse;
import com.onehee.flos.auth.model.service.JwtTokenProvider;
import com.onehee.flos.model.dto.request.LoginRequestDTO;
import com.onehee.flos.model.dto.request.ReissueRequestDTO;
import com.onehee.flos.model.dto.request.SignUpRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.service.MemberService;
import com.onehee.flos.util.SecurityManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Tag(name = "멤버API", description = "멤버, 토큰 관련 처리를 담당합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    @Tag(name = "멤버API")
    @Operation(summary = "토큰 재발행 메서드", description = "엑세스 토큰과 리프레시 토큰을 재발행 합니다.")
    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestHeader(name = "Authorization") String atk) throws JsonProcessingException {
        TokenResponse token = jwtTokenProvider.reissueToken(atk);
        return new ResponseEntity<TokenResponse>(token, HttpStatus.OK);
    }

    @Operation(summary = "자체 회원가입 메서드", description = "flos 자체 회원가입 메서드입니다.")
    @PostMapping("/sign-up")
    @Tag(name = "멤버API")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO signUpRequestDTO) {
        memberService.signUp(signUpRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Operation(summary = "로그인 메서드", description = "로그인에 성공하면 엑세스 토큰과 리프레시 토큰을 발행합니다.")
    @PostMapping("/login")
    @Tag(name = "멤버API")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) throws JsonProcessingException {
        TokenResponse tokenResponse = memberService.login(loginRequestDTO);
        return new ResponseEntity<TokenResponse>(tokenResponse, HttpStatus.OK);
    }

    @Operation(summary = "회원정보 메서드", description = "로그인 중인 회원의 정보를 반환합니다.")
    @GetMapping("/info")
    @Tag(name = "멤버API")
    public ResponseEntity<?> getInfo(Authentication auth) {
        Member member = SecurityManager.getCurrentMember();
        return new ResponseEntity<MemberResponseDTO>(MemberResponseDTO.toDto(member), HttpStatus.OK);
    }

}
