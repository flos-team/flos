package com.onehee.flos.model.dto.request;

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
    private Post post;
    private Comment parent;
    private Comment primitive;
    private String content;

    public Comment toEntity() {
        return Comment.builder()
                .post(this.getPost())
                .content(this.getContent())
                .parent(this.getParent())
                .primitive(this.getPrimitive())
                .build();
    }
}
