package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.FlowerState;
import com.onehee.flos.model.entity.type.FlowerType;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

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

    private String letter;

    @ColumnDefault("false")
    private Boolean gardening;

    @ColumnDefault("false")
    private Boolean lettering;

    @ColumnDefault("10")
    private Long capacity;

    @OneToOne
    @JoinColumn(name = "files_id")
    private FileEntity flowerImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "members_id")
    private Member owner;

    @Enumerated(EnumType.STRING)
    private FlowerState state;

    @Enumerated(EnumType.STRING)
    private FlowerType flowerType;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM weather_resource wr WHERE wr.flower_id = flower_id AND wr.weather_type = 'RAINY')")
    private int water;

    @Basic(fetch = FetchType.LAZY)
    @Formula("(SELECT COUNT(1) FROM weather_resource wr WHERE wr.flower_id = flower_id AND wr.weather_type = 'SUNNY')")
    private int light;

    @ColumnDefault("now()")
    private LocalDateTime createdAt; // 수정 불가

    private LocalDateTime blossomAt;

}
