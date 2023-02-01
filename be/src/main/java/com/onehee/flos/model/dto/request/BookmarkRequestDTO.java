package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Bookmark;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookmarkRequestDTO {

    private Post post;

    public static BookmarkRequestDTO toDto(Bookmark bookmark) {
        return BookmarkRequestDTO.builder()
                .post(bookmark.getPost())
                .build();
    }

    public Bookmark toEntity() {
        return Bookmark.builder()
                .post(this.getPost())
                .build();
    }
}
