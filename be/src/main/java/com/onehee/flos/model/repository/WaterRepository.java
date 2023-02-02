package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Water;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaterRepository extends JpaRepository<Water, Long> {

    List<Water> findAllByFlowerAndOwner(Flower flower, Member owner);

}
