package com.onehee.flos.model.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FlowerState { // 물과 햇빛 비율에 따라 설정됨
    S3R1("짙게 선명한"), S2R1("옅게 선명한"), S1R1("몹시 산뜻한"), S1R2("옅게 은은한"), S1R3("짙게 은은한");

    private final String state;
}

