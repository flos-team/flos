package com.onehee.flos.model.repository;


import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByWeatherOrderByCreatedAtDesc(WeatherType weatherType);

    List<Post> findAllByOrderByCreatedAtDesc();

    List<Post> findAllByWriterOrderByCreatedAtDesc(Member writer);
}
