package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.CommentCreateRequestDTO;
import com.onehee.flos.model.dto.request.CommentModifyRequestDTO;
import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.entity.*;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.CommentRepository;
import com.onehee.flos.model.repository.NotificationRepository;
import com.onehee.flos.model.repository.PostRepository;
import com.onehee.flos.model.repository.WeatherResourceRepository;
import com.onehee.flos.util.NotificationUtil;
import com.onehee.flos.util.RandomWeatherSelector;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final WeatherResourceRepository weatherResourceRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public CommentResponseDTO getCommentById(Long commentId) throws BadRequestException {
        Comment tempComment = commentRepository.findById(commentId).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        return CommentResponseDTO.toDto(tempComment);
    }

    @Override
    public SliceResponseDTO getCommentListByPost(Long postId, Pageable pageable) throws BadRequestException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        return SliceResponseDTO.toDto(commentRepository.findSliceByPost(post, pageable)
                .map(CommentResponseDTO::toDto));
    }

    @Override
    public SliceResponseDTO getCommentListByMember(Pageable pageable) {
        return SliceResponseDTO.toDto(commentRepository.findSliceByWriter(SecurityManager.getCurrentMember(), pageable)
                .map(CommentResponseDTO::toDto));
    }

    @Override
    @Transactional
    public void createComment(CommentCreateRequestDTO commentCreateRequestDTO) throws BadRequestException {

        Post tempPost = postRepository.findById(commentCreateRequestDTO.getPostId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        Member writer = SecurityManager.getCurrentMember();
        Comment tempParentComment = commentRepository.findById(commentCreateRequestDTO.getParentId()).orElse(null);
        Comment tempPrimitiveComment = commentRepository.findById(commentCreateRequestDTO.getParentId()).orElse(null);
        commentRepository.save(commentCreateRequestDTO.toEntity(writer, tempPost, tempParentComment, tempPrimitiveComment));

        // 알람 갈 사람
        Member receiver = tempParentComment == null ? tempPost.getWriter() : tempParentComment.getWriter();

        // 알람 보내기
        notificationRepository.save(
                Notification.builder()
                        .member(receiver)
                        .message(NotificationUtil.commentMessage(writer))
                        .build()
        );

    }

    @Override
    public void modifyComment(CommentModifyRequestDTO commentModifyRequestDTO) throws BadRequestException {
        Comment tempComment = commentRepository.findById(commentModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        if (tempComment.getWriter().getId() != SecurityManager.getCurrentMember().getId())
            throw new BadRequestException("해당 요청을 처리할 권한이 없습니다.");
        Post tempPost = postRepository.findById(commentModifyRequestDTO.getPostId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        commentRepository.save(commentModifyRequestDTO.toAccept(tempComment, tempPost));
    }

    @Override
    public void deleteComment(Long id) throws BadRequestException {
        Comment tempComment = commentRepository.findById(id).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        if (tempComment.getWriter().getId() != SecurityManager.getCurrentMember().getId())
            throw new BadRequestException("해당 요청을 처리할 권한이 없습니다.");
        commentRepository.delete(tempComment);
    }

    @Override
    @Transactional
    public void approveComment(Long id) throws BadRequestException {
        // 좋아요~
        Comment tempComment = commentRepository.findById(id).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        Post post = tempComment.getPost();
        if (commentRepository.existsByWriterAndPostAndIsApproveIs(tempComment.getWriter(), post, true)) {
            throw new BadRequestException("이미 채택된 댓글이 존재합니다.");
        }
        if (SecurityManager.getCurrentMember().getId() != post.getWriter().getId()) {
            throw new BadRequestException("해당 요청을 처리할 권한이 없습니다.");
        }

        WeatherType weatherType = post.getWeather().equals(WeatherType.CLOUDY) ? RandomWeatherSelector.getRandomWeather() : post.getWeather();

        WeatherResource weatherResource = WeatherResource.builder()
                .owner(tempComment.getWriter())
                .contributor(post.getWriter())
                .weatherType(weatherType)
                .build();

        // 자원저장
        weatherResourceRepository.save(weatherResource);

        // 댓글 선택됨
        tempComment.setIsApprove(true);

        // 선택된 사용자에게 알람 보내기
        notificationRepository.save(
                Notification.builder()
                        .member(tempComment.getWriter())
                        .message(NotificationUtil.commentChosen(post.getWriter()))
                        .build()
        );

    }
}
