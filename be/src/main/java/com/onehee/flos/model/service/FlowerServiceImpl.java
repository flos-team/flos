package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.exception.FlowerNotExistsException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.BestContributorResponseDTO;
import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import com.onehee.flos.model.dto.response.GardenCountResponseDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.WeatherResource;
import com.onehee.flos.model.entity.type.FlowerState;
import com.onehee.flos.model.entity.type.FlowerType;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.FlowerRepository;
import com.onehee.flos.model.repository.MemberRepository;
import com.onehee.flos.model.repository.WeatherResourceRepository;
import com.onehee.flos.util.RandomFlowerTypeSelector;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class FlowerServiceImpl implements FlowerService {

    private final FlowerRepository flowerRepository;
    private final WeatherResourceRepository weatherResourceRepository;
    private final MemberRepository memberRepository;

    @Override
    public void createFlower(FlowerCreateRequestDTO flowerCreateRequestDTO) throws BadRequestException {
        Member owner = SecurityManager.getCurrentMember();
        if (flowerRepository.findByOwnerAndGardeningIsFalse(owner).orElse(null) != null)
            throw new BadRequestException("이미 키우는 꽃이 있습니다.");
        flowerRepository.saveAndFlush(flowerCreateRequestDTO.toEntity(owner));
    }

    @Override
    public void modifyFlower(FlowerModifyRequestDTO flowerModifyRequestDTO) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("해당 꽃이 존재하지 않습니다."));
        Member owner = SecurityManager.getCurrentMember();
        flowerRepository.saveAndFlush(flowerModifyRequestDTO.toAccept(flower, owner));
    }

    @Override
    public void gardeningFlower(FlowerGardeningRequestDTO flowerGardeningRequestDTO) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerGardeningRequestDTO.getId()).orElseThrow(() -> new BadRequestException("해당 꽃이 존재하지 않습니다."));
        flower.setGardening(true);
        flower.setBlossomAt(LocalDateTime.now());
        flowerRepository.saveAndFlush(flower);
    }

    @Override
    @Transactional
    public void modifyLastLetter(FlowerLastLetterRequestDTO flowerLastLetterRequestDTO) {
        Flower flower = flowerRepository.findById(flowerLastLetterRequestDTO.getId() == null ? 0 : flowerLastLetterRequestDTO.getId()).orElseThrow(() -> new BadRequestException("해당되는 꽃이 없습니다."));
        if (!Objects.equals(flower.getOwner().getId(), SecurityManager.getCurrentMember().getId()))
            throw new BadRequestException("내 꽃이 아닙니다.");
        flower.setLetter(flowerLastLetterRequestDTO.getLetter());
        flower.setLettering(true);
        flowerRepository.saveAndFlush(flower);
    }

    @Override
    public FlowerResponseDTO getFlowerById(FlowerInfoRequestDTO flowerInfoRequestDTO) {
        Flower flower = flowerRepository.findById(flowerInfoRequestDTO.getId() == null ? 0 : flowerInfoRequestDTO.getId()).orElseThrow(() -> new BadRequestException("해당되는 꽃이 없습니다."));
        if (!Objects.equals(flower.getOwner().getId(), SecurityManager.getCurrentMember().getId()))
            throw new BadRequestException("내 꽃이 아닙니다.");
        return FlowerResponseDTO.toDto(flower);
    }

    @Override
    public FlowerResponseDTO getFlowerInfo() {
        return FlowerResponseDTO.toDto(flowerRepository.findByOwnerAndGardeningIsFalse(SecurityManager.getCurrentMember()).orElseThrow(FlowerNotExistsException::new));
    }

    @Override
    public SliceResponseDTO getFlowerListInGarden(Pageable pageable) throws BadRequestException {
        Member owner = SecurityManager.getCurrentMember();
        return SliceResponseDTO.toDto(flowerRepository.findSliceByOwnerAndBlossomAtIsNotNullAndGardeningIsTrueOrderByBlossomAtDesc(owner, pageable)
                .map(FlowerResponseDTO::toDto));
    }

    @Override
    public List<MemberResponseDTO> getContributorByFlower(Long flowerId) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerId).orElseThrow(() -> new BadRequestException("해당하는 꽃이 없습니다."));
        if (!SecurityManager.getCurrentMember().getId().equals(flower.getOwner().getId()))
            throw new BadRequestException("꽃 주인이 아닙니다.");
        return flowerRepository.findContributorByFlower(flower)
                .stream()
                .map(MemberResponseDTO::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public BestContributorResponseDTO getBestContributorByFlower(Long flowerId) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerId).orElseThrow(() -> new BadRequestException("해당하는 꽃이 없습니다."));
        return BestContributorResponseDTO.builder()
                .flower(FlowerResponseDTO.toDto(flower))
                .contributor(MemberResponseDTO.toDto(
                                memberRepository.findById(
                                        flowerRepository.findContributorByFlowerOrderByCount(flower)
                                ).orElseThrow(() -> new BadRequestException("해당 기여자가 존재하지 않습니다."))
                        )
                )
                .contributeCounter(flowerRepository.countByFlowerAndContributor(flower, SecurityManager.getCurrentMember()))
                .build();
    }

    @Override
    public GardenCountResponseDTO getCountInGarden() {
        return GardenCountResponseDTO.toDto(flowerRepository.countByOwnerAndBlossomAtIsNotNullAndGardeningIsTrue(SecurityManager.getCurrentMember()));
    }

    @Override
    @Transactional
    public FlowerResponseDTO giveWater() {
        Member member = SecurityManager.getCurrentMember();
        Flower flower = flowerRepository.findByOwnerAndGardeningIsFalse(member).orElseThrow(() -> new BadRequestException("현재 키우고 있는 꽃이 없습니다."));

        if (flower.getCapacity() <= (flower.getLight() + flower.getWater()))
            throw new BadRequestException("성장한 꽃에 물을 줄 수 없습니다.");

        // 제일 오래된 사용가능한 물 가져옴
        WeatherResource water = weatherResourceRepository.findFirstByOwnerAndWeatherTypeIsAndFlowerIsNull(member, WeatherType.RAINY)
                .orElseThrow(() -> new BadRequestException("남은 물이 없습니다."));

        if (flower.getCapacity() >= (flower.getLight() + flower.getWater() + 1))
            calIsFullGrown(flower, flower.getWater() + 1, flower.getLight());
        if ((float) flower.getCapacity() * 0.7 <= (float) (flower.getLight() + flower.getWater() + 1) && Objects.equals(flower.getFlowerType().getColor(), ""))
            flower.setFlowerType(getFlowerColor());

        // 물쓰기
        water.setFlower(flower);
        water.setUsedAt(LocalDateTime.now());

        // 갱신
        flower = flowerRepository.save(flower);
        flower.setWater(flower.getWater() + 1);

        // 반환
        return FlowerResponseDTO.toDto(flower);
    }

    @Override
    @Transactional
    public FlowerResponseDTO giveLight() {
        Member member = SecurityManager.getCurrentMember();
        Flower flower = flowerRepository.findByOwnerAndGardeningIsFalse(member).orElseThrow(() -> new BadRequestException("현재 키우고 있는 꽃이 없습니다."));

        if (flower.getCapacity() <= (flower.getLight() + flower.getWater()))
            throw new BadRequestException("성장한 꽃에 햇빛을 줄 수 없습니다.");

        // 제일 오래된 사용가능한 물 가져옴
        WeatherResource light = weatherResourceRepository.findFirstByOwnerAndWeatherTypeIsAndFlowerIsNull(member, WeatherType.SUNNY)
                .orElseThrow(() -> new BadRequestException("남은 햇빛이 없습니다."));

        if (flower.getCapacity() >= (flower.getLight() + flower.getWater() + 1))
            calIsFullGrown(flower, flower.getWater(), flower.getLight() + 1);
        if ((float) flower.getCapacity() * 0.7 <= (float) (flower.getLight() + flower.getWater() + 1) && Objects.equals(flower.getFlowerType().getColor(), ""))
            flower.setFlowerType(getFlowerColor());
        // 물쓰기
        light.setFlower(flower);
        light.setUsedAt(LocalDateTime.now());

        // 갱신
        flower = flowerRepository.save(flower);
        flower.setLight(flower.getLight() + 1);

        // 반환
        return FlowerResponseDTO.toDto(flower);
    }

    private void calIsFullGrown(Flower flower, Integer water, Integer light) {
        FlowerState level = FlowerState.S1R1;
        if (flower.getCapacity() == (light + water)) {
            if (light == 0)
                level = FlowerState.S1R3;
            else if (water == 0)
                level = FlowerState.S3R1;
            if (light < water) {
                if ((float) light / (float) flower.getCapacity() <= 0.25)
                    level = FlowerState.S1R3;
                else if ((float) light / (float) flower.getCapacity() < 0.333334)
                    level = FlowerState.S1R2;
            } else {
                if ((float) water / (float) flower.getCapacity() <= 0.25)
                    level = FlowerState.S3R1;
                else if ((float) water / (float) flower.getCapacity() < 0.333334)
                    level = FlowerState.S2R1;
            }
        }
        flower.setState(level);
    }

    private FlowerType getFlowerColor() {
        Member member = SecurityManager.getCurrentMember();
        int sunny = flowerRepository.countSunnyByRecent10Post(member);
        int rainy = flowerRepository.countRainyByRecent10Post(member);
        int cloud = flowerRepository.countCloudyByRecent10Post(member);
        if ((sunny == 0 && rainy == 0) || (sunny == 0 && cloud == 0) || (rainy == 0 && cloud == 0))
            return FlowerType.TulipBlue;
        if (sunny > cloud && sunny > rainy)
            return RandomFlowerTypeSelector.getRandomSunnyType();
        if (rainy > sunny && rainy > cloud)
            return RandomFlowerTypeSelector.getRandomRainyType();
        if (cloud > sunny && cloud > rainy)
            return RandomFlowerTypeSelector.getRandomCloudyType();
        if (sunny == cloud && cloud > rainy)
            return RandomFlowerTypeSelector.getRandomSCType();
        if (rainy == cloud && cloud > sunny)
            return RandomFlowerTypeSelector.getRandomCRType();
        if (rainy > cloud)
            return RandomFlowerTypeSelector.getRandomSRType();
        return FlowerType.Tulip;
    }
}
