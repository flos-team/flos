package com.onehee.flos.model.entity;

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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "par_comment_id")
    private Comment parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pri_comment_id")
    private Comment primitive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "members_id")
    private Member writer;

    @Column(length = 200)
    private String content;

    @ColumnDefault("now()")
    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    @ColumnDefault("0")
    private Boolean isApprove;

//    @OneToMany(mappedBy="parent", fetch = FetchType.LAZY)
//    private List<Comment> children = new ArrayList<>();

    @OneToMany(mappedBy="primitive", fetch = FetchType.LAZY)
    private List<Comment> descendants = new ArrayList<>();
}
