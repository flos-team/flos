package com.onehee.flos.model.dto;

import com.onehee.flos.model.dto.response.FileResponseDTO;
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
    private List<Tag> tagList; // List<Tag> 게시글 태그
    private List<FileResponseDTO> attachFiles; // List<File> 게시글 첨부파일
    // Follow 게시글 팔로우 여부
    private Boolean isBookmarked; // Bookmark 게시글 북마크 여부
    // Integer 게시글 댓글 수

    public static PostRelationDTO toDto(List<Tag> tagList, List<FileResponseDTO> attachFiles, Boolean isBookmarked) {
        return PostRelationDTO.builder()
                .tagList(tagList)
                .attachFiles(attachFiles)
                .isBookmarked(isBookmarked)
                .build();
    }
}
