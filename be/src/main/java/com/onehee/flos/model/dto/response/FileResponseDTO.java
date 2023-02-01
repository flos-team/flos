package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.FileEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileResponseDTO {
    private String originalName;
    private String savePath;

    @Builder
    private FileResponseDTO(String originalName, String savePath) {
        this.originalName = originalName;
        this.savePath = savePath;
    }

    public static FileResponseDTO toDTO(FileEntity fileEntity) {
        if (fileEntity == null) return null;
        return FileResponseDTO.builder()
                .originalName(fileEntity.getOriginalName())
                .savePath(fileEntity.getSavedPath())
                .build();
    }
}
