package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponseDTO {
    private Long id;
    private Member writer;
    private String content;
    private LocalDateTime regDate;
//    private LocalDateTime modifyDate;
    private WeatherType weather;
    // List<Tag> 게시글 태그
    // List<File> 게시글 첨부파일
    // Follow 게시글 팔로우 여부
    // Bookmark 게시글 북마크 여부
    // List<Comment> 게시글 댓글 수

    public static PostResponseDTO toDto(Post post) {
        return PostResponseDTO.builder()
                .id(post.getId())
                .writer(post.getWriter())
                .content(post.getContent())
                .regDate(post.getCreatedAt())
//                .modifyDate(post.getModifyDate())
                .build();
    }

}