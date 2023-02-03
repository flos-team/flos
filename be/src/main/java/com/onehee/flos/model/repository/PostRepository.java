package com.onehee.flos.model.repository;


import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 날씨에 해당하는 포스트
    Slice<Post> findSliceByWeather(WeatherType weatherType, Pageable pageable);

    // 포스트 리스트
    Slice<Post> findSliceBy(Pageable pageable);

    // 작성자에 해당하는 포스트
    Slice<Post> findSliceByWriter(Member writer, Pageable pageable);
}
