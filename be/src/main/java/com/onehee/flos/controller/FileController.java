package com.onehee.flos.controller;

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

import java.io.File;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/file")
@Log4j2
public class FileController {

    @Value("${file.dir}")
    private String fileDir;

    @GetMapping("/{imageUrl}")
    public ResponseEntity<?> showImage(@PathVariable String imageUrl) throws MalformedURLException {
        log.info("{}", imageUrl);
        return new ResponseEntity<Resource>(new UrlResource("file:" + fileDir + "20230201" + File.separator + imageUrl), HttpStatus.OK);
    }

}
