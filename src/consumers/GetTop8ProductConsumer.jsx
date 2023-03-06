import React from 'react';
import {
    GetTop8Product,
    GetTop8ProductLoading
} from "../providers/GetTop8ProductProvider"
import LoadingAPI from '../components/LoadingAPI';
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../components/CardProduct";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Stack, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const GetTop8ProductConsumer = () => {
    const Top8ProductData = React.useContext(GetTop8Product)
    const Top8ProductDataLoading = React.useContext(GetTop8ProductLoading)
    return (
        <LoadingAPI loading={Top8ProductDataLoading}>
              <Swiper
                slidesPerView={4}
                spaceBetween={0}
                slidesPerGroup={4}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {Top8ProductData ? Top8ProductData.map((item) => (
                    <SwiperSlide>
                        <CardProduct data={item} />
                    </SwiperSlide>
                )) : null}
              </Swiper>
            
        </LoadingAPI>
    )
}

export default React.memo(GetTop8ProductConsumer);