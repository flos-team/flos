package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.Member;
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
    public List<PostResponseDTO> getPostListByWriter(Member writer) {
        return postRepository.findAllByWriterOrderByCreatedAtDesc(writer)
                .stream()
                .map(e -> PostResponseDTO.toDto(e))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponseDTO> getPostListByWeather(WeatherType weatherType) {
        return postRepository.findAllByWeatherOrderByCreatedAtDesc(weatherType)
                .stream()
                .map(e -> PostResponseDTO.toDto(e))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponseDTO> getLatestPostList() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(e -> PostResponseDTO.toDto(e))
                .collect(Collectors.toList());
    }

    @Override
    public void createPost(PostCreateRequestDTO postCreateRequestDTO){
        postRepository.save(postCreateRequestDTO.toEntity()).getId();
    }

    @Override
    public void modifyPost(PostModifyRequestDTO postModifyRequestDTO) throws BadRequestException {
        if (postRepository.findById(postModifyRequestDTO.getId()) == null)
            throw new BadRequestException("존재하지 않는 게시글입니다.");
        postRepository.save(postModifyRequestDTO.toEntity()).getId();
    }

    @Override
    public void deletePost(Long id) throws BadRequestException {
        if (postRepository.findById(id) == null)
            throw new BadRequestException("이미 삭제된 게시글입니다.");
        postRepository.deleteById(id);
    }
}
