package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.PostRelationDTO;
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
    private PostRelationDTO postRelationDTO;

    public static PostResponseDTO toDto(Post post, PostRelationDTO postRelationDTO) {
        return PostResponseDTO.builder()
                .id(post.getId())
                .writer(post.getWriter())
                .content(post.getContent())
                .regDate(post.getCreatedAt())
//                .modifyDate(post.getModifyDate())
                .postRelationDTO(postRelationDTO)
                .build();
    }

}