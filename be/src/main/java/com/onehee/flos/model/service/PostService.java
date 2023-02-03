package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.type.WeatherType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface PostService {

    // 게시글 날씨별 검색
    SliceResponseDTO getPostListByWeather(WeatherType weatherType, Pageable pageable);
    // 게시글 최신순 검색
    SliceResponseDTO getLatestPostList(Pageable pageable);

    // 게시글 사람별 검색
    SliceResponseDTO getPostListByWriter(Long id, Pageable pageable);

    // 북마크한 게시글 검색
    SliceResponseDTO getBookmarkedListByMember(Pageable pageable);
    // 게시글 인기(기여자생긴만큼)순 검색

    // 단일 게시글 정보 검색
    PostResponseDTO getPost(Long id) throws BadRequestException;

    // 게시글 등록
    void createPost(PostCreateRequestDTO postCreateRequestDTO) throws BadRequestException, IOException;

    // 게시글 수정
    void modifyPost(PostModifyRequestDTO postModifyRequestDTO) throws BadRequestException, IOException;

    // 게시글 삭제
    void deletePost(Long id) throws BadRequestException;

}
