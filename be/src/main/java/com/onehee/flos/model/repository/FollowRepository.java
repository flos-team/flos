package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Follow;
import com.onehee.flos.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query("select f.follower FROM Follow f WHERE f.owner = :member")
    List<Member> findAllByOwner(@Param(":member") Member member);
}
