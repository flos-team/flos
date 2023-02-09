package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.FlowerCreateRequestDTO;
import com.onehee.flos.model.dto.request.FlowerGardeningRequestDTO;
import com.onehee.flos.model.dto.request.FlowerModifyRequestDTO;
import com.onehee.flos.model.dto.response.BestContributorResponseDTO;
import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface FlowerService {

    // 꽃 생성
    void createFlower(FlowerCreateRequestDTO flowerCreateRequestDTO) throws BadRequestException;
    // 꽃 이름 수정
    void modifyFlower(FlowerModifyRequestDTO flowerModifyRequestDTOo) throws BadRequestException;
    // 꽃 요양원행
    void gardeningFlower(FlowerGardeningRequestDTO flowerGardeningRequestDTO) throws BadRequestException;
    // 회원 꽃 정보
    FlowerResponseDTO getFlowerInfo();
    // 특정 꽃 정보
    FlowerResponseDTO getFlowerInfoById(Long flowerId) throws BadRequestException;
    // 회원의 가든 꽃 리스트
    SliceResponseDTO getFlowerListInGarden(Pageable pageable) throws BadRequestException;

    SliceResponseDTO getContributorByFlower(Long flowerId, Pageable pageable) throws BadRequestException;

    BestContributorResponseDTO getBestContributorByFlower(Long flowerId) throws BadRequestException;

    // 물주기
    FlowerResponseDTO giveWater();

    // 햇빛주기
    FlowerResponseDTO giveLight();
}
