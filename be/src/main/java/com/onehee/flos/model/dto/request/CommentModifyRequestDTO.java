package com.onehee.flos.model.dto.request;

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
    private Post post;
    private String content;

    public Comment toAccept(Comment comment) {
        comment.setPost(this.getPost());
        comment.setContent(this.getContent());
        return comment;
    }
}
