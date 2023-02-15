package com.onehee.flos.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Notification;
import com.onehee.flos.model.entity.type.MessageType;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Setter(AccessLevel.NONE)
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationDTO {

    private Long id;

    @Setter
    private MessageType messageType;

    @Setter
    private String message;

    private LocalDateTime createdAt;

    @Setter
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
