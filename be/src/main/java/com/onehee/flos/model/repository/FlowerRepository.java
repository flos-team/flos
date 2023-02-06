package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowerRepository extends JpaRepository<Flower, Long> {

    // 회원이 키우는 꽃
    Flower findByOwnerAndBlossomAtIsNull(Member owner);

    // 회원의 가든에 있는 꽃
    Slice<Flower> findSliceByOwnerAndBlossomAtIsNotNull(Member owner, Pageable pageable);

    @Query("SELECT wr.contributor FROM WeatherResource wr WHERE wr.flower = :flower")
    Slice<Member> findContributorByFlower(Flower flower, Pageable pageable);
}
