package com.onehee.flos.model.service.admin;

import org.springframework.stereotype.Service;

@Service
public interface AdminPostService {
    void deletePost(Long postId);
}
