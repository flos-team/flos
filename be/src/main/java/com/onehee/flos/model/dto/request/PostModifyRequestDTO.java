package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.Tag;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostModifyRequestDTO {
    private Long id;
    private Member writer;
    private String content;
    private LocalDateTime modifyAt;
    private List<MultipartFile> attachFiles;
    private List<Tag> tagList;

    public static PostModifyRequestDTO toDto(Post post) {
        return PostModifyRequestDTO.builder()
                .id(post.getId())
                .writer(post.getWriter())
                .content(post.getContent())
                .modifyAt(post.getModifyAt())
                .build();
    }

    public Post toEntity() {
        return Post.builder()
                .id(this.getId())
                .writer(this.getWriter())
                .content(this.getContent())
                .modifyAt(this.getModifyAt())
                .build();
    }
}
