package com.onehee.flos.controller;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.model.dto.FollowDTO;
import com.onehee.flos.model.dto.request.FollowRequestDTO;
import com.onehee.flos.model.dto.request.UnfollowRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @GetMapping( value = {"/follower", "/follower/{id}"})
    public ResponseEntity<?> getFollowerList(@PathVariable(name = "id", required = false) Long id, @AuthenticationPrincipal MemberDetails memberDetails) {
        id = Objects.requireNonNullElse(id, memberDetails.getMember().getId());
        FollowDTO followDTO = new FollowDTO(id);
        List<MemberResponseDTO> body = followService.getFollowerList(followDTO);
        HttpStatus httpStatus = body.size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<MemberResponseDTO>>(body, httpStatus);
    }

    @GetMapping(value = {"/following", "/following/{id}"})
    public ResponseEntity<?> getFollowingList(@PathVariable(name = "id", required = false) Long id, @AuthenticationPrincipal MemberDetails memberDetails) {
        id = Objects.requireNonNullElse(id, memberDetails.getMember().getId());
        FollowDTO followDTO = new FollowDTO(id);
        List<MemberResponseDTO> body = followService.getFollowingList(followDTO);
        HttpStatus httpStatus = body.size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<MemberResponseDTO>>(body, httpStatus);
    }

    @PostMapping
    public ResponseEntity<?> follow(@RequestBody FollowRequestDTO followRequestDTO) {
        List<MemberResponseDTO> body = followService.follow(followRequestDTO);
        HttpStatus httpStatus = body.size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<MemberResponseDTO>>(body, httpStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> unfollow(@PathVariable("id") Long id) {
        List<MemberResponseDTO> body = followService.unfollow(new UnfollowRequestDTO(id));
        HttpStatus httpStatus = body.size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<MemberResponseDTO>>(body, httpStatus);
    }
}
