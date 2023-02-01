package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.FileResponseDTO;
import com.onehee.flos.model.dto.PostRelationDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.*;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.*;
import com.onehee.flos.util.FilesHandler;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostFileRepository postFileRepository;
    private final FilesHandler filesHandler;
    private final PostTagRepository postTagRepository;
    private final TagRepository tagRepository;
    private final BookmarkRepository bookmarkRepository;

    @Override
    public Slice<PostResponseDTO> getPostListByWriter(Member writer, Pageable pageable) {
        return postRepository.findSliceByWriter(writer, pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e)));
    }

    @Override
    public Slice<PostResponseDTO> getPostListByWeather(WeatherType weatherType, Pageable pageable) {
        return postRepository.findSliceByWeather(weatherType, pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e)));
    }

    @Override
    public Slice<PostResponseDTO> getLatestPostList(Pageable pageable) {
        return postRepository.findSliceBy(pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e)));
    }

    @Override
    public Slice<PostResponseDTO> getBookmarkedListByMember(Pageable pageable) {
        return bookmarkRepository.findSliceAllByMember(SecurityManager.getCurrentMember(), pageable)
                .map(e -> PostResponseDTO.toDto(e.getPost(), getPostRelation(e.getPost())));
    }

    @Override
    public PostResponseDTO getPost(Long id) throws BadRequestException {
        Post post = postRepository.findById(id).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        return PostResponseDTO.toDto(post, getPostRelation(post));
    }

    @Override
    @Transactional
    public void createPost(PostCreateRequestDTO postCreateRequestDTO) throws BadRequestException, IOException {

        Post tempPost = postRepository.save(postCreateRequestDTO.toEntity());

        for (MultipartFile e : postCreateRequestDTO.getAttachFiles()) {
            FileEntity tempFile = filesHandler.saveFile(e);
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
                            .tag(tagRepository.saveAndFlush(e))
                            .build()
            );
        }
    }

    @Override
    @Transactional
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
            FileEntity tempFile = filesHandler.saveFile(e);
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
                            .tag(tagRepository.saveAndFlush(e))
                            .build()
            );
        }

        postRepository.save(postModifyRequestDTO.toAccept(tempPost));

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
    private PostRelationDTO getPostRelation(Post post) {
        return PostRelationDTO.builder()
                .tagList(getTagListByPost(post))
                .attachFiles(getFileListByPost(post))
                .isBookmarked(isBookmarked(post))
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
    private Boolean isBookmarked(Post post) {
        return bookmarkRepository.findByPostAndMember(post, SecurityManager.getCurrentMember()) != null;
    }

    // 게시글의 팔로우 여부
    // 게시글의 댓글 수
    // 게시글의 댓글 리스트
}
