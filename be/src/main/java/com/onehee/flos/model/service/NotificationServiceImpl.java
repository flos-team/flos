package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.NotificationDTO;
import com.onehee.flos.model.dto.request.NotificationCheckRequestDTO;
import com.onehee.flos.model.dto.response.NotificationResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Notification;
import com.onehee.flos.model.repository.NotificationRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public NotificationResponseDTO getNotification() {
        Member member = SecurityManager.getCurrentMember();
        List<Notification> notifications = notificationRepository.findAllByMemberAndCheckedAtIsNull(member);
        return new NotificationResponseDTO(notifications.stream().map(NotificationDTO::toDTO).collect(Collectors.toList()));
    }

    @Override
    @Transactional
    public NotificationResponseDTO checkNotification(NotificationCheckRequestDTO notificationCheckRequestDTO) {
        Notification notification = notificationRepository.findById(notificationCheckRequestDTO.getId())
                .orElseThrow(() -> new BadRequestException("유효하지 않은 알림입니다."));
        notification.setCheckedAt(LocalDateTime.now());
        notificationRepository.flush();
        return getNotification();
    }
}
