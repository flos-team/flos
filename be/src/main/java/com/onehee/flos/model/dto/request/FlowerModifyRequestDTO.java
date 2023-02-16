package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "꽃 이름 수정 DTO")
public class FlowerModifyRequestDTO {

    @Schema(description = "꽃의 pk")
    private Long id;
    @Schema(description = "변경할 꽃의 이름")
    private String name;
    @JsonIgnore
    private Member owner;

    public Flower toAccept(Flower flower, Member owner) {
        flower.setName(this.getName());
        flower.setOwner(owner);
        return flower;
    }

}
