package com.onehee.flos.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.ArrayList;

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
    private Integer nextPage;
    private Integer nextSize;
    public static SliceResponseDTO toDto(Slice<?> data) {
        if (data == null)
            return null;
        List<?> tempContent = new ArrayList<>();
        Integer pageNumber = null;
        Integer pageSize = null;
        Pageable pageable = data.nextPageable();
        if (data.getContent() != null) // null일 때 있음!
            tempContent = data.getContent();
        if (data.nextPageable().isPaged()) { // PageRequest로 들어왔다면...
            pageNumber = pageable.getPageNumber();
            pageSize = pageable.getPageSize();
        }
        return SliceResponseDTO.builder()
                .content(tempContent)
                .isFirst(data.isFirst())
                .isLast(data.isLast())
                .hasContent(data.hasContent())
                .hasNext(data.hasNext())
                .nextPage(pageNumber)
                .nextSize(pageSize)
                .build();
    }
}
