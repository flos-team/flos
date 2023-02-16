package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.NotificationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NotificationResponseDTO {
    private List<NotificationDTO> notifications;
}
