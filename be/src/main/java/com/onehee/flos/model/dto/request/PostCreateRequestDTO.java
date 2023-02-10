package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.Tag;
import com.onehee.flos.model.entity.type.WeatherType;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
public class PostCreateRequestDTO {
    private final String content;
    private final WeatherType weather;
    private final List<MultipartFile> attachFiles;
    private final List<String> tagList;

    public Post toEntity(Member writer) {
        return Post.builder()
                .writer(writer)
                .content(this.getContent())
                .weather(this.getWeather())
                .build();
    }
}
