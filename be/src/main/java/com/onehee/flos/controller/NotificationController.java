package com.onehee.flos.controller;

import com.onehee.flos.model.dto.request.NotificationCheckRequestDTO;
import com.onehee.flos.model.dto.response.NotificationResponseDTO;
import com.onehee.flos.model.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<?> getNotification() {
        NotificationResponseDTO notificationResponseDTO = notificationService.getNotification();
        HttpStatus status = notificationResponseDTO.getNotifications().size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<NotificationResponseDTO>(notificationResponseDTO, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> checkNotification(@PathVariable("id") Long id) {
        NotificationResponseDTO notificationResponseDTO = notificationService.checkNotification(new NotificationCheckRequestDTO(id));
        HttpStatus status = notificationResponseDTO.getNotifications().size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<NotificationResponseDTO>(notificationResponseDTO, status);
    }
}
