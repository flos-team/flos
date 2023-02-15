package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.PostRelationDTO;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.FileResponseDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.*;
import com.onehee.flos.model.entity.type.MessageType;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.*;
import com.onehee.flos.util.FilesHandler;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostFileRepository postFileRepository;
    private final FilesHandler filesHandler;
    private final PostTagRepository postTagRepository;
    private final TagRepository tagRepository;
    private final BookmarkRepository bookmarkRepository;
    private final CommentRepository commentRepository;
    private final FollowRepository followRepository;
    private final NotificationRepository notificationRepository;

    @Override
    @Transactional(readOnly = true)
    public SliceResponseDTO getPostListByWriter(String nickName, Pageable pageable) throws BadRequestException {
        if (Pattern.matches("^[a-zA-Z0-9]*$", nickName))
            nickName = nickName.toLowerCase();
        return SliceResponseDTO.toDto(postRepository.findSliceByNickname(nickName, pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e))));
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponseDTO getPostListByWeather(WeatherType weatherType, Pageable pageable) {
        return SliceResponseDTO.toDto(postRepository.findSliceByWeather(weatherType, pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e))));
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponseDTO getLatestPostList(Pageable pageable) {
        return SliceResponseDTO.toDto(postRepository.findSliceBy(pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e))));
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponseDTO getBookmarkedListByMember(Pageable pageable) {
        return SliceResponseDTO.toDto(postRepository.findSliceByBookmark(SecurityManager.getCurrentMember(), pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e))));
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponseDTO getPostListOrderByCountComment(Pageable pageable) {
        return SliceResponseDTO.toDto(postRepository.findSliceByCountComment(pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e))));
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponseDTO getPostListByTagName(String tagName, Pageable pageable) {
        return SliceResponseDTO.toDto(postRepository.findSliceByTagName(tagName, pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e))));
    }

    @Override
    @Transactional(readOnly = true)
    public SliceResponseDTO getPostListByFollow(Pageable pageable) {
        return SliceResponseDTO.toDto(postRepository.findSliceByFollow(SecurityManager.getCurrentMember(), pageable)
                .map(e -> PostResponseDTO.toDto(e, getPostRelation(e))));
    }

    @Override
    @Transactional(readOnly = true)
    public PostResponseDTO getPost(Long id) throws BadRequestException {
        Post post = postRepository.findById(id).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        return PostResponseDTO.toDto(post, getPostRelation(post));
    }

    @Override
    @Transactional
    public void createPost(PostCreateRequestDTO postCreateRequestDTO) throws BadRequestException, IOException {

        Member writer = SecurityManager.getCurrentMember();

        Post tempPost = postRepository.saveAndFlush(postCreateRequestDTO.toEntity(writer));

        if (postCreateRequestDTO.getAttachFiles() != null) {
            for (MultipartFile e : postCreateRequestDTO.getAttachFiles()) {
                FileEntity tempFile = filesHandler.saveFile(e);
                log.info("{}", tempFile);
                tempFile.setMember(writer);
                postFileRepository.saveAndFlush(
                        PostFile.builder()
                                .post(tempPost)
                                .file(tempFile)
                                .build()
                );
            }
        }
        if (postCreateRequestDTO.getTagList() != null) {
            for (String e : postCreateRequestDTO.getTagList()) {
                Tag tempTag = tagRepository.findByTagName(e).orElse(null);
                postTagRepository.saveAndFlush(
                        PostTag.builder()
                                .post(tempPost)
                                .tag(tempTag == null ? tagRepository.saveAndFlush(Tag.builder().tagName(e).build()) : tempTag)
                                .build()
                );
            }
        }
        followRepository.findAllByOwnerByNickname(writer)
                .forEach(follower ->
                        notificationRepository.save(
                                Notification.builder()
                                        .member(follower)
                                        .messageType(MessageType.NEWFEED)
                                        .message(String.format(MessageType.NEWFEED.getMessage(), writer.getNickname()))
                                        .referenceKey(tempPost.getId())
                                        .build()
                )
        );
    }

    @Override
    @Transactional // 사용되지 않습니다.
    public void modifyPost(PostModifyRequestDTO postModifyRequestDTO) throws BadRequestException, IOException {

//        Post tempPost = postRepository.findById(postModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
//
//        Member tempWriter = tempPost.getWriter();
//
//        if (!SecurityManager.getCurrentMember().getId().equals(tempWriter.getId()))
//            throw new BadRequestException("해당 요청을 처리할 권한이 없습니다.");
//
//        for (MultipartFile e : postModifyRequestDTO.getAttachFiles()) {
//            FileEntity tempFile = filesHandler.saveFile(e);
//            postFileRepository.save(
//                    PostFile.builder()
//                            .post(tempPost)
//                            .file(tempFile)
//                            .build()
//            );
//        }
//
//        for (String e : postModifyRequestDTO.getTagList()) {
//            Tag tempTag = tagRepository.findByTagName(e).orElse(null);
//            if (tempTag == null || !postTagRepository.existsByTagAndPost(tempTag, tempPost))
//                postTagRepository.saveAndFlush(
//                        PostTag.builder()
//                                .post(tempPost)
//                                .tag(tempTag == null ? tagRepository.saveAndFlush(Tag.builder().tagName(e).build()) : tempTag)
//                                .build()
//                );
//        }
//
//
//        postRepository.saveAndFlush(postModifyRequestDTO.toAccept(tempPost, tempWriter));

    }

    @Override
    @Transactional
    public void deletePost(Long id) throws BadRequestException {

        Post tempPost = postRepository.findById(id).orElseThrow(() -> new BadRequestException("이미 삭제된 게시글입니다."));

        Member tempWriter = tempPost.getWriter();

        if (!SecurityManager.getCurrentMember().getId().equals(tempWriter.getId()))
            throw new BadRequestException("해당 요청을 처리할 권한이 없습니다.");

        // M:N 관계테이블
        postRepository.deleteTagByPost(tempPost);
        postRepository.deleteFileByPost(tempPost);
        postRepository.deleteBookmarkByPost(tempPost);

        // 직접 연관 테이블 - 상위 댓글
        postRepository.deletePriCommentByPost(tempPost);
        // 직접 연관 테이블 - 하위 댓글
        postRepository.deleteCommentByPost(tempPost);

        postRepository.delete(tempPost);
    }

    // 게시글과 관계테이블로 연관된 모든 테이블 한번에 불러오기
    private PostRelationDTO getPostRelation(Post post) {
        return PostRelationDTO.builder()
                .tagList(getTagListByPost(post))
                .attachFiles(getFileListByPost(post))
                .isBookmarked(isBookmarked(post))
                .isFollowed(isFollowed(post))
                .countComment(countCommentByPost(post))
                .build();
    }
    // 게시글의 태그 리스트
    private List<String> getTagListByPost(Post post) {
        return postTagRepository.findAllByPost(post)
                .stream()
                .map(e -> e.getTag().getTagName())
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
    private boolean isBookmarked(Post post) {
        return bookmarkRepository.existsByPostAndMember(post, SecurityManager.getCurrentMember());
    }

    // 게시글의 팔로우 여부
    private boolean isFollowed(Post post) {
        Member owner = post.getWriter();
        Member follower = SecurityManager.getCurrentMember();
        return followRepository.existsByOwnerAndFollower(owner, follower);
    }

    // 게시글의 댓글 수
    private Long countCommentByPost(Post post) {
        return commentRepository.countByPost(post);
    }
}
