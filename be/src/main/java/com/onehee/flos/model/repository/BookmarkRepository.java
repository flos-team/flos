package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Bookmark;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    // 게시글별 북마크 상태 리스트
    List<Bookmark> findAllByPost(Post post);

    // 회원별 북마크 상태 리스트
    List<Bookmark> findAllByMember(Member member);

    // 회원이 게시글을 북마크 했는지
    Bookmark findByPostAndMember(Post post, Member member);
}
