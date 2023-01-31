package com.onehee.flos.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.auth.model.dto.TokenResponse;
import com.onehee.flos.auth.model.service.JwtTokenProvider;
import com.onehee.flos.model.dto.LogoutDTO;
import com.onehee.flos.model.dto.request.LoginRequestDTO;
import com.onehee.flos.model.dto.request.MemberEmailCheckRequestDTO;
import com.onehee.flos.model.dto.request.MemberNicknameCheckRequestDTO;
import com.onehee.flos.model.dto.request.MemberSignUpRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<?> signUp(@RequestBody MemberSignUpRequestDTO memberSignUpRequestDTO) {
        memberService.createMember(memberSignUpRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Operation(summary = "로그인 메서드", description = "로그인에 성공하면 엑세스 토큰과 리프레시 토큰을 발행합니다.")
    @PostMapping("/login")
    @Tag(name = "멤버API")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) throws JsonProcessingException {
        TokenResponse tokenResponse = memberService.login(loginRequestDTO);
        return new ResponseEntity<TokenResponse>(tokenResponse, HttpStatus.OK);
    }

    @Operation(summary = "로그아웃 메서드", description = "요청사용자의 리프레시토큰을 만료시키고 사용된 엑세스 토큰을 사용할 수 없게 만듭니다.")
    @GetMapping("/logout")
    @Tag(name = "멤버API")
    public ResponseEntity<?> logout(@AuthenticationPrincipal MemberDetails memberDetails, @RequestHeader(name = "Authorization") String atk) {
        memberService.logout(
                LogoutDTO.builder()
                        .atk(atk.substring("Bearer ".length()))
                        .email(memberDetails.getMember().getEmail())
                        .build()
        );
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Operation(summary = "회원정보 메서드", description = "로그인 중인 회원의 정보를 반환합니다.")
    @GetMapping("/info")
    @Tag(name = "멤버API")
    public ResponseEntity<?> getInfo(@AuthenticationPrincipal MemberDetails memberDetails) {
        Member member = memberDetails.getMember();
        return new ResponseEntity<MemberResponseDTO>(MemberResponseDTO.toDto(member), HttpStatus.OK);
    }

    @Operation(summary = "중복이메일 체크 메서드", description = "이메일의 중복 여부를 확인합니다. 회원가입시 keyUp 이벤트에 사용합니다.")
    @GetMapping("/check/email")
    @Tag(name = "멤버API")
    public ResponseEntity<?> checkEmail(MemberEmailCheckRequestDTO memberEmailCheckRequestDTO) {
        if (memberService.isExistEmail(memberEmailCheckRequestDTO)) {
            return new ResponseEntity<String>("이미 해당 이메일이 존재합니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>("사용 가능한 이메일 입니다.", HttpStatus.OK);
    }

    @Operation(summary = "중복닉네임 체크 메서드", description = "닉네임의 중복 여부를 확인합니다.")
    @GetMapping("/check/nickname")
    @Tag(name = "멤버API")
    public ResponseEntity<?> checkNickname(MemberNicknameCheckRequestDTO memberEmailCheckRequestDTO) {
        return new ResponseEntity<Boolean>(memberService.isExistNickname(memberEmailCheckRequestDTO), HttpStatus.OK);
    }
}
