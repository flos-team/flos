package com.onehee.flos.model.repository;


import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findAllByWeatherOrderByRegDateDesc(WeatherType weatherType);

    Optional<Post> findAllOrderByRegDateDesc();

    void delete(Long Id);
}
