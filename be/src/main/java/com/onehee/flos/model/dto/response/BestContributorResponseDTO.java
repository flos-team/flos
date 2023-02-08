package com.onehee.flos.model.dto.response;

import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BestContributorResponseDTO {
    private FlowerResponseDTO flower;
    private MemberResponseDTO contributor;
    private Long contributeCounter;
}
