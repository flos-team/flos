package com.onehee.flos.model.dto.request;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.type.FlowerType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FlowerModifyRequestDTO {

    private String name;

}
