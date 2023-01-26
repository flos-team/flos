package com.onehee.flos.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onehee.flos.auth.model.dto.TokenResponse;
import com.onehee.flos.auth.model.service.JwtTokenProvider;
import com.onehee.flos.model.dto.request.LoginRequestDTO;
import com.onehee.flos.model.dto.request.ReissueRequestDTO;
import com.onehee.flos.model.dto.request.SignUpRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final JwtTokenProvider jwtTokenProvider;

    private final MemberService memberService;

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody ReissueRequestDTO reissueRequestDTO) throws JsonProcessingException {
        TokenResponse token = jwtTokenProvider.reissueToken(reissueRequestDTO);
        return new ResponseEntity<TokenResponse>(token, HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO signUpRequestDTO) {
        memberService.signUp(signUpRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        MemberResponseDTO memberResponseDTO = memberService.login(loginRequestDTO);
        return new ResponseEntity<MemberResponseDTO>(memberResponseDTO, HttpStatus.OK);
    }


}
