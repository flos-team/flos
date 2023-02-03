package com.onehee.flos.model.repository;

import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostFileRepository extends JpaRepository<PostFile, Long> {

    // 파일 기준으로 탐색
    List<PostFile> findAllByFile(FileEntity file);

    // 포스트 기준으로 탐색
    List<PostFile> findAllByPost(Post post);

}
