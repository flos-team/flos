package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentModifyRequestDTO {
    private Long id;
    private Long postId;
    private String content;
    @JsonIgnore
    private Post post;

    public Comment toAccept(Comment comment, Post post) {
        comment.setPost(post);
        comment.setContent(this.getContent());
        return comment;
    }
}
