package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.FlowerState;
import com.onehee.flos.model.entity.type.FlowerType;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
public class Flower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flower_id")
    private Long id;

    private String name;

    private Long height;

    @OneToOne
    @JoinColumn(name = "files_id")
    private FileEntity profileImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "members_id")
    private Member owner;

    @Enumerated(EnumType.STRING)
    private FlowerState state;

    @Enumerated(EnumType.STRING)
    private FlowerType flowerType;

    @ColumnDefault("now()")
    private LocalDateTime createdAt; // 수정 불가

    private LocalDateTime blossomAt;

}
