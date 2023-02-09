import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Pagination, Scrollbar, A11y } from 'swiper';
import { useState, useRef, useEffect } from "react";
import 'swiper/css';
import 'swiper/less/effect-coverflow';
import 'swiper/css/scrollbar';
import styled from "@emotion/styled";
import FlowerFullItem from "./FlowerFullItem";
import { getGardenList } from "../../api/FlowerAPI"
// import SwiperCore, { Scrollbar } from "swiper/core"

const FullConponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calC(100vh - 160px);
`;

const FlowerCountData = styled.div`
    font-size: 0.8rem;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #FEFEFE;
    background-color: pink;
    color: white;
`;

const FlowerViewSwiper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = styled.div`
    margin-bottom: 20px;
`;

const Footer = styled.div`
    margin-top: 10px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlowerDateData = styled.div`
    font-size: 0.8rem;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #FEFEFE;
    background-color: pink;
    color: white;
`;


const GardenFullComponent = () => {

    //     const sampleData = [{
    //         state: "은은한",
    //         name: "춘식1",
    //         length: 15,
    //         startDate: "2022-10-11",
    //         endDate: "2022-10-30"
    //     },{
    //         state: "은은한",
    //         name: "춘식2",
    //         length: 15,
    //         startDate: "2028-09-11",
    //         endDate: "2022-10-30"
    //     },{
    //         state: "은은한",
    //         name: "춘식3",
    //         length: 15,
    //         startDate: "2022-08-11",
    //         endDate: "2022-10-30"
    //     }
    //     ,{
    //         state: "은은한",
    //         name: "춘식4",
    //         length: 15,
    //         startDate: "2019-07-11",
    //         endDate: "2022-10-30"
    //     }
    //     ,{
    //         state: "은은한",
    //         name: "춘식5",
    //         length: 15,
    //         startDate: "2022-06-11",
    //         endDate: "2022-10-30"
    //     }
    //     ,{
    //         state: "은은한",
    //         name: "춘식6",
    //         length: 15,
    //         startDate: "2020-05-11",
    //         endDate: "2022-10-30"
    //     }
    //     ,{
    //         state: "은은한",
    //         name: "춘식7",
    //         length: 15,
    //         startDate: "2021-04-11",
    //         endDate: "2022-10-30"
    //     }
    //     ,{
    //         state: "은은한",
    //         name: "춘식8",
    //         length: 15,
    //         startDate: "2021-04-11",
    //         endDate: "2022-10-30"
    //     }
    // ];

    const [gardenList, setGardenList] = useState([]);
    const [presentCount, setPresentCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [presentYear, setPresentYear] = useState("...");

    const flowerFullList = [...gardenList].map((e, i) => <SwiperSlide key={i}><FlowerFullItem flowerInfo={e}></FlowerFullItem></SwiperSlide>);
    const SwiperRef = useRef();

    console.log("ffl", flowerFullList);

    const refreshDate = () => {
        if (flowerFullList.length > 0) {
            const startDateData = gardenList[SwiperRef.current.swiper.activeIndex].startDate.split("-");
            setPresentYear(startDateData[0] + "년 " + startDateData[1] + "월");
        }
    }

    useEffect(() => {
        getGardenList(0).then((e) => {
            console.log(e);
            refreshDate();
        });
    }, []);

    console.dir(SwiperRef.current);

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
                        spaceBetween={5}
                        slidesPerView={1}
                        ref={SwiperRef}
                        modules={[Navigation, Pagination, EffectCoverflow, Scrollbar, A11y]}
                        effect="coverflow"
                        onSlideChange={(swiper) => {
                            refreshDate();
                            console.dir(swiper);
                            setPresentCount(swiper.activeIndex + 1);
                        }}
                        onSwiper={(swiper) => {
                            console.log("onSwiper");
                            console.log(swiper);
                        }}
                        navigation
                        centeredSlides={true}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true, dragSize: 30 }}
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