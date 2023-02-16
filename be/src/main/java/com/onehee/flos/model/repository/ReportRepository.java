package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findAllByTarget(Member target);

    List<Report> findAllByTargetAndConclusionIsNull(Member target);

    List<Report> findAllByReporter(Member reporter);

    List<Report> findAllByReporterAndTarget(Member reporter, Member target);
}
