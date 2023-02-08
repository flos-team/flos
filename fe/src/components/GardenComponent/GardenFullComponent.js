import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper';
import { useState, useRef, useEffect } from "react";
import 'swiper/css';
import 'swiper/less/effect-coverflow';
import 'swiper/css/scrollbar';
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
    width: 100%;
`;

const Header = styled.div`
`;

const Footer = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlowerDateData = styled.div`
    font-size: 0.8rem;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid gray;
`;

SwiperCore.use([Scrollbar]);

const GardenFullComponent = () => {

    const sampleData = [{
        state: "은은한",
        name: "춘식1",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    },{
        state: "은은한",
        name: "춘식2",
        length: 15,
        startDate: "2028-09-11",
        endDate: "2022-10-30"
    },{
        state: "은은한",
        name: "춘식3",
        length: 15,
        startDate: "2022-08-11",
        endDate: "2022-10-30"
    }
    ,{
        state: "은은한",
        name: "춘식4",
        length: 15,
        startDate: "2019-07-11",
        endDate: "2022-10-30"
    }
    ,{
        state: "은은한",
        name: "춘식5",
        length: 15,
        startDate: "2022-06-11",
        endDate: "2022-10-30"
    }
    ,{
        state: "은은한",
        name: "춘식6",
        length: 15,
        startDate: "2020-05-11",
        endDate: "2022-10-30"
    }
    ,{
        state: "은은한",
        name: "춘식7",
        length: 15,
        startDate: "2021-04-11",
        endDate: "2022-10-30"
    }
    ,{
        state: "은은한",
        name: "춘식8",
        length: 15,
        startDate: "2020-03-11",
        endDate: "2022-10-30"
    }
];

    const [presentCount, setPresentCount] = useState(1);
    const [totalCount, setTotalCount] = useState(20);
    const [presentYear, setPresentYear] = useState("2022-10-12");

    const flowerFullList = [...sampleData].map((e, i) => <SwiperSlide key={i}><FlowerFullItem flowerInfo={e}></FlowerFullItem></SwiperSlide>);
    const SwiperRef = useRef();

    console.log(flowerFullList);

    const refreshDate = () => {
        if (flowerFullList.length > 0) {
            const startDateData = sampleData[SwiperRef.current.swiper.activeIndex + 1].startDate.split("-");
            setPresentYear(startDateData[0] + "년 " + startDateData[1] + "월");
        }
    }

    useEffect(() => {
        refreshDate();
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
                        modules={[Navigation, EffectCoverflow]}
                        effect="coverflow"
                        onSlideChange={(swiper) => refreshDate()}
                        onSwiper={(swiper) => console.log(swiper)}
                        centeredSlides={true}
                        initialSlide={1}
                        scrollbar={{ draggable: true, dragSize: 36 }}
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