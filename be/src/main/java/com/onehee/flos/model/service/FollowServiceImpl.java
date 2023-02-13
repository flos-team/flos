package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.FollowDTO;
import com.onehee.flos.model.dto.request.FollowRequestDTO;
import com.onehee.flos.model.dto.request.UnfollowRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Follow;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Notification;
import com.onehee.flos.model.entity.type.MessageType;
import com.onehee.flos.model.repository.*;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final NotificationRepository notificationRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MemberResponseDTO> getFollowerList(FollowDTO followDTO) {
        Member member = memberRepository.findById(followDTO.getId())
                .orElseThrow(() -> new BadRequestException("존재하지 않는 회원입니다."));
        List<Member> followers;
        if (followDTO.isOrderByName()) {
            followers = followRepository.findAllByOwnerByNickname(member);
        } else {
            followers = followRepository.findAllByOwnerOrderByLastLoginAtDesc(member);
        }
        return followers.stream().map(MemberResponseDTO::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<MemberResponseDTO> getFollowingList(FollowDTO followDTO) {
        Member member = memberRepository.findById(followDTO.getId())
                .orElseThrow(() -> new BadRequestException("존재하지 않는 회원입니다."));
        List<Member> followings;
        if (followDTO.isOrderByName()) {
            followings = followRepository.findAllByFollowerByName(member);
        } else {
            followings = followRepository.findAllByFollowerOrderByLastLoginAtDesc(member);
        }
        return followings.stream().map(MemberResponseDTO::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<MemberResponseDTO> follow(FollowRequestDTO followRequestDTO) {
        Member me = SecurityManager.getCurrentMember();
        Member target = memberRepository.findById(followRequestDTO.getId())
                .orElseThrow(() -> new BadRequestException("유효한 대상이 아닙니다."));
        if (me.getId() == target.getId()) {
            throw new BadRequestException("나를 대상으로 지정할 수 없습니다.");
        }
        if (followRepository.existsByOwnerAndFollower(target, me)) {
            throw new BadRequestException("이미 상대방을 팔로우한 상태입니다.");
        }
        Follow follow = Follow.builder()
                .owner(target)
                .follower(me)
                .build();

        followRepository.saveAndFlush(follow);

        // 알림
        notificationRepository.save(Notification.builder()
                .member(target)
                .messageType(MessageType.FOLLOW)
                .message(String.format(MessageType.FOLLOW.getMessage(), me.getNickname()))
                .referenceKey(me.getId())
                .build()
        );

        return getFollowingList(new FollowDTO(me.getId(), followRequestDTO.getOrderByName()));
    }

    @Override
    @Transactional
    public List<MemberResponseDTO> unfollow(UnfollowRequestDTO unfollowRequestDTO) {
        Member me = SecurityManager.getCurrentMember();
        Member target = memberRepository.findById(unfollowRequestDTO.getId())
                .orElseThrow(() -> new BadRequestException("유효한 대상이 아닙니다."));
        if (me.getId() == target.getId()) {
            throw new BadRequestException("나를 대상으로 지정할 수 없습니다.");
        }
        Follow follow = followRepository.findByOwnerAndFollower(target, me)
                .orElseThrow(() -> new BadRequestException("상대방과 팔로우된 상태가 아닙니다."));

        followRepository.delete(follow);
        followRepository.flush();

        return getFollowingList(new FollowDTO(me.getId(), unfollowRequestDTO.isOrderByName()));
    }

}
