package com.onehee.flos.model.entity;

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
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class FileEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "files_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "members_id")
    private Member member;

    private String originalName;

    private String savedName;

    private String savedPath;

    @ColumnDefault("now()")
    private LocalDateTime createdAt;
}
