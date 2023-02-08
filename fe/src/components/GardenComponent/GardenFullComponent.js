import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, EffectCube, EffectCoverflow } from 'swiper';
import { useState, useRef, useEffect } from "react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import styled from "@emotion/styled";
import FlowerFullItem from "./FlowerFullItem";
import SwiperCore, { Scrollbar } from "swiper/core"

const FullConponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calC(100vh - 160px);
`;

const FlowerCountData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlowerViewSwiper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Header = styled.div`
    flex-grow: 1;
`;

const Footer = styled.div`
    flex-grow: 1;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlowerDateData = styled.div`

`;

SwiperCore.use([Scrollbar]);

const sampleData = [{
        state: "은은한",
        name: "춘식1",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식2",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식3",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식4",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식5",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식6",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식7",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식8",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식9",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },
    {
        state: "은은한",
        name: "춘식10",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    }];

const GardenFullComponent = () => {

    const [presentCount, setPresentCount] = useState(1);
    const [totalCount, setTotalCount] = useState(20);
    const [presentYear, setPresentYear] = useState("2022-10-12");

    const flowerFullList = sampleData.map((e, i) => <SwiperSlide key={i}><FlowerFullItem flowerInfo={e}></FlowerFullItem></SwiperSlide>);
    const SwiperRef = useRef();

    useEffect(() => {
        setTotalCount(flowerFullList.length);
        if (flowerFullList.length > 0) {
            const startDateData = flowerFullList[SwiperRef.current.swiper.realIndex + 1].props.children.props.flowerInfo.startDate.split("-");
            setPresentYear(startDateData[0] + "년" + startDateData[1] + "월");
        }
        console.log("flowerFullList");
        console.dir(flowerFullList);
    }, []);

    return (
        <>
            <FullConponent>
                <Header>
                    <FlowerCountData>
                        {presentCount} / {totalCount}
                    </FlowerCountData>
                </Header>
                <FlowerViewSwiper>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        ref={SwiperRef}
                        // modules={[Navigation, EffectCoverflow]}
                        // effect="coverflow"
                        onSlideChange={(swiper) => setPresentCount(swiper.realIndex + 1)}
                        onSwiper={(swiper) => console.log(swiper)}
                        height="100"
                        // centeredSlides={true}
                        // initialSlide={1}
                        scrollbar={{ draggable: true, dragSize: 24 }}
                    >
                        {(flowerFullList.length == 0 ? "등록된 꽃이 없어요. 꽃을 피워볼까요?" : flowerFullList)}
                    </Swiper>
                </FlowerViewSwiper>
                <Footer>
                    <FlowerDateData>
                        {presentYear}
                    </FlowerDateData>
                </Footer>
            </FullConponent>
        </>
    );
};

export default GardenFullComponent;