package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.util.SecurityManager;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.Basic;
import javax.persistence.FetchType;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDTO {
    private Long id;
    private Long postId;
    private Long parentId;
    private Long primitiveId;
    private MemberResponseDTO writer;
    private String content;
    private LocalDateTime createdAt;
    //    private LocalDateTime modifiedAt;
    private Boolean isApprove;
    private Boolean isMine;
    private Boolean isCommented;

    public static CommentResponseDTO toDto(Comment comment) {
        Long parent = null;
        Long primitive = null;
        boolean isCommented = false;
        if (comment.getDescendants().size() > 0)
            isCommented = true;
        if (comment.getParent() != null)
            parent = comment.getParent().getId();
        if (comment.getPrimitive() != null)
            primitive = comment.getPrimitive().getId();
        return CommentResponseDTO.builder()
                .id(comment.getId())
                .postId(comment.getPost().getId())
                .parentId(parent)
                .primitiveId(primitive)
                .writer(comment.getContent()==null ? null : MemberResponseDTO.toDto(comment.getWriter()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
//                .modifyAt(comment.getModifiedAt())
                .isApprove(comment.getIsApprove())
                .isMine(comment.getWriter().getId() == SecurityManager.getCurrentMember().getId())
                .isCommented(isCommented)
                .build();
    }

}
