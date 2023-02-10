package com.onehee.flos.util;

import com.onehee.flos.model.entity.type.FlowerType;

import java.util.Random;

public class RandomFlowerTypeSelector {
    public static FlowerType getRandomSunnyType() {
        return switch (new Random().nextInt(100) % 3) {
            case 0 -> FlowerType.TulipRed;
            case 1 -> FlowerType.TulipYellow;
            case 2 -> FlowerType.TulipGrapefruit;
            default -> null;
        };
    }
    public static FlowerType getRandomCloudyType() {
        return switch (new Random().nextInt(100) % 3) {
            case 0 -> FlowerType.TulipPink;
            case 1 -> FlowerType.TulipPurple;
            case 2 -> FlowerType.TulipWhite;
            default -> null;
        };
    }
    public static FlowerType getRandomRainyType() {
        return switch (new Random().nextInt(100) % 3) {
            case 0 -> FlowerType.TulipOrange;
            case 1 -> FlowerType.TulipMango;
            case 2 -> FlowerType.TulipGreen;
            default -> null;
        };
    }

    public static FlowerType getRandomSCType() {
        return switch (new Random().nextInt(100) % 2) {
            case 0 -> RandomFlowerTypeSelector.getRandomSunnyType();
            case 1 -> RandomFlowerTypeSelector.getRandomCloudyType();
            default -> null;
        };
    }

    public static FlowerType getRandomSRType() {
        return switch (new Random().nextInt(100) % 2) {
            case 0 -> RandomFlowerTypeSelector.getRandomSunnyType();
            case 1 -> RandomFlowerTypeSelector.getRandomRainyType();
            default -> null;
        };
    }
    public static FlowerType getRandomCRType() {
        return switch (new Random().nextInt(100) % 2) {
            case 0 -> RandomFlowerTypeSelector.getRandomRainyType();
            case 1 -> RandomFlowerTypeSelector.getRandomCloudyType();
            default -> null;
        };
    }
}
