package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.PostRelationDTO;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
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
@Schema(description = "게시글의 정보")
public class PostResponseDTO {
    @Schema(description = "게시글의 pk")
    private Long id;
    @Schema(description = "게시글의 작성자 정보")
    private MemberResponseDTO writer;
    @Schema(description = "게시글의 내용")
    private String content;
    @Schema(description = "게시글의 생성시간")
    private LocalDateTime regDate;
    //    private LocalDateTime modifyDate;
    @Schema(description = "게시글의 날씨 정보")
    private WeatherType weather;
    @Schema(description = "게시글의 관계테이블 정보")
    private PostRelationDTO relation;

    public static PostResponseDTO toDto(Post post, PostRelationDTO postRelationDTO) {
        return PostResponseDTO.builder()
                .id(post.getId())
                .writer(MemberResponseDTO.toDto(post.getWriter()))
                .content(post.getContent())
                .regDate(post.getCreatedAt())
                .weather(post.getWeather())
//                .modifyDate(post.getModifyDate())
                .relation(postRelationDTO)
                .build();
    }

}