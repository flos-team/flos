package com.onehee.flos.model.service;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {
    @Override
    public List<Member> getFollowerList() {
        Member member = SecurityManager.getCurrentMember();
        return null;
    }

    @Override
    public List<Member> getFollowingList() {
        return null;
    }

    @Override
    public List<Member> follow() {
        return null;
    }

    @Override
    public List<Member> unfollow() {
        return null;
    }
}
