package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.CommentCreateRequestDTO;
import com.onehee.flos.model.dto.request.CommentModifyRequestDTO;
import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.entity.Comment;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.repository.CommentMemberRepository;
import com.onehee.flos.model.repository.CommentRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentMemberRepository commentMemberRepository;

    @Override
    public Slice<CommentResponseDTO> getCommentListByPost(Post post, Pageable pageable) {
        return commentRepository.findAllByPost(post, pageable)
                .map(CommentResponseDTO::toDto);
    }

    @Override
    public Slice<CommentResponseDTO> getCommentListByMember(Pageable pageable) {
        return commentRepository.findAllByWriter(SecurityManager.getCurrentMember(), pageable)
                .map(CommentResponseDTO::toDto);
    }

    @Override
    public void createComment(CommentCreateRequestDTO commentCreateRequestDTO) throws BadRequestException {

        commentRepository.save(commentCreateRequestDTO.toEntity());

    }

    @Override
    public void modifyComment(CommentModifyRequestDTO commentModifyRequestDTO) throws BadRequestException {
        Comment tempComment = commentRepository.findById(commentModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        commentRepository.save(commentModifyRequestDTO.toAccept(tempComment));
    }

    @Override
    public void deleteComment(Long id) throws BadRequestException {
        Comment tempComment = commentRepository.findById(id).orElseThrow(() -> new BadRequestException("존재하지 않는 댓글입니다."));
        commentMemberRepository.deleteAll(
                commentMemberRepository.findAllByComment(
                        tempComment
                )
        );
    }

    @Override
    public void approveComment(Long id) throws BadRequestException {

    }

    @Override
    public void cancelComment(Long id) throws BadRequestException {

    }
}
