package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.util.SecurityManager;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "댓글 정보")
public class CommentResponseDTO {
    @Schema(description = "댓글의 pk")
    private Long id;
    @Schema(description = "댓글이 달린 게시글의 pk")
    private Long postId;
    @Schema(description = "대댓글의 참조 (미사용)")
    private Long parentId;
    @Schema(description = "내가 대댓글이라면 댓글의 pk")
    private Long primitiveId;
    @Schema(description = "댓글 작성자의 정보")
    private MemberResponseDTO writer;
    @Schema(description = "댓글의 내용")
    private String content;
    @Schema(description = "댓글 작성 시간")
    private LocalDateTime createdAt;
    //    private LocalDateTime modifiedAt;
    @Schema(description = "댓글 채택 여부")
    private Boolean isApprove;
    @Schema(description = "댓글 소유 여부")
    private Boolean isMine;
    @Schema(description = "대댓글이 있는지 여부")
    private Boolean isCommented;

    public static CommentResponseDTO toDto(Comment comment) {
        Long parent = null;
        Long primitive = null;
        boolean isCommented = comment.getDescendants().size() > 0;
        if (comment.getParent() != null)
            parent = comment.getParent().getId();
        if (comment.getPrimitive() != null)
            primitive = comment.getPrimitive().getId();
        return CommentResponseDTO.builder()
                .id(comment.getId())
                .postId(comment.getPost().getId())
                .parentId(parent)
                .primitiveId(primitive)
                .writer(comment.getContent() == null ? null : MemberResponseDTO.toDto(comment.getWriter()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
//                .modifyAt(comment.getModifiedAt())
                .isApprove(comment.getIsApprove())
                .isMine(SecurityManager.getCurrentMember().getId().equals(comment.getWriter().getId()))
                .isCommented(isCommented)
                .build();
    }

}
