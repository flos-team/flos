package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Attendance;
import com.onehee.flos.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findAllByMember(Member member);

}
