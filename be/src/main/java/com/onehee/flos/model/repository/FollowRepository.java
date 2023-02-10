package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Follow;
import com.onehee.flos.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query("SELECT f.follower FROM Follow f WHERE f.owner = :member ORDER BY f.follower.nickname")
    List<Member> findAllByOwnerByNickname(@Param("member") Member member);

    @Query("SELECT f.owner FROM Follow f WHERE f.follower = :member ORDER BY f.follower.nickname")
    List<Member> findAllByFollowerByName(@Param("member")Member member);

    @Query("SELECT f.follower FROM Follow f WHERE f.owner = :member ORDER BY f.follower.lastLoginAt DESC")
    List<Member> findAllByOwnerOrderByLastLoginAtDesc(@Param("member") Member member);

    @Query("SELECT f.owner FROM Follow f WHERE f.follower = :member ORDER BY f.owner.lastLoginAt DESC")
    List<Member> findAllByFollowerOrderByLastLoginAtDesc(@Param("member")Member member);

    boolean existsByOwnerAndFollower(Member owner, Member follower);

    Optional<Follow> findByOwnerAndFollower(Member owner, Member follower);

}
