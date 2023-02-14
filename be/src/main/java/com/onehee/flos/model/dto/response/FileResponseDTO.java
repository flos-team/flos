package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.FileEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

import java.time.format.DateTimeFormatter;

@Data
@Setter(AccessLevel.NONE)
@Builder(access = AccessLevel.PRIVATE)
public class FileResponseDTO {
    private String originalName;
    private String saveName;

    public static FileResponseDTO toDTO(FileEntity fileEntity) {
        if (fileEntity == null) return getDefaultDTO();
        String createDate = fileEntity.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        return FileResponseDTO.builder()
                .originalName(fileEntity.getOriginalName())
                .saveName(createDate + "/" + fileEntity.getSavedName())
                .build();
    }

    private static FileResponseDTO getDefaultDTO() {
        return FileResponseDTO.builder()
                .originalName("profile_image.png")
                .saveName("default/profile_image.png")
                .build();
    }
}
