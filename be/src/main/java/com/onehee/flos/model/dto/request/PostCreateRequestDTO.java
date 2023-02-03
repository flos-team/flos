package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.Tag;
import com.onehee.flos.model.entity.type.WeatherType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostCreateRequestDTO {
    private String content;
    private WeatherType weather;
    private List<MultipartFile> attachFiles;
    private List<TagRequestDTO> tagList;

    public Post toEntity(Member writer) {
        return Post.builder()
                .writer(writer)
                .content(this.getContent())
                .weather(this.getWeather())
                .build();
    }
}
