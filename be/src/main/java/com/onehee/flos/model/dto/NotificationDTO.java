package com.onehee.flos.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.onehee.flos.model.entity.Notification;
import com.onehee.flos.model.entity.type.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationDTO {
    private Long id;
    private MessageType messageType;
    private String message;
    private LocalDateTime createdAt;

    private Object data;

    public static NotificationDTO toDTO(Notification notification) {
        return NotificationDTO.builder()
                .id(notification.getId())
                .messageType(notification.getMessageType())
                .message(notification.getMessage())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
