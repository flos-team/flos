package com.onehee.flos.util;

import com.onehee.flos.model.entity.type.FlowerType;

import java.util.Random;

public class RandomFlowerTypeSelector {
    public static FlowerType getRandomSunnyType() {
        if (new Random().nextInt(100) % 4 == 1)
            return FlowerType.TulipRed;
        else if (new Random().nextInt(100) % 4 == 2)
            return FlowerType.TulipYellow;
        else if (new Random().nextInt(100) % 4 == 3)
            return FlowerType.TulipGrapefruit;
        else
            return FlowerType.TulipPurple;
    }
    public static FlowerType getRandomCloudyType() {
        if (new Random().nextInt(100) % 3 == 1)
            return FlowerType.TulipPink;
        else if (new Random().nextInt(100) % 3 == 2)
            return FlowerType.TulipBlue;
        else
            return FlowerType.TulipWhite;
    }
    public static FlowerType getRandomRainyType() {
        if (new Random().nextInt(100) % 3 == 1)
            return FlowerType.TulipOrange;
        else if (new Random().nextInt(100) % 3 == 2)
            return FlowerType.TulipMango;
        else
            return FlowerType.TulipGreen;
    }
}
