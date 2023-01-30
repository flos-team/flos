package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostModifyRequestDTO {
    private Long id;
    private Member writer;
    private String content;
    private LocalDateTime modifyDate;
    // List<File>
    // List<Tag>

    public static PostModifyRequestDTO toDto(Post post) {
        return PostModifyRequestDTO.builder()
                .id(post.getId())
                .writer(post.getWriter())
                .content(post.getContent())
                .modifyDate(post.getModifyDate())
                .build();
    }

    public Post toEntity() {
        return Post.builder()
                .id(this.getId())
                .writer(this.getWriter())
                .content(this.getContent())
                .modifyDate(this.getModifyDate())
                .build();
    }
}
