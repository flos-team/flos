package com.onehee.flos.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class Message {
    private String message;
    private ErrorCode errorCode;
    private HttpStatus status;
}
