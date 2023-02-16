package com.onehee.flos.model.repository;


import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 날씨에 해당하는 포스트
    Slice<Post> findSliceByWeather(WeatherType weatherType, Pageable pageable);

    // 포스트 리스트
    Slice<Post> findSliceBy(Pageable pageable);

    // 작성자에 해당하는 포스트
    @Query(value = "select p.* from post p where p.members_id in (select members_id from members where nickname like ?1%)" , nativeQuery = true)
    Slice<Post> findSliceByNickname(String nickName, Pageable pageable);

    // 게시글 댓글 많은순 검색
    @Query(value = "select p.* from post p left join (select post_id, count(*) as cnt from comment group by post_id) as pc on p.post_id = pc.post_id order by pc.cnt desc, p.created_at desc", nativeQuery = true)
    Slice<Post> findSliceByCountComment(Pageable pageable);

    // 태그 기준으로 검색
    @Query(value = "select p.* from post p where p.post_id in (select pt.post_id from post_tag pt where pt.tag_id in (select tag_id from tag where tag_name like ?1%))", nativeQuery = true)
    Slice<Post> findSliceByTagName(String tagName, Pageable pageable);

    // 북마크한 작성자 포스트
    @Query(value = "select p.* from post p where p.post_id in (select bm.post_id from bookmark bm where bm.members_id = ?1)", nativeQuery = true)
    Slice<Post> findSliceByBookmark(Member writer, Pageable pageable);

    // 팔로우한 사람 게시글 리스트
    @Query(value = "select p.* from post p where p.members_id in (select flw.owner_id from follow flw where flw.follower_id = ?1)", nativeQuery = true)
    Slice<Post> findSliceByFollow(Member member, Pageable pageable);

    // 특정시간 이후에 작성한 게시글의 존재여부 확인
    boolean existsByWriterAndCreatedAtIsAfter(Member writer, LocalDateTime createdAt);

    // 가장 최근에 작성한 게시글을 반환
    Post findFirstByWriterOrderByCreatedAtDesc(Member writer);

    // 기간안에 특정 사용자가 작성한 포스트 모두 반환
    List<Post> findAllByWriterAndCreatedAtBetween(Member writer, LocalDateTime start, LocalDateTime end);

    // 게시글의 태그 연결정보 삭제 (태그삭제 x)
    @Query(value = "delete from post_tag where post_id = :post", nativeQuery = true)
    void deleteTagByPost(@Param("post") Post post);

    // 게시글의 파일 연결정보 삭제 (파일삭제 x)
    @Query(value = "delete from post_file where post_id = :post", nativeQuery = true)
    void deleteFileByPost(@Param("post") Post post);

    // 게시글의 북마크 정보 삭제
    @Query(value = "delete from bookmark where post_id = :post", nativeQuery = true)
    void deleteBookmarkByPost(@Param("post") Post post);

    // 게시글의 종속댓글 삭제
    @Query(value = "delete from comment where post_id = :post and pri_comment_id is not null", nativeQuery = true)
    void deletePriCommentByPost(@Param("post") Post post);

    // 게시글의 상위댓글 삭제
    @Query(value = "delete from comment where post_id = :post", nativeQuery = true)
    void deleteCommentByPost(@Param("post") Post post);

    @Query(value = "delete from post where members_id = :member", nativeQuery = true)
    void deletePostByMember(@Param("member") Member member);

}
