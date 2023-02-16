package com.onehee.flos.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onehee.flos.model.dto.request.SentimentRequestDTO;
import com.onehee.flos.model.dto.response.SentimentResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Tag(name = "감정분석 API", description = "감정분석 기능을 제공하는 API")
@RestController
@RequestMapping("/sentiment")
@RequiredArgsConstructor
@Log4j2
public class SentimentController {

    @Value("${sentiment.url}")
    private String url;

    @Value("${sentiment.client-id}")
    private String clientId;

    @Value("${sentiment.client-secret}")
    private String clientSecret;

    private final ObjectMapper objectMapper;


    @Tag(name = "감정분석 API")
    @Operation(summary = "감정분석 메서드", description = "게시글의 본문으로 추정한 감정추정치를 반환합니다.", responses = {
            @ApiResponse(responseCode = "200", description = "반환 성공", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SentimentResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 본문"),
            @ApiResponse(responseCode = "401", description = "로그인 필요"),
            @ApiResponse(responseCode = "500", description = "네이버 API 상태 문제")
    })
    @PostMapping
    public ResponseEntity<?> getEmotionalData(@RequestBody SentimentRequestDTO sentimentRequestDTO) throws JsonProcessingException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-NCP-APIGW-API-KEY-ID", clientId);
        headers.add("X-NCP-APIGW-API-KEY", clientSecret);
        headers.add("Content-Type", "application/json;charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(sentimentRequestDTO), headers);

        RestTemplate rt = new RestTemplate();

        ResponseEntity<SentimentResponseDTO> response = rt.exchange(
                url,
                HttpMethod.POST,
                entity,
                SentimentResponseDTO.class
        );

        return new ResponseEntity<SentimentResponseDTO>(response.getBody(), HttpStatus.OK);
    }
}
