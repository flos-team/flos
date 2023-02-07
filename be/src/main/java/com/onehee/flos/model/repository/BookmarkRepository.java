package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Bookmark;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    // 게시글별 북마크 상태 리스트 - not use...
    List<Bookmark> findAllByPost(Post post);

    // 회원이 게시글을 북마크 했는지
    boolean existsByPostAndMember(Post post, Member member);

    // 회원의 북마크 정보
    Optional<Bookmark> findByPostAndMember(Post post, Member member);
}
