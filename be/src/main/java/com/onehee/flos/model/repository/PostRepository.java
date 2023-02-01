package com.onehee.flos.model.repository;


import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 날씨에 해당하는 포스트(자동 최신순)
    List<Post> findAllByWeatherOrderByCreatedAtDesc(WeatherType weatherType);

    // 포스트 리스트(최신순)
    List<Post> findAllByOrderByCreatedAtDesc();

    // 작성자에 해당하는 포스트(자동 최신순)
    List<Post> findAllByWriterOrderByCreatedAtDesc(Member writer);
}
