package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "댓글 생성 DTO")
public class CommentCreateRequestDTO {
    @Schema(description = "댓글이 달린 게시글의 pk")
    private Long postId;
    @Schema(description = "대댓글의 참조 (미사용)", defaultValue = "0")
    private Long parentId;
    @Schema(description = "내가 대댓글이라면 댓글의 pk")
    private Long primitiveId;
    @Schema(description = "댓글의 내용", maxLength = 200)
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
