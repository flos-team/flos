package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.response.StatisticsResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface StatisticsService {

    StatisticsResponseDTO getReport();
}
