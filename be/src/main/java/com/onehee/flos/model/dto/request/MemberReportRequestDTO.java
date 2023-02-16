package com.onehee.flos.model.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberReportRequestDTO {
    private Long reporterId;
    private Long targetId;
    private Boolean isConclusion;
}
