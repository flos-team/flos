package com.onehee.flos.model.entity;

import com.onehee.flos.model.entity.type.Conclusion;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Report {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id")
    private Member reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_id")
    private Member target;

    private String description;

    @Enumerated(EnumType.STRING)
    private Conclusion conclusion;

    @ColumnDefault("now()")
    private LocalDateTime createdAt;

    private LocalDateTime confirmedAt;

}
