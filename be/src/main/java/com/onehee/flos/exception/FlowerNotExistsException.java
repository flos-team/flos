package com.onehee.flos.exception;

import lombok.Getter;

@Getter
public class FlowerNotExistsException extends RuntimeException {
    public FlowerNotExistsException() {
        super();
    }
}
