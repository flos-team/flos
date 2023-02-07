package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.FlowerCreateRequestDTO;
import com.onehee.flos.model.dto.request.FlowerModifyRequestDTO;
import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.WeatherResource;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.FlowerRepository;
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

    @Override
    public void createFlower(FlowerCreateRequestDTO flowerCreateRequestDTO) throws BadRequestException {
        Member owner = SecurityManager.getCurrentMember();
        flowerRepository.saveAndFlush(flowerCreateRequestDTO.toEntity(owner));
    }

    @Override
    public void modifyFlower(FlowerModifyRequestDTO flowerModifyRequestDTO) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerModifyRequestDTO.getId()).orElseThrow(() -> new BadRequestException("해당 꽃이 존재하지 않습니다."));
        Member owner = SecurityManager.getCurrentMember();
        flowerRepository.saveAndFlush(flowerModifyRequestDTO.toAccept(flower, owner));
    }

    @Override
    public FlowerResponseDTO getFlowerInfoById(Long flowerId) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerId).orElseThrow(() -> new BadRequestException("해당 꽃이 존재하지 않습니다."));
        return FlowerResponseDTO.toDto(flower);
    }

    @Override
    public FlowerResponseDTO getFlowerInfo() {
        return FlowerResponseDTO.toDto(flowerRepository.findByOwnerAndBlossomAtIsNull(SecurityManager.getCurrentMember()).orElse(null));
    }

    @Override
    public SliceResponseDTO getFlowerListInGarden(Pageable pageable) throws BadRequestException {
        Member owner = SecurityManager.getCurrentMember();
        return SliceResponseDTO.toDto(flowerRepository.findSliceByOwnerAndBlossomAtIsNotNull(owner, pageable));
    }

    @Override
    public SliceResponseDTO getContributorByFlower(Long flowerId, Pageable pageable) throws BadRequestException {
        Flower flower = flowerRepository.findById(flowerId).orElseThrow(() -> new BadRequestException("해당하는 꽃이 없습니다."));
        if (!flower.getOwner().equals(SecurityManager.getCurrentMember()))
            throw new BadRequestException("꽃 주인이 아닙니다.");
        return SliceResponseDTO.toDto(flowerRepository.findContributorByFlower(flower, pageable));
    }

    @Override
    @Transactional
    public FlowerResponseDTO giveWater() {
        Member member = SecurityManager.getCurrentMember();
        Flower flower = flowerRepository.findByOwnerAndBlossomAtIsNull(member).orElseThrow(() -> new BadRequestException("현재 키우고 있는 꽃이 없습니다."));

        // 제일 오래된 사용가능한 물 가져옴
        WeatherResource water = weatherResourceRepository.findFirstByOwnerAndWeatherTypeIsAndFlowerIsNull(member, WeatherType.RAINY)
                .orElseThrow(() -> new BadRequestException("남은 물이 없습니다."));

        // 물쓰기
        water.setFlower(flower);
        water.setUsedAt(LocalDateTime.now());

        // 갱신
        flower = flowerRepository.saveAndFlush(flower);

        // 반환
        return FlowerResponseDTO.toDto(flower);
    }

    @Override
    @Transactional
    public FlowerResponseDTO giveLight() {
        Member member = SecurityManager.getCurrentMember();
        Flower flower = flowerRepository.findByOwnerAndBlossomAtIsNull(member).orElseThrow(() -> new BadRequestException("현재 키우고 있는 꽃이 없습니다."));

        // 제일 오래된 사용가능한 물 가져옴
        WeatherResource light = weatherResourceRepository.findFirstByOwnerAndWeatherTypeIsAndFlowerIsNull(member, WeatherType.SUNNY)
                .orElseThrow(() -> new BadRequestException("남은 햇빛이 없습니다."));

        // 물쓰기
        light.setFlower(flower);
        light.setUsedAt(LocalDateTime.now());

        // 갱신
        flower = flowerRepository.saveAndFlush(flower);

        // 반환
        return FlowerResponseDTO.toDto(flower);
    }
}
