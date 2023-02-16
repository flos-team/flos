package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.request.NotificationCheckRequestDTO;
import com.onehee.flos.model.dto.response.NotificationResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NotificationService {
    NotificationResponseDTO getNotification();
    NotificationResponseDTO checkNotification(NotificationCheckRequestDTO notificationCheckRequestDTO);
}
