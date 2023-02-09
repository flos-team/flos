package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.FollowDTO;
import com.onehee.flos.model.dto.request.FollowRequestDTO;
import com.onehee.flos.model.dto.request.UnfollowRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FollowService {
    // 내 팔로워 조회
    List<MemberResponseDTO> getFollowerList(FollowDTO followDTO);

    // 내가 팔로잉한 사람들
    List<MemberResponseDTO> getFollowingList(FollowDTO followDTO);

    // 팔로잉 등록
    List<MemberResponseDTO> follow(FollowRequestDTO followRequestDTO);

    // 팔로잉 해제
    List<MemberResponseDTO> unfollow(UnfollowRequestDTO unfollowRequestDTO);

}
