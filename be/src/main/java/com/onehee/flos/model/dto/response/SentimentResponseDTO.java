package com.onehee.flos.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
public class SentimentResponseDTO {
    private Document document;
    private List<Sentence> sentences;


    // 전체 문장 관련 object
    @Data
    static class Document {

        // 전체 문장에 대한 감정
        String sentiment;

        // 전체 문장에 대한 감정 confidence
        Confidence confidence;

    }

    // 전체 문장에 대한 감정 confidence
    @Data
    static class Confidence {
        // 중립 Confidence (%)
        float neutral;

        // 긍정 confidence (%)
        float positive;

        // 부정 confidence (%)
        float negative;
    }

    // 분류 문장 관련 object
    @Data
    static class Sentence {
        // 분류 문장
        String content;

        // document.content 에서 문장 시작 위치
        int offset;

        // 분류 문장 글자 수
        int length;

        // 분류 문장 감정
        String sentiment;

        // 분류 문장에 대한 감정 confidence
        Confidence confidence;

        // sentences.content 에서 감정분석 구간
        List<Highlight> highlights;

        // 부정감정일 경우
        NegativeSentiment negativeSentiment;
    }

    // sentences.content 에서 감정분석 구간
    @Data
    static class Highlight {

        // 주요 감정 구간 시작 위치
        int offset;

        // 주요 감정 구간 글자 수
        int length;
    }

    @Data
    static class NegativeSentiment {

        // 부정 감정일 경우, 세부 감정
        String sentiment;

        // 부정 감정일 경우, 세부 감정에 대한 confidence
        float confidence;
    }


}
