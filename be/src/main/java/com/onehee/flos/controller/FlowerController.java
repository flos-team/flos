package com.onehee.flos.controller;

import com.onehee.flos.exception.BadRequestException;
import com.onehee.flos.model.dto.SliceResponseDTO;
import com.onehee.flos.model.dto.request.FlowerCreateRequestDTO;
import com.onehee.flos.model.dto.request.FlowerModifyRequestDTO;
import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import com.onehee.flos.model.service.FlowerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @Operation(summary = "가든 페이지 꽃 리스트", description = "가든 페이지의 꽃 정보를 반환합니다.")
    @GetMapping("/garden")
    public ResponseEntity<?> getFlowerList(@RequestParam(value="page", required = false) Integer page){
        if (page==null)
            page = 0;
        PageRequest pageRequest = PageRequest.of(page, size);
        return new ResponseEntity<SliceResponseDTO>(flowerService.getFlowerListInGarden(pageRequest), HttpStatus.OK);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "꽃 생성", description = "이름과 종류로 꽃을 생성합니다.")
    @PostMapping("/create")
    public ResponseEntity<?> createFlower(@RequestBody FlowerCreateRequestDTO flowerCreateRequestDTO) throws BadRequestException {
        flowerService.createFlower(flowerCreateRequestDTO); // [DELAY] 이 때 종류로 이미지 파일 연결해야함(안되어있음)
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Tag(name = "꽃API")
    @Operation(summary = "꽃 수정", description = "꽃 이름을 수정합니다.")
    @PutMapping("/modify")
    public ResponseEntity<?> modifyFlower(@RequestBody FlowerModifyRequestDTO flowerModifyRequestDTO) throws BadRequestException {
        flowerService.modifyFlower(flowerModifyRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
