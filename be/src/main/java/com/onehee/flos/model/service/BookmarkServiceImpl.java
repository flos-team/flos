package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.entity.Bookmark;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.repository.BookmarkRepository;
import com.onehee.flos.model.repository.PostRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final PostRepository postRepository;

    @Override
    @Transactional
    public void createBookmark(Long postId) throws BadRequestException {
        Post tempPost = postRepository.findById(postId).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        Member tempMember = SecurityManager.getCurrentMember();
        if (bookmarkRepository.existsByPostAndMember(tempPost, tempMember))
            throw new BadRequestException("이미 북마크한 게시글입니다.");
        bookmarkRepository.save(Bookmark.builder()
                .post(tempPost)
                .member(tempMember)
                .build());
    }

    @Override
    @Transactional
    public void deleteBookmark(Long postId) throws BadRequestException {
        Post tempPost = postRepository.findById(postId).orElseThrow(() -> new BadRequestException("존재하지 않는 게시글입니다."));
        Member tempMember = SecurityManager.getCurrentMember();
        bookmarkRepository.delete(
                bookmarkRepository.findByPostAndMember(tempPost, tempMember)
                        .orElseThrow(() -> new BadRequestException("북마크 하지 않은 게시글입니다."))
        );
        bookmarkRepository.flush();
    }
}
