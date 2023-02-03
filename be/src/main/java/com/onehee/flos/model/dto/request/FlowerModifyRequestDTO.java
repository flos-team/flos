package com.onehee.flos.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.type.FlowerType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FlowerModifyRequestDTO {

    private Long id;
    private String name;
    @JsonIgnore
    private Member owner;

    public Flower toAccept(Flower flower, Member owner) {
        flower.setName(this.getName());
        flower.setOwner(owner);
        return flower;
    }

}
