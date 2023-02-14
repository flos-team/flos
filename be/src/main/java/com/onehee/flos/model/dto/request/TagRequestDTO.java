package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Tag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TagRequestDTO {
    private String tagName;

    public Tag toEntity() {
        return Tag.builder()
                .tagName(this.getTagName())
                .build();
    }

}
