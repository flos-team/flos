package com.onehee.flos.util;

import com.onehee.flos.auth.model.dto.MemberDetails;
import com.onehee.flos.auth.model.dto.OAuth2UserDTO;
import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Log4j2
public class FilesHandler {
    @Value("${file.dir}")
    private String fileDir;

    @Value("${file.extension-regex}")
    private String regex;

    private final FileRepository fileRepository;

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
//        log.info("extension: {}", extension);
//        log.info("regex: {}", regex);
//        log.info("result: {}", Pattern.matches(regex, extension));
        if (!Pattern.matches(regex, extension)) {
            throw new BadRequestException("지원하지 않는 파일 확장자 입니다.");
        }
        // 저장시 사용할 파일 이름에 확장자 붙이기
        String savedName = uuid + extension;
        // 중복을 피하고 관리를 편하게 하기위해서 /날짜/UUID.확장자 포맷으로 저장하기 위해서 현재 년월일 가져옴
        LocalDateTime now = LocalDateTime.now();
        String uploadDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        // 최상위경로/날짜/UUID.확장자
        String savedPath = fileDir + uploadDate + File.separator + savedName;
        // 업로더
        Member uploader = SecurityManager.getCurrentMember();

        // DB에 저장하기위해서 엔티티로 변환
        FileEntity fileEntity = FileEntity.builder()
                .originalName(oriName)
                .savedName(savedName)
                .savedPath(savedPath)
                .member(uploader)
                .createdAt(now)
                .build();

        // 실제 파일 저장

        // 폴더 없으면 만들기
        File saveFolder = new File(fileDir + uploadDate);
        if (!saveFolder.exists()) {
            saveFolder.mkdirs();
        }

        file.transferTo(new File(savedPath));

        // DB에 등록
        return fileRepository.save(fileEntity);
    }

    @Transactional
    public FileEntity saveUrlImage(OAuth2UserDTO oAuth2UserDTO) {
        try {
            URL imageUrl = new URL(oAuth2UserDTO.getProfileImage());
            InputStream in = new BufferedInputStream(imageUrl.openStream());
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int n = 0;
            while ((n = in.read(buffer)) != -1) {
                out.write(buffer, 0, n);
            }
            out.close();
            in.close();
            byte[] response = out.toByteArray();

            String oriName = oAuth2UserDTO.getProfileImage();
            oriName = oriName.substring(oriName.lastIndexOf("/") + 1);
            String uuid = UUID.randomUUID().toString();
            String extension = oriName.substring(oriName.lastIndexOf("."));
            String savedName = uuid + extension;
            LocalDateTime now = LocalDateTime.now();
            String uploadDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            String savedPath = fileDir + uploadDate + File.separator + savedName;

            FileEntity fileEntity = FileEntity.builder()
                    .originalName(oriName)
                    .savedName(savedName)
                    .savedPath(savedPath)
                    .createdAt(now)
                    .build();

            File saveFolder = new File(fileDir + uploadDate);
            if (!saveFolder.exists()) {
                saveFolder.mkdirs();
            }

            File saveImage = new File(savedPath);
            if (!saveImage.exists()) {
                FileOutputStream fos = new FileOutputStream(savedPath);
                fos.write(response);
                fos.close();
            }

            return fileRepository.save(fileEntity);
        } catch (IOException e) {
            log.warn("소셜 계정에서 프로필 이미지를 가져오는 도중 에러가 발생했습니다. {}", e.getMessage());
            return null;
        }

    }

}
