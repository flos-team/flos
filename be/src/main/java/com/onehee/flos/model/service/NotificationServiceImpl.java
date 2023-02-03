package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.request.NotificationCheckRequestDTO;
import com.onehee.flos.model.dto.response.NotificationResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Notification;
import com.onehee.flos.model.repository.NotificationRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public NotificationResponseDTO getNotification() {
        Member member = SecurityManager.getCurrentMember();
        List<Notification> notifications = notificationRepository.findAllByMemberAndCheckedAtIsNull(member);
        return null;
    }

    @Override
    public NotificationResponseDTO checkNotification(NotificationCheckRequestDTO notificationCheckRequestDTO) {
        return null;
    }
}
