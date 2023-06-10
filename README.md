# 🌺 FLOS - 감정 공유 SNS

![](assets/flos-concept.jpg)

## UCC 링크 : https://youtu.be/ZA29DBDswOw

## 🎬 프로젝트 기간

2023-01-03 (화) ~ 2023-02-17 (금)

SSAFY 8기 2학기 공통프로젝트 - FLOS

<br>

## 🌺 개요

---

### _나의 감정을 날씨로 공유하고 나만의 꽃을 키우자_

😀 Flos는 라틴어로 꽃을 의미합니다.

😬 Flos는 피드를 작성하고 내용을 분석해서 그에 맞는 감정을 추천하고 분석 내용이 마음에 들지 않으면 바꿀 수 있습니다.

😎 나의 감정이 등록된 피드를 다른 사람들과 공유해서 마음이 담긴 댓글을 달고 채택되면 꽃을 키울 수 있는 물과 햇빛을 얻을 수 있습니다. 꽃을 키우기 위해 활동을 많이 할 수 있고 활동을 많이 하는 유저는 다양한 꽃을 키워 정원을 풍성하게 채울 수 있습니다.

<br>

## 🌺 주요 기능

---

### 1. 사용자가 작성한 텍스트를 분석한 결과를 쉽게 사용 가능한 인터페이스로 제공.

- 네이버 CLOVA 에서 제공하는 Sentiment API를 사용하여 텍스트 분석에 대해 최소한의 신뢰성을 보장함.
  https://guide-fin.ncloud-docs.com/docs/ko/naveropenapiv3-clovasentiment

### 2. 다른 사람의 포스트에 댓글로 소통하며 상호 작용 할 수 있는 피드백 시스템

- 작성자가 댓글을 단 사람에게 감사의 표시로 좋아요를 눌러주면 나만의 정원을 꾸밀 수 있는 아이템을 획득

### 3. 나만의 이야기를 기록하는 퍼스널 가든 시스템

- 사용자의 최근 게시굴을 기준으로 꽃의 색깔을 비롯하여 가변적인 특성을 갖는 개인별 맞춤 꽃송이 키우기

### 4. 지난 날을 되돌아보며... 사용자의 서비스 이용 기록을 간단 요약해주는 통계 페이지

- 사용자의 서비스 활동 내역을 집계하고 가공하여 한눈으로 쉽게 마음 변화 추이를 확인 가능한 사용자 친화형 인터페이스 제공.

<br>


## 📝 서비스 아키텍처
![아키텍처](./assets/service-architecture.png)

## 🛠 주요 기술

---

**Back-end : Spring Boot**

```
- Springboot 2.7.8
- Spring Data JPA
- Spring Security
- Redis
- OAuth2
- Swagger 3.0.0
- MariaDB
```

**Front-end : REACT**

```
- React : 18.2.0
- redux : 4.2.1
- reduxjs/toolkit : 1.9.2
- axios : 1.3.0
- react-lottie : 1.2.3
- dayjs : 1.11.7
- sweetalert2 : 11.7.1
- mui/material : 5.11.8
- material-ui/core : 4.12.4
- framer-motion : 9.0.1
- swiper : 9.0.0
- sass : 1.3.0
```

**CI/CD**

```
- Jenkins
- Docker
- Nginx
- Letsencrypt
```

<br>

## 🚩 파일 구조

### back

```
  flos
  ├── auth
  │    └── model
  │         ├── dto
  │         ├── repository
  │         └── service
  ├── config
  ├── controller
  ├── exception
  ├── model
  │    ├── dto
  │    │    ├── request
  │    │    └── response
  │    ├── entity
  │    │    └── type
  │    ├── repository
  │    └── service
  └── util
```

### front

```
  fe
  └── src
       ├── api
       ├── assets
       ├── components
       ├── constants
       ├── hooks
       ├── pages
       ├── redux
       └── styles
```

## 🚀 협업 방식

### **Matter Most**

- 평상시 소통을 위한 도구
- 짧은 코드나 참조 url 공유

### **Notion**

- Config 정리
- 회의록 저장
- 피드백 공유

### **Git lab**

- 개발 코드 형상 관리
- 메인, 작업 브랜치와 개인 브랜치 구분

### **Figma**

- 기획 회의
- 와이어 프레임 구성
- 직접 화면을 구성하면서 회의

### **Jira**

- 일정 관리

<br>

## 📋 팀원 역할 분배

![](assets/team-profile.jpg)

<br>

## 🌺 결과물

- [컨벤션](assets/convention.md)
- [ERD](assets/erd.png)

## 🌺 FLOS 서비스 화면

<div align="left">
<img src="./assets/flos-post.jpg" width="252px" height="560px"/>
<img src="./assets/flos-main.jpg" width="252px" height="560px"/>
<img src="./assets/flos-profile.jpg" width="252px" height="560px"/>
</div>

<div align="left">
<img src="./assets/flos-like.jpg" width="252px" height="560px"/>
<img src="./assets/flos-statistics.jpg" width="252px" height="560px"/>
<img src="./assets/flos-garden.jpg" width="252px" height="560px"/>
</div>
