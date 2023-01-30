package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public interface PostService {

    // 게시글 날씨별 검색
    List<PostResponseDTO> getPostListByWeather(WeatherType weatherType);
    // 게시글 최신순 검색
    List<PostResponseDTO> getLatestPostList();
    // 게시글 인기순 검색

    // 게시글 등록
    Long createPost(PostCreateRequestDTO postCreateRequestDTO);
    // 게시글 수정
    Long modifyPost(PostModifyRequestDTO postModifyRequestDTO);
    // 게시글 삭제
    Long deletePost(Long id);
}
