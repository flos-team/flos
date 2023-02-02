package com.onehee.flos.auth.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TokenResponse {

    private String atk;

    private String rtk;

}
