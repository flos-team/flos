package com.onehee.flos.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SliceResponseDTO {
    private List<?> content;
    private Boolean isFirst;
    private Boolean isLast;
    private Boolean hasContent;
    private Boolean hasNext;
    private Pageable nextPageable;
    public static SliceResponseDTO toDto(Slice<?> data) {
        return SliceResponseDTO.builder()
                .content(data.getContent())
                .isFirst(data.isFirst())
                .isLast(data.isLast())
                .hasContent(data.hasContent())
                .hasNext(data.hasNext())
                .nextPageable(data.nextPageable())
                .build();
    }
}
