package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.MessageType;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Notification {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String message;

    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    @ColumnDefault("now()")
    private LocalDateTime createdAt;

    private Long referenceKey;

    private LocalDateTime checkedAt;
}
