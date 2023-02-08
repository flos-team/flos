package com.onehee.flos.controller;

import com.onehee.flos.model.dto.request.FollowRequestDTO;
import com.onehee.flos.model.dto.request.UnfollowRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @GetMapping("/follower")
    public List<MemberResponseDTO> getFollowerList() {
        return followService.getFollowerList();
    }

    @GetMapping("/following")
    public List<MemberResponseDTO> getFollowingList() {
        return followService.getFollowingList();
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
