package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.Comment;
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
@Schema(description = "댓글 수정 DTO")
public class CommentModifyRequestDTO {
    @Schema(description = "댓글의 pk")
    private Long id;
    @Schema(description = "댓글이 달린 게시글의 pk")
    private Long postId;
    @Schema(description = "댓글의 내용", maxLength = 200)
    private String content;
    @JsonIgnore
    private Post post;

    public Comment toAccept(Comment comment, Post post) {
        comment.setPost(post);
        comment.setContent(this.getContent());
        return comment;
    }
}
