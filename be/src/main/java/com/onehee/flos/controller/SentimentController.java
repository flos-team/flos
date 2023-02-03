package com.onehee.flos.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onehee.flos.model.dto.request.SentimentRequestDTO;
import com.onehee.flos.model.dto.response.SentimentResponseDTO;
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
