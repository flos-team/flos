package com.onehee.flos.model.service.admin;

import com.onehee.flos.model.repository.CommentRepository;
import com.onehee.flos.model.repository.MemberRepository;
import com.onehee.flos.model.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    @Override
    public void deletePost(Long postId) {
        if (postId != null)
            postRepository.findById(postId).ifPresent(postRepository::delete);
    }

    @Override
    public void deleteComment(Long commentId) {
        if (commentId != null)
            commentRepository.findById(commentId).ifPresent(commentRepository::delete);
    }

    @Override
    public void deletePostByMember(Long memberId) {
        if (memberId != null) {
            memberRepository.findById(memberId).ifPresent(postRepository::deletePostByMember);
        }
    }

    @Override
    public void deleteCommentByMember(Long memberId) {
        if (memberId != null) {
            memberRepository.findById(memberId).ifPresent(commentRepository::deleteCommentByMember);
        }
    }
}
