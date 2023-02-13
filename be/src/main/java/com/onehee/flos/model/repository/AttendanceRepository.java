package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Attendance;
import com.onehee.flos.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    Integer countByMemberAndLoginDateBetween(Member member, LocalDate start, LocalDate end);

    boolean existsByMemberAndLoginDate(Member member, LocalDate localDate);

}
