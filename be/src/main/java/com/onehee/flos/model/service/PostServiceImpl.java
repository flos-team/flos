package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.FileResponseDTO;
import com.onehee.flos.model.dto.response.PostRelationDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.*;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.*;
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
    private final PostTagRepository postTagRepository;
    private final TagRepository tagRepository;
    private final BookmarkRepository bookmarkRepository;

    @Override
    public List<PostResponseDTO> getPostListByWriter(Member writer, Member member) {
        return postRepository.findAllByWriterOrderByCreatedAtDesc(writer)
                .stream()
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e, member)))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponseDTO> getPostListByWeather(WeatherType weatherType, Member member) {
        return postRepository.findAllByWeatherOrderByCreatedAtDesc(weatherType)
                .stream()
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e, member)))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponseDTO> getLatestPostList(Member member) {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e, member)))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponseDTO> getBookmarkedListByMember(Member member) {
        return bookmarkRepository.findAllByMember(member)
                .stream()
                .map(e -> PostResponseDTO.toDto(e.getPost(), getPostRelation(e.getPost(), member)))
                .collect(Collectors.toList());
    }

    @Override
    public void createPost(PostCreateRequestDTO postCreateRequestDTO) throws BadRequestException, IOException {

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

        for (Tag e : postCreateRequestDTO.getTagList()) {
            postTagRepository.save(
                    PostTag.builder()
                            .post(tempPost)
                            .tag(tagRepository.save(e))
                            .build()
            );
        }
    }

    @Override
    public void modifyPost(PostModifyRequestDTO postModifyRequestDTO) throws BadRequestException, IOException {

        Post tempPost = postRepository.findById(postModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));

        postFileRepository.deleteAll(
            postFileRepository.findAllByPost(
                tempPost
            )
        );

        postTagRepository.deleteAll(
            postTagRepository.findAllByPost(
                tempPost
            )
        );

        for (MultipartFile e : postModifyRequestDTO.getAttachFiles()) {
            FileEntity tempFile = fileService.saveFile(e);
            postFileRepository.save(
                    PostFile.builder()
                            .post(tempPost)
                            .file(tempFile)
                            .build()
            );
        }

        for (Tag e : postModifyRequestDTO.getTagList()) {
            postTagRepository.save(
                    PostTag.builder()
                            .post(tempPost)
                            .tag(tagRepository.save(e))
                            .build()
            );
        }

    }

    @Override
    public void deletePost(Long id) throws BadRequestException {

        Post tempPost = postRepository.findById(id).orElseThrow(() -> new BadRequestException("이미 삭제된 게시글입니다."));

        postFileRepository.deleteAll(
            postFileRepository.findAllByPost(
                tempPost
            )
        );

        postTagRepository.deleteAll(
            postTagRepository.findAllByPost(
                tempPost
            )
        );

        bookmarkRepository.deleteAll(
            bookmarkRepository.findAllByPost(
                tempPost
            )
        );

        postRepository.delete(tempPost);
    }

    // 게시글 관계테이블 정보
    private PostRelationDTO getPostRelation(Post post, Member member) {
        return PostRelationDTO.builder()
                .tagList(getTagListByPost(post))
                .attachFiles(getFileListByPost(post))
                .isBookmarked(isBookmarked(post, member))
                .build();
    }

    // 게시글의 태그 리스트
    private List<Tag> getTagListByPost(Post post) {
        return postTagRepository.findAllByPost(post)
                .stream()
                .map(PostTag::getTag)
                .collect(Collectors.toList());
    }

    // 게시글의 파일 리스트
    private List<FileResponseDTO> getFileListByPost(Post post) {
        return postFileRepository.findAllByPost(post)
                .stream()
                .map(e -> FileResponseDTO.toDTO(e.getFile()))
                .collect(Collectors.toList());
    }

    // 게시글의 북마크 여부
    private Boolean isBookmarked(Post post, Member member) {
        return bookmarkRepository.findByPostAndMember(post, member) != null;
    }

    // 게시글의 팔로우 여부
    // 게시글의 댓글 수
    // 게시글의 댓글 리스트
}
