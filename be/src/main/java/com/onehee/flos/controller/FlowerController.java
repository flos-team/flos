package com.onehee.flos.controller;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.*;
import com.onehee.flos.model.dto.response.BestContributorResponseDTO;
import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import com.onehee.flos.model.dto.response.GardenCountResponseDTO;
import com.onehee.flos.model.dto.response.MemberResponseDTO;
import com.onehee.flos.model.service.FlowerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "꽃API", description = "꽃 기능을 담당합니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/flower")
public class FlowerController {

    private final FlowerService flowerService;

    @Value("${spring.paging.size}")
    private Integer size;

    @Tag(name = "꽃API")
    @Operation(summary = "홈 페이지 꽃 정보", description = "홈 페이지의 꽃 정보를 반환합니다.")
    @GetMapping("/home")
    public ResponseEntity<?> getFlower(){
        return new ResponseEntity<FlowerResponseDTO>(flowerService.getFlowerInfo(), HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "꽃 정보", description = "id에 따라 꽃 정보를 반환합니다.")
    @PostMapping("/info")
    public ResponseEntity<?> getFlowerById(@RequestBody FlowerInfoRequestDTO flowerInfoRequestDTO){
        return new ResponseEntity<FlowerResponseDTO>(flowerService.getFlowerById(flowerInfoRequestDTO), HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "꽃에게 보내는 마지막 편지", description = "꽃에 letter 정보를 입력합니다.")
    @PostMapping("/letter")
    public ResponseEntity<?> modifyLetter(@RequestBody FlowerLastLetterRequestDTO flowerLastLetterRequestDTO){
        flowerService.modifyLastLetter(flowerLastLetterRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "가든 페이지 꽃 리스트", description = "가든 페이지의 꽃 정보를 반환합니다.")
    @GetMapping("/garden")
    public ResponseEntity<?> getFlowerList(@RequestParam(value="page", required = false) Integer page){
        if (page==null)
            page = 0;
        PageRequest pageRequest = PageRequest.of(page, size);
        return new ResponseEntity<SliceResponseDTO>(flowerService.getFlowerListInGarden(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "가든 페이지 꽃 수량", description = "가든 페이지의 꽃 수량을 반환합니다.")
    @GetMapping("/garden/count")
    public ResponseEntity<?> getFlowerListCount(){
        return new ResponseEntity<GardenCountResponseDTO>(flowerService.getCountInGarden(), HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "꽃 생성", description = "이름과 종류로 꽃을 생성합니다.")
    @PostMapping("")
    public ResponseEntity<?> createFlower(@RequestBody FlowerCreateRequestDTO flowerCreateRequestDTO) throws BadRequestException {
        flowerService.createFlower(flowerCreateRequestDTO); // [DELAY] 이 때 종류로 이미지 파일 연결해야함(안되어있음)
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "꽃 수정", description = "꽃 이름을 수정합니다.")
    @PutMapping("")
    public ResponseEntity<?> modifyFlower(@RequestBody FlowerModifyRequestDTO flowerModifyRequestDTO) throws BadRequestException {
        flowerService.modifyFlower(flowerModifyRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "플라워링", description = "꽃을 가든으로 보냅니다.")
    @PostMapping("/gardening")
    public ResponseEntity<?> modifyFlower(@RequestBody FlowerGardeningRequestDTO flowerGardeningRequestDTO) throws BadRequestException {
        flowerService.gardeningFlower(flowerGardeningRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "꽃 기여자 리스트", description = "꽃의 성장에 기여한 회원 리스트를 반환합니다.")
    @GetMapping("/{flowerId}")
    public ResponseEntity<?> getContributorByFlower(@PathVariable("flowerId") Long flowerId){
        return new ResponseEntity<List<MemberResponseDTO>>(flowerService.getContributorByFlower(flowerId), HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "꽃 최고 기여자", description = "꽃의 성장에 가장 많이 기여한 회원 정보와 횟수를 반환합니다.")
    @GetMapping("/best/{flowerId}")
    public ResponseEntity<?> getBestContributor(@PathVariable("flowerId") Long flowerId){
        return new ResponseEntity<BestContributorResponseDTO>(flowerService.getBestContributorByFlower(flowerId), HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "물주기", description = "꽃에 물을 줍니다. 가장 오랜된 물부터 적용됩니다.")
    @PostMapping("/give-water")
    public ResponseEntity<?> giveWater() {
        return new ResponseEntity<FlowerResponseDTO>(flowerService.giveWater(), HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "햇빛주기", description = "꽃에 햇빛을 줍니다. 가장 오랜된 물부터 적용됩니다.")
    @PostMapping("/give-light")
    public ResponseEntity<?> giveLight() {
        return new ResponseEntity<FlowerResponseDTO>(flowerService.giveLight(), HttpStatus.OK);
    }
}
