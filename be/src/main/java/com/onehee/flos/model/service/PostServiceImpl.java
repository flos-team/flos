package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.PostFile;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.FileRepository;
import com.onehee.flos.model.repository.PostFileRepository;
import com.onehee.flos.model.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final PostFileRepository postFileRepository;
    private final FileService fileService;

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
    public void createPost(PostCreateRequestDTO postCreateRequestDTO) throws IOException {
        Post tempPost = postRepository.save(postCreateRequestDTO.toEntity());
        for (MultipartFile e : postCreateRequestDTO.getAttachFiles()) {
            FileEntity tempFile = fileService.saveFile(e);
            postFileRepository.save(
                    PostFile.builder()
                            .post(tempPost)
                            .file(tempFile)
                            .build()
            );
        }
    }

    @Override
    public void modifyPost(PostModifyRequestDTO postModifyRequestDTO) throws BadRequestException, IOException {
        postFileRepository.deleteAll(
            postFileRepository.findAllByPost(
                postRepository.findById(postModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."))
            )
        );
        Post tempPost = postRepository.save(postModifyRequestDTO.toEntity());
        for (MultipartFile e : postModifyRequestDTO.getAttachFiles()) {
            FileEntity tempFile = fileService.saveFile(e);
            postFileRepository.save(
                    PostFile.builder()
                            .post(tempPost)
                            .file(tempFile)
                            .build()
            );
        }

    }

    @Override
    public void deletePost(Long id) throws BadRequestException {
        postFileRepository.deleteAll(
            postFileRepository.findAllByPost(
                    postRepository.findById(id).orElseThrow(() -> new BadRequestException("이미 삭제된 게시글입니다."))
            )
        );

    }
}
