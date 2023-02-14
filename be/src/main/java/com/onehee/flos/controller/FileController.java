package com.onehee.flos.controller;

import com.onehee.flos.exception.BadRequestException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

@Tag(name = "파일 컨트롤러", description = "URI에 매칭되는 파일을 반환합니다.")
@RestController
@RequestMapping("/file")
@Log4j2
public class FileController {

    @Value("${file.dir}")
    private String fileDir;

    @Tag(name = "파일 컨트롤러")
    @Operation(summary = "파일 컨트롤러", description = "FileResponseDTO의 saveName을 요청하면 해당 자원을 반환합니다. 이미지 태그에 넣어서 사용할 수 있습니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "파일 반환 성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스 접근")
        }
    )
    @GetMapping("/{date}/{savedName}")
    public ResponseEntity<?> showImage(@PathVariable String savedName, @PathVariable String date) throws MalformedURLException, FileNotFoundException {
        log.info("date: {}, savedName: {}", date, savedName);
        Pattern pattern = Pattern.compile("\\.\\.");
        if (pattern.matcher(date).matches() || pattern.matcher(savedName).matches()) {
            throw new BadRequestException("상위 디렉토리로 접근은 불가능합니다.");
        }
        if (date.equals("default")) {
            return new ResponseEntity<Resource>(new UrlResource("classpath:/static/" + date + "/" + savedName), HttpStatus.OK);
        }
        return new ResponseEntity<Resource>(new UrlResource("file:" + fileDir + date + "/" + savedName), HttpStatus.OK);
    }

}
