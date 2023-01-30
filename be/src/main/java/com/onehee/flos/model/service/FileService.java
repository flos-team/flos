package com.onehee.flos.model.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface FileService {
    void saveFile(MultipartFile file) throws IOException;
}
