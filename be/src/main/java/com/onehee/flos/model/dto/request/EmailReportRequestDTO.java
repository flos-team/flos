package com.onehee.flos.model.dto.request;

import lombok.Data;

@Data
public class EmailReportRequestDTO {
    private String sender;
    private String message;
}