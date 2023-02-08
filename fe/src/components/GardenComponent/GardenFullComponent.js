import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import {  Navigation, Pagination, EffectCube, EffectCoverflow } from 'swiper';
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
    height: 80vh;
`;

const FlowerCountData = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlowerViewSwiper = styled.div`
    flex-grow: 10;
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

SwiperCore.use([Scrollbar]);

const GardenFullComponent = () => {

    const [presentCount, setPresentCount] = useState(1);
    const [totalCount, setTotalCount] = useState(20);
    const [presentYear, setPresentYear] = useState("");

    const flowerFullList = [...Array(10)].map((e, i) => <SwiperSlide><FlowerFullItem flowerInfo={{name: "아아", startDate: "2022-10-11"}}></FlowerFullItem></SwiperSlide>);
    const SwiperRef = useRef();

    useEffect(() => {
        setTotalCount(flowerFullList.length);
        if(flowerFullList.length > 0){
            const startDateData = flowerFullList[SwiperRef.current.swiper.realIndex + 1].props.children.props.flowerInfo.startDate.split("-");
            setPresentYear(startDateData[0]+"년");
        }
    }, []);

    return (
        <>
            <FullConponent>
                <FlowerCountData>
                    {presentCount} / {totalCount}
                </FlowerCountData>
                {presentYear}
                <FlowerViewSwiper>
                    <Swiper
                        spaceBetween={1}
                        slidesPerView={1}
                        modules={[Navigation, Pagination, EffectCoverflow]}
                        effect="coverflow"
                        onSlideChange={(swiper) => setPresentCount(swiper.realIndex + 1)}
                        onSwiper={(swiper) => console.log(swiper)}
                        height="100"
                        ref={SwiperRef}
                        navigation
                        centeredSlides={true}
                        initialSlide={1}
                        scrollbar={{ draggable: true, dragSize: 24 }}
                    >
                        {(flowerFullList.length == 0 ? "등록된 꽃이 없어요. 꽃을 피워볼까요?" : flowerFullList)}
                    </Swiper>

                </FlowerViewSwiper>
            </FullConponent>
        </>
    );
};

export default GardenFullComponent;