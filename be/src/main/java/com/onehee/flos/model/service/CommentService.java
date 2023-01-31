package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.CommentCreateRequestDTO;
import com.onehee.flos.model.dto.request.CommentModifyRequestDTO;
import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.entity.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {
    // 게시글의 댓글 리스트
    List<CommentResponseDTO> getCommentListByPost(Post post);
    // 댓글 등록
    void createComment(CommentCreateRequestDTO commentCreateRequestDTO) throws BadRequestException;
    // 댓글 수정
    void modifyComment(CommentModifyRequestDTO commentModifyRequestDTO) throws BadRequestException;
    // 댓글 삭제
    void deleteComment(Long id) throws BadRequestException;
    // 댓글 채택됨
    void approveComment();
    // 댓글 채택취소됨
    void cancelComment();
}
