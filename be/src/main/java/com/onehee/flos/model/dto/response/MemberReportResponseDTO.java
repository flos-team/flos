package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Report;
import com.onehee.flos.model.entity.type.Conclusion;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder(access = AccessLevel.PRIVATE)
public class MemberReportResponseDTO {
    private Long id;
    private MemberResponseDTO reporter;
    private MemberResponseDTO target;
    private String description;
    private Conclusion conclusion;
    private LocalDateTime createdAt;
    private LocalDateTime confirmedAt;

    public static MemberReportResponseDTO toDTO(Report report) {
        return MemberReportResponseDTO.builder()
                .id(report.getId())
                .reporter(MemberResponseDTO.toDto(report.getReporter()))
                .target(MemberResponseDTO.toDto(report.getTarget()))
                .description(report.getDescription())
                .conclusion(report.getConclusion())
                .createdAt(report.getCreatedAt())
                .confirmedAt(report.getConfirmedAt())
                .build();
    }
}
