package com.onehee.flos.model.repository;


import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 날씨에 해당하는 포스트
    Slice<Post> findSliceByWeather(WeatherType weatherType, Pageable pageable);

    // 포스트 리스트
    Slice<Post> findSliceBy(Pageable pageable);

    // 작성자에 해당하는 포스트
    @Query("select p from Post p where p.writer.nickname = ?1")
    Slice<Post> findSliceByNickname(String nickName, Pageable pageable);

    // 게시글 댓글 많은순 검색
    @Query(value = "select p.* from post p left join (select post_id, count(*) as cnt from comment group by post_id) as pc on p.post_id = pc.post_id order by pc.cnt desc, p.created_at desc", nativeQuery = true)
    Slice<Post> findSliceByCountComment(Pageable pageable);

    // 태그 기준으로 검색
    @Query(value = "select p.* from post p where p.post_id in (select pt.post_id from post_tag pt where pt.tag_id in (select tag_id from tag where tag_name = ?1))", nativeQuery = true)
    Slice<Post> findSliceByTagName(String tagName, Pageable pageable);

    // 북마크한 작성자 포스트
    @Query(value = "select p.* from post p where p.post_id in (select bm.post_id from bookmark bm where bm.members_id = ?1.members_id)", nativeQuery = true)
    Slice<Post> findSliceByBookmark(Member writer, Pageable pageable);

    // 팔로우한 사람 게시글 리스트
    @Query(value = "select p.* from post p where p.members_id in (select flw.owner_id from follow flw where flw.follower_id = ?1.members_id)", nativeQuery = true)
    Slice<Post> findSliceByFollow(Member member, Pageable pageable);

    // 특정시간 이후에 작성한 게시글의 존재여부 확인
    boolean existsByWriterAndCreatedAtIsAfter(Member writer, LocalDateTime createdAt);

    // 가장 최근에 작성한 게시글을 반환
    Post findFirstByWriterOrderByCreatedAtDesc(Member writer);

//    @Query(value = "select t.tag_name from tag t where t.tag_id in (select tag_id from post_tag where post_id = ?1.post_id)", nativeQuery = true)
//    List<String> getTagListByPost(Post post);
//
//    @Query(value = "select * from file_entity f where f.files_id in (select files_id from post_file where post_id = ?1.post_id)", nativeQuery = true)
//    List<FileEntity> getFileListByPost(Post post);
//
//    @Query(value = "select count(1) from bookmark bm where bm.post_id = ?1.post_id and bm.members_id = ?2.members_id", nativeQuery = true)
//    Boolean isBookmarked(Post post, Member member);
//
//    @Query(value = "select count(1) from follow f where f.owner_id = ?1.writer.members_id and f.follower_id = ?2.members_id", nativeQuery = true)
//    Boolean isFollowed(Post post, Member member);
//
//    @Query(value = "select count(c) from comment c where c.post_id = ?1.post_id", nativeQuery = true)
//    Long countCommentByPost(Post post);
}
