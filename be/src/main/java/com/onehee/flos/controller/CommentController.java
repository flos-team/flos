package com.onehee.flos.controller;

import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.CommentApproveRequestDTO;
import com.onehee.flos.model.dto.request.CommentCreateRequestDTO;
import com.onehee.flos.model.dto.request.CommentModifyRequestDTO;
import com.onehee.flos.model.dto.response.CommentResponseDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "댓글API", description = "댓글 기능을 담당합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    @Value("${spring.paging.size}")
    private Integer size;

    @Tag(name = "댓글API")
    @Operation(summary = "게시글의 댓글 리스트", description = "게시글의 댓글 리스트를 반환합니다.")
    @GetMapping("/list/post/{id}")
    public ResponseEntity<?> getListByPost(@PathVariable("id") Long postId) throws BadRequestException {
        return new ResponseEntity<List<CommentResponseDTO>>(commentService.getCommentListByPost(postId), HttpStatus.OK);
    }

    @Tag(name = "댓글API")
    @Operation(summary = "회원의 댓글 리스트", description = "게시글의 댓글 리스트를 반환합니다.")
    @GetMapping("/list/member")
    public ResponseEntity<?> getListByMember(){
        return new ResponseEntity<List<CommentResponseDTO>>(commentService.getCommentListByMember(), HttpStatus.OK);
    }

    @Tag(name = "댓글API")
    @Operation(summary = "하위 댓글 리스트", description = "특정 댓글의 하위 댓글 리스트를 반환합니다.")
    @GetMapping("/list/pri/{id}")
    public ResponseEntity<?> getListByPrimitive(@PathVariable("id") Long primitiveId){
        return new ResponseEntity<List<CommentResponseDTO>>(commentService.getCommentListByPrimitive(primitiveId), HttpStatus.OK);
    }

    @Tag(name = "댓글API")
    @Operation(summary = "댓글 정보", description = "특정 댓글 정보를 반환합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentInfo(@PathVariable("id") Long commentId) throws BadRequestException {
        return new ResponseEntity<CommentResponseDTO>(commentService.getCommentById(commentId), HttpStatus.OK);
    }

    @Tag(name = "댓글API")
    @Operation(summary = "댓글 생성", description = "댓글을 생성합니다.")
    @PostMapping("")
    public ResponseEntity<?> createComment(@RequestBody CommentCreateRequestDTO commentCreateRequestDTO) throws BadRequestException {
        commentService.createComment(commentCreateRequestDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Tag(name = "댓글API")
    @Operation(summary = "댓글 수정", description = "댓글을 수정합니다.")
    @PutMapping("")
    public ResponseEntity<?> modifyComment(@RequestBody CommentModifyRequestDTO commentModifyRequestDTO) throws BadRequestException {
        commentService.modifyComment(commentModifyRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Tag(name = "댓글API")
    @Operation(summary = "댓글 삭제", description = "댓글을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable("id") Long commentId) throws BadRequestException {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Tag(name = "댓글API")
    @Operation(summary = "댓글 채택", description = "댓글을 채택합니다.(좋아요)")
    @PostMapping("/approve")
    public ResponseEntity<?> approveComment(@RequestBody CommentApproveRequestDTO commentApproveRequestDTO) {
        commentService.approveComment(commentApproveRequestDTO.getId());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
