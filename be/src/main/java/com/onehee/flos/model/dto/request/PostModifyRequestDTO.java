package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "게시글 수정 DTO")
public class PostModifyRequestDTO {
    @Schema(description = "수정 대상 게시글의 pk")
    private Long id;
    @Schema(description = "수정 대상 게시글 작성자의 pk")
    private Long writerId;
    @Schema(description = "수정할 게시글 내용")
    private String content;
    @Schema(description = "게시글 수정 시간", defaultValue = "new Date()")
    private LocalDateTime modifiedAt;
    @Schema(description = "게시글 사진 리스트", defaultValue = "[]")
    private List<MultipartFile> attachFiles;
    @Schema(description = "게시글 태그 리스트", defaultValue = "[]")
    private List<String> tagList;
    @JsonIgnore
    private Member writer;

    public Post toAccept(Post post, Member writer) {
        post.setWriter(writer);
        post.setContent(this.getContent());
        post.setModifiedAt(this.getModifiedAt());
        return post;
    }
}
