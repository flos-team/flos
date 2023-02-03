package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.dto.response.PostResponseDTO;
import com.onehee.flos.model.entity.FileEntity;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.Tag;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostModifyRequestDTO {
    private Long id;
    private Long writerId;
    private String content;
    private LocalDateTime modifiedAt;
    private List<MultipartFile> attachFiles;
    private List<TagRequestDTO> tagList;
    @JsonIgnore
    private Member writer;

    public Post toAccept(Post post, Member writer) {
        post.setWriter(writer);
        post.setContent(this.getContent());
        post.setModifiedAt(this.getModifiedAt());
        return post;
    }
}
