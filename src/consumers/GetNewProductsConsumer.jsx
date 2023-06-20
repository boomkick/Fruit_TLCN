import React from "react";
import {
  GetNewProducts,
  GetNewProductsLoading,
} from "../providers/GetNewProductsProvider";
import LoadingAPI from "../components/LoadingAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../components/CardProduct";
import { Pagination } from "swiper";

const GetNewProductsConsumer = () => {
  const NewProductsData = React.useContext(GetNewProducts);
  const NewProductsDataLoading = React.useContext(GetNewProductsLoading);
  return (
    <LoadingAPI loading={NewProductsDataLoading}>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {NewProductsData
          ? NewProductsData.map((item) => (
              <SwiperSlide>
                <CardProduct data={item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </LoadingAPI>
  );
};

export default React.memo(GetNewProductsConsumer);
