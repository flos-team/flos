package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.ProviderType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmailAndProviderType(String email, ProviderType providerType);

    boolean existsByNickname(String nickName);

    Optional<Member> findByEmailAndProviderType(String email, ProviderType providerType);

    @Query("SELECT wr.contributor FROM WeatherResource wr WHERE wr.flower = :flower")
    Slice<Member> findContributorByFlower(Flower flower, Pageable pageable);

}
