package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Notification;
import com.onehee.flos.model.entity.type.MessageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByMemberAndCheckedAtIsNullOrderByCreatedAtDesc(Member member);

    boolean existsByMemberAndMessageTypeAndCheckedAtAfter(Member member, MessageType messageType, LocalDateTime checkedAt);
}