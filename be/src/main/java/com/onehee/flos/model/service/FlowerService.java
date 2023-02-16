package com.onehee.flos.model.service;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.BestContributorResponseDTO;
import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import com.onehee.flos.model.dto.response.GardenCountResponseDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FlowerService {

    // 꽃 생성
    void createFlower(FlowerCreateRequestDTO flowerCreateRequestDTO) throws BadRequestException;
    // 꽃 이름 수정
    void modifyFlower(FlowerModifyRequestDTO flowerModifyRequestDTOo) throws BadRequestException;
    // 꽃 요양원행
    void gardeningFlower(FlowerGardeningRequestDTO flowerGardeningRequestDTO) throws BadRequestException;
    // 꽃 유언
    void modifyLastLetter(FlowerLastLetterRequestDTO flowerWillRequestDTO);

    // 특정 꽃 정보
    FlowerResponseDTO getFlowerById(FlowerInfoRequestDTO flowerInfoRequestDTO);
    // 회원 꽃 정보
    FlowerResponseDTO getFlowerInfo();
    // 회원의 가든 꽃 리스트
    SliceResponseDTO getFlowerListInGarden(Pageable pageable) throws BadRequestException;
    // 특정 꽃의 기여자 리스트
    List<MemberResponseDTO> getContributorByFlower(Long flowerId) throws BadRequestException;
    // 특정 꽃의 최고 기여자 정보
    BestContributorResponseDTO getBestContributorByFlower(Long flowerId) throws BadRequestException;
    // 가든에 있는 꽃의 수
    GardenCountResponseDTO getCountInGarden();
    // 물주기
    FlowerResponseDTO giveWater();
    // 햇빛주기
    FlowerResponseDTO giveLight();
}
