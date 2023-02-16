package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.BookmarkRequestDTO;
import com.onehee.flos.model.dto.request.UnbookmarkRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface BookmarkService {

    // 북마크 정보 생성
    void createBookmark(Long postId) throws BadRequestException;
    // 북마크 정보 삭제
    void deleteBookmark(Long postId) throws BadRequestException;
}
