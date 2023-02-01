package com.onehee.flos.controller;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.BookmarkRequestDTO;
import com.onehee.flos.model.service.BookmarkService;
import com.onehee.flos.model.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "북마크API", description = "게시글의 북마크를 활성/비활성화 합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @Tag(name = "북마크API")
    @Operation(summary = "게시글 북마크 활성", description = "게시글의 북마크를 활성화합니다")
    @PostMapping("/{id}/bookmark")
    public ResponseEntity<?> createBookmark(@PathVariable("id") BookmarkRequestDTO bookmarkRequestDTO) throws BadRequestException {
        bookmarkService.createBookmark(bookmarkRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @Tag(name = "북마크API")
    @Operation(summary = "게시글 북마크 비활성", description = "게시글의 북마크를 비활성화합니다")
    @PostMapping("/{id}/bookunmark")
    public ResponseEntity<?> deleteBookmark(@PathVariable("id") BookmarkRequestDTO bookmarkRequestDTO) throws BadRequestException {
        bookmarkService.deleteBookmark(bookmarkRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}