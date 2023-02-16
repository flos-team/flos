package com.onehee.flos.controller;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Objects;

@Tag(name = "게시글API", description = "게시글 기능을 담당합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    @Value("${spring.paging.size}")
    private Integer size;

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 리스트", description = "게시글 리스트를 반환합니다.")
    @GetMapping("/list")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
    })
    public ResponseEntity<?> getList(@RequestParam(value="page", required = false) Integer page){
        PageRequest pageRequest = PageRequest.of(Objects.requireNonNullElse(page, 0), size, Sort.by("createdAt").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getLatestPostList(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "날씨별 게시글 리스트", description = "날씨에 해당하는 게시글 리스트를 반환합니다.")
    @GetMapping("/list/weather")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
            @ApiResponse(responseCode = "500", description = "weather이 null")
    })
    public ResponseEntity<?> getListByWeather(@RequestParam(value="page", required = false) Integer page, @RequestParam(value="weather") WeatherType weather){
        PageRequest pageRequest = PageRequest.of(Objects.requireNonNullElse(page, 0), size, Sort.by("createdAt").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getPostListByWeather(weather, pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "사람별 게시글 리스트", description = "특정 회원의 게시글 리스트를 반환합니다.")
    @GetMapping("/list/member/{nickName}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
            @ApiResponse(responseCode = "500", description = "nuckname이 null")
    })
    public ResponseEntity<?> getListByWriter(@RequestParam(value = "page", required = false) Integer page, @PathVariable String nickName) throws BadRequestException{
        PageRequest pageRequest = PageRequest.of(Objects.requireNonNullElse(page, 0), size, Sort.by("created_at").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getPostListByWriter(nickName, pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "회원별 북마크한 게시글 리스트", description = "회원이 북마크한 게시글 리스트를 반환합니다.")
    @GetMapping("/list/bookmark")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보")
    })
    public ResponseEntity<?> getListByBookmark(@RequestParam(value="page", required = false) Integer page){
        PageRequest pageRequest = PageRequest.of(Objects.requireNonNullElse(page, 0), size, Sort.by("created_at").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getBookmarkedListByMember(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "댓글수 정렬 게시글 리스트", description = "댓글이 많은 순으로 게시글 리스트를 반환합니다.")
    @GetMapping("/list/descnt")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
    })
    public ResponseEntity<?> getListOrderByCountComment(@RequestParam(value="page", required = false) Integer page){
        PageRequest pageRequest = PageRequest.of(Objects.requireNonNullElse(page, 0), size);
        return new ResponseEntity<SliceResponseDTO>(postService.getPostListOrderByCountComment(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "태그별 게시글 리스트", description = "태그에 따라 게시글 리스트를 반환합니다.")
    @GetMapping("/list/tag/{tagName}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
            @ApiResponse(responseCode = "500", description = "tagname이 null")
    })
    public ResponseEntity<?> getListByTagName(@RequestParam(value = "page", required = false) Integer page, @PathVariable String tagName){
        PageRequest pageRequest = PageRequest.of(Objects.requireNonNullElse(page, 0), size, Sort.by("created_at").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getPostListByTagName(tagName, pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "팔로잉 게시글 리스트", description = "회원이 팔로우한 대상의 게시글 리스트를 반환합니다.")
    @GetMapping("/list/follow")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
    })
    public ResponseEntity<?> getListByFollow(@RequestParam(value = "page", required = false) Integer page){
        PageRequest pageRequest = PageRequest.of(Objects.requireNonNullElse(page, 0), size, Sort.by("created_at").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getPostListByFollow(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "특정 게시글 정보", description = "특정 게시글 정보를 반환합니다.")
    @GetMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 게시글"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
            @ApiResponse(responseCode = "500", description = "게시글 id가 null")
    })
    public ResponseEntity<?> getPostById(@PathVariable("id") Long postId) throws BadRequestException {
        return new ResponseEntity<PostResponseDTO>(postService.getPost(postId), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 생성", description = "게시글을 생성합니다.")
    @PostMapping(value = "")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보")
    })
    public ResponseEntity<?> createPost(PostCreateRequestDTO postCreateRequestDTO) throws BadRequestException, IOException {
        postService.createPost(postCreateRequestDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

//    FLOS 서비스 특성상 폐기의 필요성
//    @Tag(name = "게시글API")
//    @Operation(summary = "게시글 수정", description = "게시글 내용을 수정합니다.")
//    @PutMapping("/modify")
//    public ResponseEntity<?> modifyPost(@RequestBody PostModifyRequestDTO postModifyRequestDTO) throws BadRequestException, IOException {
//        postService.modifyPost(postModifyRequestDTO);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 삭제", description = "게시글을 삭제합니다.")
    @DeleteMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "리스트 반환 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 게시글 / 자기 게시글이 아님"),
            @ApiResponse(responseCode = "401", description = "유효하지 않는 사용자 정보"),
            @ApiResponse(responseCode = "500", description = "게시글 id가 null")
    })
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id) throws BadRequestException {
        postService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
