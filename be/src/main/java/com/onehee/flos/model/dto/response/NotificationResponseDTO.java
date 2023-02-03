package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.dto.NotificationDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDTO {
    private List<NotificationDTO> notifications;
}
