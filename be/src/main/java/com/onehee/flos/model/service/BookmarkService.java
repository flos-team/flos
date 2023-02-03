package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.BookmarkRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface BookmarkService {

    void createBookmark(BookmarkRequestDTO bookmarkRequestDTO) throws BadRequestException;

    void deleteBookmark(BookmarkRequestDTO bookmarkRequestDTO) throws BadRequestException;
}
