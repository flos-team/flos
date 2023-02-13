package com.onehee.flos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.FileNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Message> badRequestHandler(BadRequestException e) {
        Message message = new Message(e.getMessage(), null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<Message> forbiddenHandler(ForbiddenException e) {
        Message message = new Message(e.getMessage(),null, HttpStatus.FORBIDDEN);
        return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UnauthorizedEmailException.class)
    public ResponseEntity<Message> unauthorizedEmailHandler(UnauthorizedEmailException e) {
        Message message = new Message(e.getMessage(), null, HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<Message> fileNotFoundHandler() {
        Message message = new Message("해당 파일을 찾을 수 없습니다.", null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FlowerNotExistsException.class)
    public ResponseEntity<Message> flowerNotExistsHandler() {
        Message message = new Message(ErrorCode.NO_FLOWER_EXISTS.getErrorMessage(), ErrorCode.NO_FLOWER_EXISTS, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

}
