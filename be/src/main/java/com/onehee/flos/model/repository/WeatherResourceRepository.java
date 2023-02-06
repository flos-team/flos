package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.WeatherResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WeatherResourceRepository extends JpaRepository<WeatherResource, Long> {

//    Optional<WeatherResource> findFirstByOwnerAndAndFlowerIsNull(Member member);

    Long countLightByFlower(Flower flower);

}
