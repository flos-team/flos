package com.onehee.flos.controller;

import com.onehee.flos.exception.BadRequestException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.net.MalformedURLException;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/file")
@Log4j2
public class FileController {

    @Value("${file.dir}")
    private String fileDir;

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
