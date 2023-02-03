package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.CommentCreateRequestDTO;
import com.onehee.flos.model.dto.request.CommentModifyRequestDTO;
import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.repository.CommentRepository;
import com.onehee.flos.model.repository.PostRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

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
    public void createComment(CommentCreateRequestDTO commentCreateRequestDTO) throws BadRequestException {

        Post tempPost = postRepository.findById(commentCreateRequestDTO.getPostId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        Member writer = SecurityManager.getCurrentMember();
        Comment tempParentComment = commentRepository.findById(commentCreateRequestDTO.getParentId()).orElse(null);
        Comment tempPrimitiveComment = commentRepository.findById(commentCreateRequestDTO.getParentId()).orElse(null);
        commentRepository.save(commentCreateRequestDTO.toEntity(writer, tempPost, tempParentComment, tempPrimitiveComment));

    }

    @Override
    public void modifyComment(CommentModifyRequestDTO commentModifyRequestDTO) throws BadRequestException {
        Comment tempComment = commentRepository.findById(commentModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        Post tempPost = postRepository.findById(commentModifyRequestDTO.getPostId()).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        commentRepository.save(commentModifyRequestDTO.toAccept(tempComment, tempPost));
    }

    @Override
    public void deleteComment(Long id) throws BadRequestException {
        Comment tempComment = commentRepository.findById(id).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        commentRepository.delete(tempComment);
    }

    @Override
    public void approveComment(Long id) throws BadRequestException {
        // 빛, 물 구현 완료 후 제작
    }

    @Override
    public void cancelComment(Long id) throws BadRequestException {
        // 빛, 물 구현 완료 후 제작
    }
}
