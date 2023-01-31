package com.onehee.flos.model.dto.response;

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
public class CommentResponseDTO {
    private Long id;
    private Post post;
    private Comment parent;
    private Comment primitive;
    private Member writer;
    private String content;
    private LocalDateTime createdAt;
//    private LocalDateTime modifyAt;
    private Boolean isApprove;

    public static CommentResponseDTO toDto(Comment comment) {
        return CommentResponseDTO.builder()
                .id(comment.getId())
                .post(comment.getPost())
                .parent(comment.getParent())
                .primitive(comment.getPrimitive())
                .writer(comment.getWriter())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
//                .modifyAt(comment.getModifyAt())
                .isApprove(comment.getIsApprove())
                .build();
    }

}
