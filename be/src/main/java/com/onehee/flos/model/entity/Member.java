package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.entity.type.RoleType;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Members")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "members_id")
    private Long id;

    private String email;

    private String nickname;

    private String password;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'LOCAL'")
    private ProviderType providerType;

    private String picture;

    private int water;

    private int light;

    @ColumnDefault("now()")
    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
