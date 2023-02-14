package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.CommentCreateRequestDTO;
import com.onehee.flos.model.dto.request.CommentModifyRequestDTO;
import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.entity.*;
import com.onehee.flos.model.entity.type.MessageType;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.CommentRepository;
import com.onehee.flos.model.repository.NotificationRepository;
import com.onehee.flos.model.repository.PostRepository;
import com.onehee.flos.model.repository.WeatherResourceRepository;
import com.onehee.flos.util.RandomWeatherSelector;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<CommentResponseDTO> getCommentListByPost(Long postId) throws BadRequestException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        return commentRepository.findAllByPostAndPrimitiveIsNull(post)
                .stream()
                .map(CommentResponseDTO::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentResponseDTO> getCommentListByMember() {
        return commentRepository.findAllByWriterAndPrimitiveIsNull(SecurityManager.getCurrentMember())
                .stream()
                .map(CommentResponseDTO::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentResponseDTO> getCommentListByPrimitive(Long primitiveId) throws BadRequestException {
        return commentRepository.findAllByPrimitive(
                commentRepository.findById(primitiveId).orElseThrow(() -> new BadRequestException("해당 댓글이 존재하지 않습니다.")))
                .stream()
                .map(CommentResponseDTO::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void createComment(CommentCreateRequestDTO commentCreateRequestDTO) throws BadRequestException {

        Post tempPost = postRepository.findById(commentCreateRequestDTO.getPostId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        Member writer = SecurityManager.getCurrentMember();
        Comment tempParentComment = null;
        Comment tempPrimitiveComment = null;
        if (commentCreateRequestDTO.getParentId() != null)
            tempParentComment = commentRepository.findById(commentCreateRequestDTO.getParentId()).orElse(null);
        if (commentCreateRequestDTO.getPrimitiveId() != null)
            tempPrimitiveComment = commentRepository.findById(commentCreateRequestDTO.getPrimitiveId()).orElse(null);

        Comment thisComment = commentRepository.save(commentCreateRequestDTO.toEntity(writer, tempPost, tempParentComment, tempPrimitiveComment));

        // 알람 갈 사람
        Member receiver;
        MessageType messageType;

        if (tempParentComment == null) {
            receiver = tempPost.getWriter();
            messageType = MessageType.NEWCOMMENT;
        } else {
            receiver = tempParentComment.getWriter();
            messageType = MessageType.NEWREPLY;
        }

        if (receiver.getId() == writer.getId()) {
            return;
        }

        // 알람 보내기
        notificationRepository.save(
                Notification.builder()
                        .member(receiver)
                        .messageType(messageType)
                        .message(String.format(messageType.getMessage(), writer.getNickname()))
                        .referenceKey(thisComment.getId())
                        .build()
        );

    }

    @Override
    public void modifyComment(CommentModifyRequestDTO commentModifyRequestDTO) throws BadRequestException {
        Comment tempComment =  commentRepository.findById(commentModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        if (!SecurityManager.getCurrentMember().getId().equals(tempComment.getWriter().getId()))
            throw new BadRequestException("해당 요청을 처리할 권한이 없습니다.");
        Post tempPost = postRepository.findById(commentModifyRequestDTO.getPostId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        commentRepository.save(commentModifyRequestDTO.toAccept(tempComment, tempPost));
    }

    @Override
    @Transactional
    public void deleteComment(Long id) {
        Comment tempComment = commentRepository.findById(id).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        if (tempComment.getIsApprove())
            throw new BadRequestException("추천한 댓글은 삭제할 수 없습니다.");
        if (!SecurityManager.getCurrentMember().getId().equals(tempComment.getWriter().getId()))
            throw new BadRequestException("해당 요청을 처리할 권한이 없습니다.");
        tempComment.setContent(null);
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
        Member me = SecurityManager.getCurrentMember();
        if (!me.getId().equals(post.getWriter().getId())) {
            throw new BadRequestException("해당 요청을 처리할 권한이 없습니다.");
        }
        if (me.getId().equals(tempComment.getWriter().getId())) {
            throw new BadRequestException("게시글 주인이 본인의 댓글을 채택할 수 없습니다.");
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
                        .messageType(MessageType.COMMENTCHOSEN)
                        .message(String.format(MessageType.COMMENTCHOSEN.getMessage(), post.getWriter().getNickname(), weatherType.getName()))
                        .referenceKey(post.getId())
                        .build()
        );

    }
}
