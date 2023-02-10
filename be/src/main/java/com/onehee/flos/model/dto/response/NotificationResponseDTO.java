package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.NotificationDTO;
import lombok.Data;

import java.util.List;

@Data
public class NotificationResponseDTO {
    private final List<NotificationDTO> notifications;
}
