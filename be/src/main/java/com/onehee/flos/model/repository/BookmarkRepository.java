package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Bookmark;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    // 포스트 기준 탐색
    List<Bookmark> findByPost(Member member);

    // 작성자 기준 탐색
    List<Bookmark> findByMember(Post post);

}
