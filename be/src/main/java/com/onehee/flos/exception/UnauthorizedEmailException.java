package com.onehee.flos.exception;

import lombok.Getter;

@Getter
public class UnauthorizedEmailException extends RuntimeException {
    public UnauthorizedEmailException(String message) {
        super(message);
    }
}
