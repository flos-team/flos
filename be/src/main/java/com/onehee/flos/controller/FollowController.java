package com.onehee.flos.controller;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.model.dto.FollowDTO;
import com.onehee.flos.model.dto.request.FollowRequestDTO;
import com.onehee.flos.model.dto.request.UnfollowRequestDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Tag(name = "팔로우API", description = "팔로우/팔로잉 처리를 담당합니다.")
@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @Tag(name = "팔로우API")
    @Operation(summary = "팔로워 리스트 가져오기 메서드", description = "대상의 팔로워 리스트를 가져옵니다.", responses = {
            @ApiResponse(responseCode = "200", description = "1명 이상의 팔로워를 반환합니다.", content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MemberResponseDTO.class)))}),
            @ApiResponse(responseCode = "204", description = "반활할 팔로워가 0명입니다. (대상의 팔로워가 없습니다.)"),
            @ApiResponse(responseCode = "400", description = "대상이 잘못되었습니다.")
    })
    @GetMapping( value = {"/follower", "/follower/{id}"})
    public ResponseEntity<?> getFollowerList(@PathVariable(name = "id", required = false) Long id, @RequestParam(name = "orderByName", defaultValue = "false") boolean orderByName,@AuthenticationPrincipal MemberDetails memberDetails) {
        id = Objects.requireNonNullElse(id, memberDetails.getMember().getId());
        FollowDTO followDTO = new FollowDTO(id, orderByName);
        List<MemberResponseDTO> body = followService.getFollowerList(followDTO);
        HttpStatus httpStatus = body.size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<MemberResponseDTO>>(body, httpStatus);
    }

    @Tag(name = "팔로우API")
    @Operation(summary = "팔로잉 리스트 가져오기 메서드", description = "대상의 팔로잉 리스트를 가져옵니다.", responses = {
            @ApiResponse(responseCode = "200", description = "1명 이상의 대상이 팔로우 하고 있는 회원을 반환합니다.", content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MemberResponseDTO.class)))}),
            @ApiResponse(responseCode = "204", description = "반활할 대상이 팔로우 하고 있는 회원이 0명입니다. (대상의 팔로잉 목록이 없습니다.)"),
            @ApiResponse(responseCode = "400", description = "대상이 잘못되었습니다.")
    })
    @GetMapping(value = {"/following", "/following/{id}"})
    public ResponseEntity<?> getFollowingList(@PathVariable(name = "id", required = false) Long id, @RequestParam(name = "orderByName", defaultValue = "false") boolean orderByName, @AuthenticationPrincipal MemberDetails memberDetails) {
        id = Objects.requireNonNullElse(id, memberDetails.getMember().getId());
        FollowDTO followDTO = new FollowDTO(id, orderByName);
        List<MemberResponseDTO> body = followService.getFollowingList(followDTO);
        HttpStatus httpStatus = body.size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<MemberResponseDTO>>(body, httpStatus);
    }

    @Tag(name = "팔로우API")
    @Operation(summary = "팔로우 메서드", description = "팔로우 요청을 처리합니다.", responses = {
            @ApiResponse(responseCode = "200", description = "팔로우 요청을 처리하고 요청주체의 팔로잉 목록을 반환합니다.", content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MemberResponseDTO.class)))}),
            @ApiResponse(responseCode = "400", description = "나 자신을 팔로우하거나, 이미 팔로우한 대상이거나, 없는 대상입니다.")
    })
    @PostMapping
    public ResponseEntity<?> follow(@RequestBody FollowRequestDTO followRequestDTO) {
        List<MemberResponseDTO> body = followService.follow(followRequestDTO);
        return new ResponseEntity<List<MemberResponseDTO>>(body, HttpStatus.OK);
    }

    @Tag(name = "팔로우API")
    @Operation(summary = "언팔로우 메서드", description = "언팔로우 요청을 처리합니다.", responses = {
            @ApiResponse(responseCode = "200", description = "언팔로우 요청을 처리하고 요청주체의 팔로잉 목록을 반환합니다.", content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MemberResponseDTO.class)))}),
            @ApiResponse(responseCode = "204", description = "언팔로우 요청을 처리했으나 반환할 남아있는 팔로잉한 대상이 없습니다.", content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MemberResponseDTO.class)))}),
            @ApiResponse(responseCode = "400", description = "나 자신을 언팔로우하거나, 팔로우한 대상이 아니거나, 없는 대상입니다.")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> unfollow(@PathVariable("id") Long id, @RequestParam(name = "orderByName", defaultValue = "false") boolean orderByName) {
        List<MemberResponseDTO> body = followService.unfollow(new UnfollowRequestDTO(id, orderByName));
        HttpStatus httpStatus = body.size() == 0 ? HttpStatus.NO_CONTENT : HttpStatus.OK;
        return new ResponseEntity<List<MemberResponseDTO>>(body, httpStatus);
    }
}
