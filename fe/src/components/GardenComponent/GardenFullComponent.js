import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Pagination, Scrollbar, A11y } from 'swiper';
import { useState, useRef, useEffect } from "react";
import 'swiper/css';
import 'swiper/less/effect-coverflow';
import 'swiper/css/scrollbar';
import 'swiper/less/effect-fade';
import styled from "@emotion/styled";
import FlowerFullItem from "./FlowerFullItem";
import { getGardenList } from "../../api/FlowerAPI"
import Lottie from 'react-lottie';
import LoadingIcon from "./../../assets/GardenAsset/8640-loading.json"
import FloweringData from "../../assets/GardenAsset/77809-falling-leaf.json"
import Swal from 'sweetalert2'

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

const Effect = styled.div`
    position: fixed;
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
    font-size: 1.1rem;
    padding: 5px 15px;
    border-radius: 10px;
    border: 1px solid #FEFEFE;
    color: white;
    background-color: #D9C3C6;
    font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;;
    letter-spacing: -1px;
`;

const Loading = styled.div`
    width: 100%;
    height: calC(100vh - 160px);
    background-color:rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.3rem;
    align-items: center;
    position: fixed;
    Z-index: 49;
`;

let page;
let hasNext;

const GardenFullComponent = () => {
    const [gardenListData, setGardenListData] = useState([]);
    const [presentCount, setPresentCount] = useState(1);
    const [presentYear, setPresentYear] = useState("...");
    const [gardenList, setGardenList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const SwiperRef = useRef();

    const refreshDate = () => {
        if (gardenListData.length > 0) {
            const startDateData = gardenListData[SwiperRef.current.swiper.activeIndex].createdAt.split("-");
            setPresentYear(startDateData[0] + " / " + startDateData[1]);
        }
    }

    const getGardenListFunc = () => {
        setIsLoading(true);
        getGardenList(page).then((e) => {
            // console.log(e);
            hasNext = e.hasNext;
            setGardenListData(gardenListData.concat(e.content));
            setIsLoading(false);
        });
    }

    useEffect(() => {
        page = 0;
        hasNext = false;
        getGardenListFunc();
        refreshDate();
    }, []);

    useEffect(() => {
        if (gardenListData.length > 0 && presentCount == gardenListData.length) {
            if (hasNext) {
                page++;
                getGardenListFunc();
            }
            else {  
                Swal.fire({
                    icon: 'warning',
                    title: '마지막 꽃이에요.',
                  })
            }
        }
    }, [presentCount]);

    useEffect(() => {
        setGardenList([...gardenListData].map((e, i) => <SwiperSlide key={i}><FlowerFullItem flowerInfo={e}></FlowerFullItem></SwiperSlide>));
    }, [gardenListData])

    // console.dir(SwiperRef.current);

    return (
        <>
            {isLoading ? <Loading>
                <Lottie
                    options={{
                        autoplay: true,
                        animationData: LoadingIcon,
                    }}
                    height={350}
                    width={350}
                />
            </Loading> : null}
            <Effect>
                <Lottie
                    options={{
                        autoplay: true,
                        animationData: FloweringData,
                    }}
                    height={550}
                    width={400}
                    isClickToPauseDisabled
                />
            </Effect>
            <FullConponent>
                <FlowerViewSwiper>
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={1}
                        ref={SwiperRef}
                        modules={[Navigation, Pagination, EffectCoverflow, Scrollbar, A11y]}
                        effect="coverflow"
                        onSlideChange={(swiper) => {
                            refreshDate();
                            setPresentCount(swiper.activeIndex + 1);
                        }}
                        onSwiper={(swiper) => {
                            // console.log("onSwiper");
                            // console.log(swiper);
                        }}
                        navigation
                        centeredSlides={true}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true, dragSize: 30 }}

                    >
                        {(gardenList.length == 0 ? "등록된 꽃이 없어요. 꽃을 피워볼까요?" : gardenList)}
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