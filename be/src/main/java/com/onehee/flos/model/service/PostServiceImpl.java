package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostDeleteRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;

    @Override
    public List<PostResponseDTO> getPostListByWeather(WeatherType weatherType) {
        return postRepository.findAllByWeatherOrderByRegDateDesc(weatherType)
                .stream()
                .map(e -> PostResponseDTO.toDto(e))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponseDTO> getLatestPostList() {
        return postRepository.findAllOrderByRegDateDesc()
                .stream()
                .map(e -> PostResponseDTO.toDto(e))
                .collect(Collectors.toList());
    }

    @Override
    public Long createPost(PostCreateRequestDTO postCreateRequestDTO) {
        return postRepository.save(postCreateRequestDTO.toEntity()).getId();
    }

    @Override
    public Long modifyPost(PostModifyRequestDTO postModifyRequestDTO) {
        if (postRepository.findById(postModifyRequestDTO.getId()) != null)
            return postRepository.save(postModifyRequestDTO.toEntity()).getId();
        return -1L;
    }

    @Override
    public Long deletePost(Long id) {
        if (postRepository.findById(id) != null)
            postRepository.delete(id);
        else
            return -1L;
        return id;
    }
}
