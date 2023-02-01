package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    @Value("${file.dir}")
    private String fileDir;

    private final FileRepository fileRepository;

    @Override
    @Transactional
    public FileEntity saveFile(MultipartFile file) throws IOException {
        // 파일이 없으면 Bad Request 발생
        if (file.isEmpty()) throw new BadRequestException("파일이 없습니다");
        
        // 업로드 시 파일 이름
        String oriName = file.getOriginalFilename();
        
        // 저장시 사용할 파일 이름(UUID)
        String uuid = UUID.randomUUID().toString();
        
        // 확장자 추출
        String extension = oriName.substring(oriName.lastIndexOf("."));
        
        // 저장시 사용할 파일 이름에 확장자 붙이기
        String savedName = uuid + extension;
        
        // 중복을 피하고 관리를 편하게 하기위해서 /날짜/UUID.확장자 포맷으로 저장하기 위해서 현재 년월일 가져옴
        String uploadDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        
        // 최상위경로/날짜/UUID.확장자
        String savedPath = fileDir + uploadDate + File.pathSeparator + savedName;
        
        // DB에 저장하기위해서 엔티티로 변환
        FileEntity fileEntity = FileEntity.builder()
                .originalName(oriName)
                .savedName(savedName)
                .savedPath(savedPath)
                .build();
        
        // 실제 파일 저장
        file.transferTo(new File(savedPath));
        
        // DB에 등록
        return fileRepository.save(fileEntity);

    }
}
