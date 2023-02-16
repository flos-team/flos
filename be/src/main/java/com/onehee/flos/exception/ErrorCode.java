package com.onehee.flos.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    NO_FLOWER_EXISTS("해당 꽃을 찾을 수 없습니다.");

    private final String errorMessage;

}
