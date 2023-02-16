package com.onehee.flos.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.NotificationDTO;
import com.onehee.flos.model.dto.request.MemberSelectRequestDTO;
import com.onehee.flos.model.dto.request.NotificationCheckRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.dto.response.NotificationResponseDTO;
import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Notification;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.MessageType;
import com.onehee.flos.model.repository.CommentRepository;
import com.onehee.flos.model.repository.MemberRepository;
import com.onehee.flos.model.repository.NotificationRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final PostService postService;
    private final MemberService memberService;
    private final CommentRepository commentRepository;
    private final ObjectMapper objectMapper;

    @Override
    public NotificationResponseDTO getNotification() {
        Member member = SecurityManager.getCurrentMember();
        List<Notification> notifications = notificationRepository.findAllByMemberAndCheckedAtIsNullOrderByCreatedAtDesc(member);
        return new NotificationResponseDTO(
                notifications.stream()
                        .map(this::getNotificationDTO)
                        .collect(Collectors.toList())
        );
    }

    private NotificationDTO getNotificationDTO(Notification notification) {
        NotificationDTO notificationDTO = NotificationDTO.toDTO(notification);
        try {
            if (List.of(2, 3).contains(notificationDTO.getMessageType().ordinal())) {
                Comment comment = (Comment) getReference(notification);
                Map<String, Object> data = objectMapper.convertValue(postService.getPost(comment.getPost().getId()), Map.class);
                data.put("commenter", MemberResponseDTO.toDto(comment.getWriter()));
                notificationDTO.setData(data);
            } else {
                notificationDTO.setData(getReference(notification));
            }
        } catch (BadRequestException e) {
            notificationDTO.setMessage("[삭제됨]" + notificationDTO.getMessage());
            notificationDTO.setMessageType(MessageType.UNAVAILABLE);
        }
        return notificationDTO;
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

    private Object getReference(Notification notification) {
        return switch (notification.getMessageType().ordinal()) {
            // FOLLOW : 0
            case 0 -> memberService.getMemberInfo(new MemberSelectRequestDTO(notification.getReferenceKey()));
            // NEWCOMMENT : 2
            // NEWREPLY : 3
            case 2, 3 -> commentRepository.findById(notification.getReferenceKey()).orElseThrow(() -> new BadRequestException("댓글을 가져오는 도중 오류가 발생했습니다."));
            // NEWFEED : 1
            // COMMENTCHOSEN : 6
            case 1, 6 -> postService.getPost(notification.getReferenceKey());
            default -> null;
        };
    }
}
