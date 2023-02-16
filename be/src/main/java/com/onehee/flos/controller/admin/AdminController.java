package com.onehee.flos.controller.admin;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable("id") Long commentId) throws BadRequestException {
        adminService.deleteComment(commentId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long postId) throws BadRequestException {
        adminService.deletePost(postId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/post/{id}")
    public ResponseEntity<?> deletePostByMember(@PathVariable("id") Long memberId) throws BadRequestException {
        adminService.deletePostByMember(memberId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/comment/{id}")
    public ResponseEntity<?> deleteCommentByMember(@PathVariable("id") Long memberId) throws BadRequestException {
        adminService.deleteCommentByMember(memberId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
