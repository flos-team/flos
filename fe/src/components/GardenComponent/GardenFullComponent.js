import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, EffectCoverflow } from 'swiper';
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import styled from "@emotion/styled";
import FlowerFullItem from "./FlowerFullItem";

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

const GardenFullComponent = () => {

    const [presentCount, setPresentCount] = useState(1);
    const [totalCount, setTotalCount] = useState(20);
    const flowerFullList = [...Array(10)].map((e, i) => <SwiperSlide><FlowerFullItem></FlowerFullItem></SwiperSlide>);

    return (
        <>
            <FullConponent>
                <FlowerCountData>
                    {presentCount} / {totalCount}
                </FlowerCountData>
                <FlowerViewSwiper>
                    <Swiper
                        spaceBetween={1}
                        slidesPerView={1}
                        modules={[EffectCoverflow]}
                        effect="coverflow"
                        onSlideChange={(swiper) => setPresentCount(swiper.realIndex + 1)}
                        onSwiper={(swiper) => console.log(swiper)}
                        height="100"
                    >
                        {flowerFullList}
                    </Swiper>

                </FlowerViewSwiper>
            </FullConponent>
        </>
    );
};

export default GardenFullComponent;