package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentCreateRequestDTO {
    private Long postId;
    private Long parentId;
    private Long primitiveId;
    private String content;
    @JsonIgnore
    private Member writer;
    @JsonIgnore
    private Post post;
    @JsonIgnore
    private Comment parent;
    @JsonIgnore
    private Comment primitive;

    public Comment toEntity(Member writer, Post post, Comment parent, Comment primitive) {
        return Comment.builder()
                .writer(writer)
                .post(post)
                .content(this.getContent())
                .parent(parent)
                .primitive(primitive)
                .build();
    }
}
