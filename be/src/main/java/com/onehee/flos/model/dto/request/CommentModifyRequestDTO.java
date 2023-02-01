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
    private Post post;
    private Member writer;
    private String content;

    public static CommentModifyRequestDTO toDto(Comment comment) {
        return CommentModifyRequestDTO.builder()
                .post(comment.getPost())
                .writer(comment.getWriter())
                .content(comment.getContent())
                .build();
    }
}
