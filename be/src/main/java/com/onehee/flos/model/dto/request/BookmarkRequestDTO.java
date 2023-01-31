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

    private Long id;
    private Post post;
    private Member member;

    public static BookmarkRequestDTO toDto(Bookmark bookmark) {
        return BookmarkRequestDTO.builder()
                .id(bookmark.getId())
                .post(bookmark.getPost())
                .member(bookmark.getMember())
                .build();
    }

    public Bookmark toEntity() {
        return Bookmark.builder()
                .post(this.getPost())
                .member(this.getMember())
                .build();
    }
}
