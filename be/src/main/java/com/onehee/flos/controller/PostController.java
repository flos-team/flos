package com.onehee.flos.controller;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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
    public ResponseEntity<?> getList(@RequestParam(value="page", required = false) Integer page){
        PageRequest pageRequest = null;
        if (page==null)
            pageRequest = PageRequest.of(0, size, Sort.by("createdAt").descending());
        else
            pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getLatestPostList(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "날씨별 게시글 리스트", description = "날씨에 해당하는 게시글 리스트를 반환합니다.")
    @GetMapping("/list/weather")
    public ResponseEntity<?> getListByWeather(@RequestParam(value="page", required = false) Integer page, @RequestParam(value="weather") WeatherType weather){
        PageRequest pageRequest = null;
        if (page==null)
            pageRequest = PageRequest.of(0, size, Sort.by("createdAt").descending());
        else
            pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getPostListByWeather(weather, pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "사람별 게시글 리스트", description = "특정 회원의 게시글 리스트를 반환합니다.")
    @GetMapping("/list/member/{nickName}")
    public ResponseEntity<?> getListByWriter(@RequestParam(value = "page", required = false) Integer page, @PathVariable String nickName) throws BadRequestException{
        PageRequest pageRequest = null;
        if (page==null)
            pageRequest = PageRequest.of(0, size, Sort.by("createdAt").descending());
        else
            pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return new ResponseEntity<Slice<PostResponseDTO>>(postService.getPostListByWriter(nickName, pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "회원별 북마크한 게시글 리스트", description = "회원이 북마크한 게시글 리스트를 반환합니다.")
    @GetMapping("/list/bookmark")
    public ResponseEntity<?> getListByBookmark(@RequestParam(value="page", required = false) Integer page){
        PageRequest pageRequest = null;
        if (page==null)
            pageRequest = PageRequest.of(0, size, Sort.by("createdAt").descending());
        else
            pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getBookmarkedListByMember(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "댓글수 정렬 게시글 리스트", description = "댓글이 많은 순으로 게시글 리스트를 반환합니다.")
    @GetMapping("/list/descnt")
    public ResponseEntity<?> getListOrderByCountComment(@RequestParam(value="page", required = false) Integer page){
        PageRequest pageRequest = null;
        if (page==null)
            pageRequest = PageRequest.of(0, size);
        else
            pageRequest = PageRequest.of(page, size);
        return new ResponseEntity<SliceResponseDTO>(postService.getPostListOrderByCountComment(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "태그별 게시글 리스트", description = "태그에 따라 게시글 리스트를 반환합니다.")
    @GetMapping("/list/tag/{tagName}")
    public ResponseEntity<?> getListByTagName(@RequestParam(value = "page", required = false) Integer page, @PathVariable String tagName){
        PageRequest pageRequest = null;
        if (page==null)
            pageRequest = PageRequest.of(0, size, Sort.by("created_at").descending());
        else
            pageRequest = PageRequest.of(page, size, Sort.by("created_at").descending());
        return new ResponseEntity<SliceResponseDTO>(postService.getPostListByTagName(tagName, pageRequest), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "특정 게시글 정보", description = "특정 게시글 정보를 반환합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable("id") Long postId) throws BadRequestException {
        return new ResponseEntity<PostResponseDTO>(postService.getPost(postId), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 생성", description = "게시글을 생성합니다.")
    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody PostCreateRequestDTO postCreateRequestDTO) throws BadRequestException, IOException {
        postService.createPost(postCreateRequestDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 수정", description = "게시글 내용을 수정합니다.")
    @PutMapping("/modify")
    public ResponseEntity<?> modifyPost(@RequestBody PostModifyRequestDTO postModifyRequestDTO) throws BadRequestException, IOException {
        postService.modifyPost(postModifyRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 삭제", description = "게시글을 삭제합니다.")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id) throws BadRequestException {
        postService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //
    //
    //

}
