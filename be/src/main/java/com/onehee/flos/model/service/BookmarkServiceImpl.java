package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.BookmarkRequestDTO;
import com.onehee.flos.model.entity.Bookmark;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.repository.BookmarkRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    @Override
    public void createBookmark(BookmarkRequestDTO bookmarkRequestDTO) throws BadRequestException {
        Post tempPost = bookmarkRequestDTO.getPost();
        Member tempMember = SecurityManager.getCurrentMember();
        if (bookmarkRepository.findByPostAndMember(tempPost, tempMember)!=null)
            throw new BadRequestException("이미 북마크한 게시글입니다.");
        bookmarkRepository.save(Bookmark.builder()
                        .post(tempPost)
                        .member(tempMember)
                        .build());
    }

    @Override
    public void deleteBookmark(BookmarkRequestDTO bookmarkRequestDTO) throws BadRequestException {
        Post tempPost = bookmarkRequestDTO.getPost();
        Member tempMember = SecurityManager.getCurrentMember();
        if (bookmarkRepository.findByPostAndMember(tempPost, tempMember)==null)
            throw new BadRequestException("북마크 하지 않은 게시글입니다.");
        bookmarkRepository.delete(Bookmark.builder()
                .post(tempPost)
                .member(tempMember)
                .build());
    }
}
