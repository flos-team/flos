package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Bookmark;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@RequiredArgsConstructor
@Schema(description = "북마크 요청 DTO")
public class BookmarkRequestDTO {
    @Schema(description = "북마크 대상 게시글의 pk")
    private Long id;
}
