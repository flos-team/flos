package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostTagRepository extends JpaRepository<PostTag, Long> {

    // 파일 기준으로 탐색
    List<PostTag> findAllByTag(Tag tag);

    // 포스트 기준으로 탐색
    List<PostTag> findAllByPost(Post post);

    // 게시글의 태그 존재 여부 
    boolean existsByTagAndPost(Tag tag, Post post);
}
