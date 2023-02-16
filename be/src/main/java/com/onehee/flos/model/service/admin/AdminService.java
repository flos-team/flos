package com.onehee.flos.model.service.admin;

import org.springframework.stereotype.Service;

@Service
public interface AdminService {
    void deletePost(Long postId);
    void deleteComment(Long commentId);
    void deletePostByMember(Long memberId);
    void deleteCommentByMember(Long memberId);
}
