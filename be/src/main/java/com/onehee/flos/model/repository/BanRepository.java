package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Ban;
import com.onehee.flos.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface BanRepository extends JpaRepository<Ban, Long> {
    boolean existsByMemberAndReleaseDateAfter(Member member, LocalDate localDate);

    Ban findByMember(Member member);
}
