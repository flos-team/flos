package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.BookmarkRequestDTO;
import com.onehee.flos.model.dto.request.UnbookmarkRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface BookmarkService {

    void createBookmark(Long postId) throws BadRequestException;

    void deleteBookmark(Long postId) throws BadRequestException;
}
