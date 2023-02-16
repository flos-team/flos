package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 게시글별 댓글 리스트
    List<Comment> findAllByPostAndPrimitiveIsNull(Post post);

    // 회원의 댓글 리스트
    List<Comment> findAllByWriterAndPrimitiveIsNull(Member writer);

    // 특정 댓글이 조상인 댓글 리스트
    List<Comment> findAllByPrimitive(Comment primitive);

    // 특정 댓글이 부모인 댓글 리스트
    List<Comment> findAllByParent(Comment parent);

    // 게시글별 댓글 수
    Long countByPost(Post post);

    // 게시글별 채택 댓글 수
    Long countByIsApprove(Boolean bool);

    // 채택된 댓글이 존재하는지
    boolean existsByWriterAndPostAndIsApproveIs(Member writer, Post post, boolean isApproved);

    @Query(value = "delete from comment where members_id = :member", nativeQuery = true)
    void deleteCommentByMember(@Param("member") Member member);
}
