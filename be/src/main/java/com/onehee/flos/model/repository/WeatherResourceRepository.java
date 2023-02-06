package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.WeatherResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherResourceRepository extends JpaRepository<WeatherResource, Long> {

    WeatherResource findByOwnerAndFlower(Member member, Flower flower);

    Long countLightByFlower(Flower flower);

}
