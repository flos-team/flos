package com.onehee.flos.model.dto;

import com.onehee.flos.model.dto.response.FileResponseDTO;
import com.onehee.flos.model.dto.response.TagResponseDTO;
import com.onehee.flos.model.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostRelationDTO {
    private List<TagResponseDTO> tagList; // List<Tag> 게시글 태그
    private List<FileResponseDTO> attachFiles; // List<File> 게시글 첨부파일
    private boolean isFollowed;
    private boolean isBookmarked; // Bookmark 게시글 북마크 여부
    private Long countComment;

    public static PostRelationDTO toDto(List<TagResponseDTO> tagList, List<FileResponseDTO> attachFiles, boolean isFollowed, boolean isBookmarked, Long countComment) {
        return PostRelationDTO.builder()
                .tagList(tagList)
                .attachFiles(attachFiles)
                .isFollowed(isFollowed)
                .isBookmarked(isBookmarked)
                .countComment(countComment)
                .build();
    }
}
