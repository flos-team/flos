package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.WeatherType;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Post")
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

    @Column(length = 1000)
    private String content;

    @Column(columnDefinition = "datetime default now()", insertable = false, updatable = false)
    private LocalDateTime createdAt; // 수정 불가

    @Column(columnDefinition = "datetime default now()")
    private LocalDateTime modifyAt;

    @Enumerated(EnumType.STRING)
    private WeatherType weather;

}
