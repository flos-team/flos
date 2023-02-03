package com.onehee.flos.model.dto;

import com.onehee.flos.model.entity.Notification;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
@Builder
public class NotificationDTO {
    private Long id;
    private String message;
    private LocalDateTime createdAt;

    public static NotificationDTO toDTO(Notification notification) {
        return NotificationDTO.builder()
                .id(notification.getId())
                .message(notification.getMessage())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
