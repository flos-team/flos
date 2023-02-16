package com.onehee.flos.model.service;

import com.onehee.flos.model.dto.response.FlowerResponseDTO;
import com.onehee.flos.model.dto.response.StatisticsResponseDTO;
import com.onehee.flos.model.entity.Flower;
import com.onehee.flos.model.entity.Member;
import com.onehee.flos.model.entity.Post;
import com.onehee.flos.model.entity.type.WeatherType;
import com.onehee.flos.model.repository.AttendanceRepository;
import com.onehee.flos.model.repository.FlowerRepository;
import com.onehee.flos.model.repository.MemberRepository;
import com.onehee.flos.model.repository.PostRepository;
import com.onehee.flos.util.SecurityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class StatisticsServiceImpl implements StatisticsService {

    private final PostRepository postRepository;
    private final FlowerRepository flowerRepository;
    private final AttendanceRepository attendanceRepository;

    @Override
    @Transactional
    public StatisticsResponseDTO getReport() {
        Member me = SecurityManager.getCurrentMember();

        YearMonth thisMonth = YearMonth.now();
        LocalDate beginOfMonth = thisMonth.atDay(1);
        LocalDate endOfMonth = thisMonth.atEndOfMonth();

        int loginCount = attendanceRepository.countByMemberAndLoginDateBetween(me, beginOfMonth, endOfMonth);
        List<Post> posts = postRepository.findAllByWriterAndCreatedAtBetween(me, LocalDate.now().minusDays(7).atTime(0,0,0), LocalDateTime.now());
        List<Flower> flowers = flowerRepository.findAllByOwnerAndBlossomAtIsNotNullOrderByBlossomAtDesc(me);

        log.info("{}", LocalDateTime.now());
        log.info("{}", posts);

        int postCount = posts.size();
        int sunny = (int) posts.stream().filter(p -> p.getWeather().equals(WeatherType.SUNNY)).count();
        int cloudy = (int) posts.stream().filter(p -> p.getWeather().equals(WeatherType.CLOUDY)).count();
        int rainy = (int) posts.stream().filter(p -> p.getWeather().equals(WeatherType.RAINY)).count();

        StatisticsResponseDTO statisticsResponseDTO = new StatisticsResponseDTO();

        statisticsResponseDTO.setLoginInfo(thisMonth.getMonthValue(), beginOfMonth.lengthOfMonth(), loginCount);

        statisticsResponseDTO.setPostInfo(postCount, sunny, cloudy, rainy);

        statisticsResponseDTO.setFlowers(
                flowers.stream().map(FlowerResponseDTO::toDto).collect(Collectors.toList())
        );

        return statisticsResponseDTO;
    }
}

