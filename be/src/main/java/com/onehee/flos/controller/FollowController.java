package com.onehee.flos.controller;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.model.dto.FollowDTO;
import com.onehee.flos.model.dto.request.FollowRequestDTO;
import com.onehee.flos.model.dto.request.UnfollowRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.service.FollowService;
import lombok.RequiredArgsConstructor;
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
    public List<MemberResponseDTO> getFollowerList(@PathVariable(name = "id", required = false) Long id, @AuthenticationPrincipal MemberDetails memberDetails) {
        id = Objects.requireNonNullElse(id, memberDetails.getMember().getId());
        FollowDTO followDTO = new FollowDTO(id);
        return followService.getFollowerList(followDTO);
    }

    @GetMapping(value = {"/following", "/following/{id}"})
    public List<MemberResponseDTO> getFollowingList(@PathVariable(name = "id", required = false) Long id, @AuthenticationPrincipal MemberDetails memberDetails) {
        id = Objects.requireNonNullElse(id, memberDetails.getMember().getId());
        FollowDTO followDTO = new FollowDTO(id);
        return followService.getFollowingList(followDTO);
    }

    @PostMapping
    public List<MemberResponseDTO> follow(@RequestBody FollowRequestDTO followRequestDTO) {
        return followService.follow(followRequestDTO);
    }

    @DeleteMapping("/{id}")
    public List<MemberResponseDTO> unfollow(@PathVariable("id") Long id) {
        return followService.unfollow(new UnfollowRequestDTO(id));
    }
}
