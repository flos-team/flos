package com.onehee.flos.model.entity.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FlowerType { // 성장도 70%일 때 변경됨
    Tulip("튤립", "", ""),
    TulipRed("튤립", "사랑의 고백, 열정적인 사랑", "red"),
    TulipOrange("튤립", "매혹, 온정, 수줍음, 부끄러움", "orange"),
    TulipYellow("튤립", "헛된 사랑, 이루어질 수 없는", "yellow"),
    TulipPurple("튤립", "영원한 사랑, 영원하지 않은 사랑", "purple"),
    TulipPink("튤립", "사랑의 시작, 애정, 배려", "pink"),
    TulipWhite("튤립", "과거의 우정, 실연, 추억, 새로운 시작, 순결", "white"),
    TulipMango("튤립", "수줍은 사랑의 표시, 매혹적인 사랑", "mango"),
    TulipGrapefruit("튤립", "사랑의 고백", "grapefruit"),
    TulipGreen("튤립", "아름다운 눈", "green"),
    TulipBlue("튤립", "사랑합니다 유저 여러분", "blue");

    private final String flowerType;
    private final String flowerMeaning;
    private final String color;
}
