package com.onehee.flos.model.service;

import com.onehee.flos.model.entity.FileEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface FileService {
    FileEntity saveFile(MultipartFile file) throws IOException;
}
