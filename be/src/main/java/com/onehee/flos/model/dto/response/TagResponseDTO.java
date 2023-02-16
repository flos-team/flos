package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagResponseDTO {
    private String tagName;

    public static TagResponseDTO toDto(Tag tag) {
        return TagResponseDTO.builder()
                .tagName(tag.getTagName())
                .build();
    }
}