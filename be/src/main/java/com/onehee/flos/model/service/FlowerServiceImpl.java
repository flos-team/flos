package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.FlowerCreateRequestDTO;
import com.onehee.flos.model.dto.request.FlowerModifyRequestDTO;
import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.repository.FlowerRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FlowerServiceImpl implements FlowerService {

    private final FlowerRepository flowerRepository;

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
        Member owner = SecurityManager.getCurrentMember();
        return FlowerResponseDTO.toDto(flowerRepository.findByOwnerAndBlossomAtIsNull(owner));
    }

    @Override
    public SliceResponseDTO getFlowerListInGarden(Pageable pageable) throws BadRequestException {
        Member owner = SecurityManager.getCurrentMember();
        return SliceResponseDTO.toDto(flowerRepository.findSliceByOwnerAndBlossomAtIsNotNull(owner, pageable));
    }
}
