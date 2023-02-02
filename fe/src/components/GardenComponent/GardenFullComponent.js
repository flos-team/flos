import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styled from "@emotion/styled";
import FlowerFullItem from "./FlowerFullItem";


const FullConponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 90vh;
`;

const FlowerCountData = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlowerView = styled.div`
    flex-grow: 10;
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const GardenFullComponent = () => {

    let presentCount = 0;
    let totalCount = 20;
    const flowerInfo = {
        name: "아"

    };
    const flowerFullList = [...Array(10)].map((e, i) => <SwiperSlide><FlowerFullItem flowerInfo={flowerInfo}></FlowerFullItem></SwiperSlide>);
    return (
        <FullConponent>
            <FlowerCountData>
                {presentCount} / {totalCount}
            </FlowerCountData>
            <FlowerView>
            <Swiper
                spaceBetween={1}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                height="100%"
            >
                {flowerFullList}
            </Swiper>
                
            </FlowerView>
        </FullConponent>
    );
};

export default GardenFullComponent;