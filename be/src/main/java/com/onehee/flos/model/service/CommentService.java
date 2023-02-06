package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.CommentCreateRequestDTO;
import com.onehee.flos.model.dto.request.CommentModifyRequestDTO;
import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public interface CommentService {
    // 특정 댓글 정보
    CommentResponseDTO getCommentById(Long commentId) throws BadRequestException;
    // 게시글의 댓글 리스트
    SliceResponseDTO getCommentListByPost(Long postId, Pageable pageable) throws BadRequestException;

    // 회원의 댓글 리스트
    SliceResponseDTO getCommentListByMember(Pageable pageable);

    // 댓글 등록
    void createComment(CommentCreateRequestDTO commentCreateRequestDTO) throws BadRequestException;

    // 댓글 수정
    void modifyComment(CommentModifyRequestDTO commentModifyRequestDTO) throws BadRequestException;

    // 댓글 삭제
    void deleteComment(Long id) throws BadRequestException;

    // 댓글 채택됨
    void approveComment(Long id) throws BadRequestException, NoSuchAlgorithmException;

}
