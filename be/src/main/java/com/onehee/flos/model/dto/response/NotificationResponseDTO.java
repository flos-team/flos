package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.NotificationDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class NotificationResponseDTO {
    private List<NotificationDTO> notifications;
}
