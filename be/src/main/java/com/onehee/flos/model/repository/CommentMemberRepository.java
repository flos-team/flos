package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.CommentMember;
import com.onehee.flos.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentMemberRepository extends JpaRepository<CommentMember, Long> {

    // 회원이 좋아요한 댓글
    List<CommentMember> findAllByMember(Member member);

    // 댓글에 좋아요한 회원
    List<CommentMember> findAllByComment(Comment comment);

    // 댓글 좋아요 여부
    CommentMember findByCommentAndMember(Comment comment, Member member);
}
