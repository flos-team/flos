package com.onehee.flos.model.service;

import com.onehee.flos.model.entity.Member;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FollowService {
    // 내 팔로워 조회
    List<Member> getFollowerList();

    // 내가 팔로잉한 사람들
    List<Member> getFollowingList();

    // 팔로잉 등록
    List<Member> follow();

    // 팔로잉 해제
    List<Member> unfollow();
}
