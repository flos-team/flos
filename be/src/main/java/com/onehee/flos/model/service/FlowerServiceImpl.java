package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.exception.FlowerNotExistsException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.FlowerCreateRequestDTO;
import com.onehee.flos.model.dto.request.FlowerGardeningRequestDTO;
import com.onehee.flos.model.dto.request.FlowerModifyRequestDTO;
import com.onehee.flos.model.dto.response.BestContributorResponseDTO;
import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.WeatherResource;
import com.onehee.flos.model.entity.type.FlowerState;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.FlowerRepository;
import com.onehee.flos.model.repository.FollowRepository;
import com.onehee.flos.model.repository.WeatherResourceRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FlowerServiceImpl implements FlowerService {

    private final FlowerRepository flowerRepository;
    private final WeatherResourceRepository weatherResourceRepository;
    private final FollowRepository followRepository;

    @Override
    public void createFlower(FlowerCreateRequestDTO flowerCreateRequestDTO) throws BadRequestException {
        Member owner = SecurityManager.getCurrentMember();
        if (flowerRepository.findByOwnerAndBlossomAtIsNullOrGardeningIsFalse(owner).orElse(null) != null)
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
        flowerRepository.saveAndFlush(flower);
    }

    @Override
    public FlowerResponseDTO getFlowerInfoById(Long flowerId) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerId).orElseThrow(() -> new BadRequestException("해당 꽃이 존재하지 않습니다."));
        return FlowerResponseDTO.toDto(flower);
    }

    @Override
    public FlowerResponseDTO getFlowerInfo() {
        return FlowerResponseDTO.toDto(flowerRepository.findByOwnerAndBlossomAtIsNullOrGardeningIsFalse(SecurityManager.getCurrentMember()).orElseThrow(FlowerNotExistsException::new));
    }

    @Override
    public SliceResponseDTO getFlowerListInGarden(Pageable pageable) throws BadRequestException {
        Member owner = SecurityManager.getCurrentMember();
        return SliceResponseDTO.toDto(flowerRepository.findSliceByOwnerAndBlossomAtIsNotNullAndGardeningIsTrueOrderByBlossomAtDesc(owner, pageable)
                .map(FlowerResponseDTO::toDto));
    }

    @Override
    public SliceResponseDTO getContributorByFlower(Long flowerId, Pageable pageable) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerId).orElseThrow(() -> new BadRequestException("해당하는 꽃이 없습니다."));
        if (!flower.getOwner().equals(SecurityManager.getCurrentMember()))
            throw new BadRequestException("꽃 주인이 아닙니다.");
        return SliceResponseDTO.toDto(flowerRepository.findContributorByFlower(flower, pageable));
    }

    @Override
    public BestContributorResponseDTO getBestContributorByFlower(Long flowerId) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerId).orElseThrow(() -> new BadRequestException("해당하는 꽃이 없습니다."));
        return BestContributorResponseDTO.builder()
                .flower(FlowerResponseDTO.toDto(flower))
                .contributor(MemberResponseDTO.toDto(flowerRepository.findContributorByFlowerOrderByCount(flower).orElseThrow(() -> new BadRequestException("기여자가 없습니다."))))
                .contributeCounter(flowerRepository.countByFlowerAndContributor(flower, SecurityManager.getCurrentMember()))
                .build();
    }

    @Override
    @Transactional
    public FlowerResponseDTO giveWater() {
        Member member = SecurityManager.getCurrentMember();
        Flower flower = flowerRepository.findByOwnerAndBlossomAtIsNullOrGardeningIsFalse(member).orElseThrow(() -> new BadRequestException("현재 키우고 있는 꽃이 없습니다."));

        if (flower.getCapacity() <= (flower.getLight()+flower.getWater()))
            throw new BadRequestException("성장한 꽃에 물을 줄 수 없습니다.");

        // 제일 오래된 사용가능한 물 가져옴
        WeatherResource water = weatherResourceRepository.findFirstByOwnerAndWeatherTypeIsAndFlowerIsNull(member, WeatherType.RAINY)
                .orElseThrow(() -> new BadRequestException("남은 물이 없습니다."));

        if (flower.getCapacity() >= (flower.getLight()+flower.getWater()+1))
            calIsFullGrown(flower, flower.getWater()+1, flower.getLight());

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
        Flower flower = flowerRepository.findByOwnerAndBlossomAtIsNullOrGardeningIsFalse(member).orElseThrow(() -> new BadRequestException("현재 키우고 있는 꽃이 없습니다."));

        if (flower.getCapacity() <= (flower.getLight()+flower.getWater()))
            throw new BadRequestException("성장한 꽃에 햇빛을 줄 수 없습니다.");

        // 제일 오래된 사용가능한 물 가져옴
        WeatherResource light = weatherResourceRepository.findFirstByOwnerAndWeatherTypeIsAndFlowerIsNull(member, WeatherType.SUNNY)
                .orElseThrow(() -> new BadRequestException("남은 햇빛이 없습니다."));

        if (flower.getCapacity() >= (flower.getLight()+flower.getWater()+1))
            calIsFullGrown(flower, flower.getWater(), flower.getLight()+1);

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
                if ((float)light/(float)flower.getCapacity() < 0.25)
                    level = FlowerState.S1R3;
                else if ((float)light/(float)flower.getCapacity() < 0.333333)
                    level = FlowerState.S1R2;
            }
            else {
                if ((float)water/(float)flower.getCapacity() < 0.25)
                    level = FlowerState.S3R1;
                else if ((float)water/(float)flower.getCapacity() < 0.333333)
                    level = FlowerState.S2R1;
            }
        }
        flower.setState(level);
    }
}
