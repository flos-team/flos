package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.entity.type.RoleType;
import lombok.*;
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
    private RoleType roleType;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(10) default 'LOCAL'")
    private ProviderType providerType;

    private String picture;

    private int water;

    private int light;

    @Column(columnDefinition = "datetime default now()")
    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
