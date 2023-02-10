package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.MemberStatus;
import com.onehee.flos.model.entity.type.ProviderType;
import com.onehee.flos.model.entity.type.RoleType;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

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

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM weather_resource wr WHERE wr.owner_id = members_id AND wr.weather_type = 'RAINY' AND wr.flower_id IS NULL)")
    private int water;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM weather_resource wr WHERE wr.owner_id = members_id AND wr.weather_type = 'SUNNY' AND wr.flower_id IS NULL)")
    private int light;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM weather_resource wr WHERE wr.owner_id = members_id AND wr.weather_type = 'RAINY')")
    private int totalWater;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM weather_resource wr WHERE wr.owner_id = members_id AND wr.weather_type = 'SUNNY')")
    private int totalLight;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM follow f WHERE f.owner_id = members_id)")
    private int followerCount;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM follow f WHERE f.follower_id = members_id)")
    private int followingCount;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM post p WHERE p.members_id = members_id)")
    private int postCount;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM flower f WHERE f.members_id = members_id AND f.blossom_at IS NOT NULL)")
    private int blossomCount;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'ACTIVE'")
    private MemberStatus status;

    @ColumnDefault("now()")
    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private LocalDateTime lastLoginAt;

}
