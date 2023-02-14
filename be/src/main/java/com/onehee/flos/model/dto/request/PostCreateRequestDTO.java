package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@Schema(description = "게시글 생성 DTO")
public class PostCreateRequestDTO {
    @Schema(description = "게시글 내용")
    private final String content;
    @Schema(description = "게시글 날씨 타입", allowableValues={"CLOUDY", "SUNNY", "RAINY"})
    private final WeatherType weather;
    @Schema(description = "게시글 사진 리스트", defaultValue = "[]")
    private final List<MultipartFile> attachFiles;
    @Schema(description = "게시글 태그 리스트", defaultValue = "[]")
    private final List<String> tagList;

    public Post toEntity(Member writer) {
        return Post.builder()
                .writer(writer)
                .content(this.getContent())
                .weather(this.getWeather())
                .build();
    }
}
