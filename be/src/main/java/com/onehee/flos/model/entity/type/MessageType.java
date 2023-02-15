package com.onehee.flos.model.entity.type;

import com.onehee.flos.model.dto.response.MemberInfoResponseDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import lombok.Getter;

@Getter
public enum MessageType {
    FOLLOW("%s님이 회원님을 팔로우 했습니다.", MemberInfoResponseDTO.class),
    NEWFEED("%s님이 새로운 글을 작성했습니다.", PostResponseDTO.class),
    NEWCOMMENT("%s님이 회원님의 게시글에 댓글을 남겼습니다.", PostResponseDTO.class),
    NEWREPLY("%s님이 회원님의 댓글에 대댓글을 남겼습니다.", PostResponseDTO.class),
    NOFEED24H("%s님, 새로운 글을 작성한지 %n시간이 지났네요. FLOS에서 새로운 소식을 들려줄래요?", Void.class),
    NOCAREPLANT24H("%s님, %s(이)가 회원님의 손길을 기다리고 있어요!", Void.class),
    COMMENTCHOSEN("%s님이 회원님의 댓글에 %s을 주셨어요!", PostResponseDTO.class),
    UNAVAILABLE("참조링크가 삭제된 메세지", Void.class);

    private final String message;
    private Class<?> object;

    MessageType(String message, Class<?> object) {
        this.message = message;
        this.object = object;
    }
}
