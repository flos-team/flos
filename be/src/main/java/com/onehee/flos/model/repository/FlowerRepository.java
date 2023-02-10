package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlowerRepository extends JpaRepository<Flower, Long> {

    // 회원이 키우는 꽃
    Optional<Flower> findByOwnerAndBlossomAtIsNullOrGardeningIsFalse(Member owner);

    // 회원의 가든에 있는 꽃
    Slice<Flower> findSliceByOwnerAndBlossomAtIsNotNullAndGardeningIsTrueOrderByBlossomAtDesc(Member owner, Pageable pageable);

    @Query("SELECT wr.contributor FROM WeatherResource wr WHERE wr.flower = :flower")
    Slice<Member> findContributorByFlower(Flower flower, Pageable pageable);

    @Query(value = "select contributor_id from weather_resource where flower_id = ?1.flower_id order by count(*) limit 1;", nativeQuery = true)
    Optional<Member> findContributorByFlowerOrderByCount(Flower flower);

    @Query(value = "select count(*) from weather_resource where flower_id = ?1.flower_id and contributor_id = ?2 ;", nativeQuery = true)
    Long countByFlowerAndContributor(Flower flower, Member contributor);

    @Query(value = "select count(case when p.weather=\"CLOUDY\" then 1 end) from (select p.weather from post p where p.members_id = ?1 order by p.created_at desc limit 10) as p", nativeQuery = true)
    Long countCloudyByRecent10Post(Member member);

    @Query(value = "select count(case when p.weather=\"RAINY\" then 1 end) from (select p.weather from post p where p.members_id = ?1 order by p.created_at desc limit 10) as p", nativeQuery = true)
    Long countRainyByRecent10Post(Member member);

    @Query(value = "select count(case when p.weather=\"SUNNY\" then 1 end) from (select p.weather from post p where p.members_id = ?1 order by p.created_at desc limit 10) as p", nativeQuery = true)
    Long countSunnyByRecent10Post(Member member);

    // 회원의 모든 개화한꽃 인데 최근순으로 정렬한
    List<Flower> findAllByOwnerAndBlossomAtIsNotNullOrderByBlossomAtDesc(Member owner);
}
