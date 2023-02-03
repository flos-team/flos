package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.FileEntity;
import lombok.Builder;
import lombok.Getter;

import java.io.File;
import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class FileResponseDTO {
    private String originalName;
    private String saveName;

    @Builder
    private FileResponseDTO(String originalName, String saveName) {
        this.originalName = originalName;
        this.saveName = saveName;
    }

    public static FileResponseDTO toDTO(FileEntity fileEntity) {
        if (fileEntity == null) return null;
        String createDate = fileEntity.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        return FileResponseDTO.builder()
                .originalName(fileEntity.getOriginalName())
                .saveName(createDate + "/" + fileEntity.getSavedName())
                .build();
    }
}
