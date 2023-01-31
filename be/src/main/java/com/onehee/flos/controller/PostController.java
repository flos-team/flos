package com.onehee.flos.controller;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.request.PostCreateRequestDTO;
import com.onehee.flos.model.dto.request.PostModifyRequestDTO;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Tag(name = "게시글API", description = "게시글 CRUD를 담당합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    @GetMapping("/list/test")
    public ResponseEntity<?> getTest() {
        return new ResponseEntity<String>("hello", HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "날씨별 게시글 리스트", description = "날씨에 해당하는 게시글을 시간순으로 나타냅니다.")
    @GetMapping("/list/weather")
    public ResponseEntity<?> getListByWeather(@RequestBody WeatherType weather, @AuthenticationPrincipal MemberDetails memberDetails){
        Member member = memberDetails.getMember();
        return new ResponseEntity<List<PostResponseDTO>>(postService.getPostListByWeather(weather, member), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "최신순 게시글 리스트", description = "게시글을 시간순으로 나타냅니다.")
    @GetMapping("/list")
    public ResponseEntity<?> getList(@AuthenticationPrincipal MemberDetails memberDetails){
        Member member = memberDetails.getMember();
        return new ResponseEntity<List<PostResponseDTO>>(postService.getLatestPostList(member), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "사람별 게시글 리스트", description = "특정 회원의 게시글 리스트를 나타냅니다.")
    @GetMapping("/list/writer")
    public ResponseEntity<?> getListByWriter(@RequestBody Member writer, @AuthenticationPrincipal MemberDetails memberDetails){
        Member member = memberDetails.getMember();
        return new ResponseEntity<List<PostResponseDTO>>(postService.getPostListByWriter(writer, member), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "사람별 게시글 리스트", description = "특정 회원의 게시글 리스트를 나타냅니다.")
    @GetMapping("/list/bookmark")
    public ResponseEntity<?> getListByBookmark(@AuthenticationPrincipal MemberDetails memberDetails){
        Member member = memberDetails.getMember();
        return new ResponseEntity<List<PostResponseDTO>>(postService.getBookmarkedListByMember(member), HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 생성", description = "게시글을 생성합니다.")
    @PostMapping("/list/create")
    public ResponseEntity<?> createPost(@RequestBody PostCreateRequestDTO postCreateRequestDTO) throws BadRequestException, IOException {
        postService.createPost(postCreateRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 수정", description = "게시글 내용을 수정합니다.")
    @PostMapping("/list/modify")
    public ResponseEntity<?> modifyPost(@RequestBody PostModifyRequestDTO postModifyRequestDTO) throws BadRequestException, IOException {
        postService.modifyPost(postModifyRequestDTO);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Tag(name = "게시글API")
    @Operation(summary = "게시글 삭제", description = "게시글을 삭제합니다.")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id) throws BadRequestException {
        postService.deletePost(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    //
    //
    //

}
