package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.WeatherResource;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface WeatherResourceRepository extends JpaRepository<WeatherResource, Long> {

    Optional<WeatherResource> findFirstByOwnerAndWeatherTypeIsAndFlowerIsNull(Member member, WeatherType weatherType);

    Long countLightByFlower(Flower flower);

    boolean existsByOwnerAndUsedAtAfter(Member member, LocalDateTime usedAt);

}
