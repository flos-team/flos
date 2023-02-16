package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    // 태그 이름으로 태그 검색
    Optional<Tag> findByTagName(String tagName);

}
