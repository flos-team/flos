package com.onehee.flos.controller;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "북마크API", description = "게시글의 북마크를 활성/비활성화 합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @Tag(name = "북마크API")
    @Operation(summary = "게시글 북마크 활성", description = "게시글의 북마크를 활성화합니다")
    @PostMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "북마크 활성화 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 게사글에 대한 요청 혹은 이미 북마크된 게시글"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
            @ApiResponse(responseCode = "500", description = "게시글 id가 null")
    })
    public ResponseEntity<?> createBookmark(@PathVariable("id") Long postId) throws BadRequestException {
        bookmarkService.createBookmark(postId);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @Tag(name = "북마크API")
    @Operation(summary = "게시글 북마크 비활성", description = "게시글의 북마크를 비활성화합니다")
    @DeleteMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "북마크 비활성화 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 게사글에 대한 요청 혹은 북마크 되지 않은 게시글"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
            @ApiResponse(responseCode = "500", description = "게시글 id가 null")
    })
    public ResponseEntity<?> deleteBookmark(@PathVariable("id") Long postId) throws BadRequestException {
        bookmarkService.deleteBookmark(postId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
