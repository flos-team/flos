package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostCreateRequestDTO {
    private String content;
    private Member writer;
    private WeatherType weather;
    // List<File>
    // List<Tag>

    public static PostCreateRequestDTO toDTO(Post post) {
        return PostCreateRequestDTO.builder()
                .writer(post.getWriter())
                .content(post.getContent())
                .weather(post.getWeather())
                .build();
    }

    public Post toEntity() {
        return Post.builder()
                .writer(this.getWriter())
                .content(this.getContent())
                .weather(this.getWeather())
                .build();
    }
}
