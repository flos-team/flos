package com.onehee.flos.auth.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TokenDTO {

    private String atk;

    @JsonIgnore
    private String rtk;

}
