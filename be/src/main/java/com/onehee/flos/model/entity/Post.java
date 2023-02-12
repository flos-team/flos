package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.WeatherType;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "members_id")
    private Member writer;

    @Column(length = 2000)
    private String content;

    @ColumnDefault("now()")
    private LocalDateTime createdAt; // 수정 불가

    private LocalDateTime modifiedAt;

    @Enumerated(EnumType.STRING)
    private WeatherType weather;
}
