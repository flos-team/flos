package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.type.Conclusion;
import lombok.Data;

@Data
public class MemberReportProcessRequestDTO {
    private Long id;
    private Conclusion conclusion;
}
