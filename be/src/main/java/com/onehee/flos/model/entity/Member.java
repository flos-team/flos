package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.MemberStatus;
import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.entity.type.RoleType;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Members")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "members_id")
    private Long id;

    private String email;

    private String nickname;

    private String password;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'USER'")
    private RoleType roleType;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'LOCAL'")
    private ProviderType providerType;

    @OneToOne
    @JoinColumn(name = "files_id")
    private FileEntity profileImage;

    @ColumnDefault("'안녕하세요~'")
    private String introduction;

    @ColumnDefault("0")
    private int water;

    @ColumnDefault("0")
    private int light;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'ACTIVE'")
    private MemberStatus status;

    @ColumnDefault("now()")
    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
