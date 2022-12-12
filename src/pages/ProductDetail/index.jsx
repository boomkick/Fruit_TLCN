import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgDefault from '../../assets/img/img_default.jpg'

import {
  Rating,
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  Modal,
  FormControlLabel,
  IconButton,
  Tooltip,
  Skeleton,

} from "@mui/material";
import "./ProductDetail.scss";
import StarIcon from '@mui/icons-material/Star';
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../../components/CardProduct";
// styles swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import apiMain from "../../apis/apiMain";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import DetailProduct from "../../components/DetailProduct"
import Comment from "../../components/Comment"
import apiProduct from "../../apis/apiProduct";

function ProductDetail() {
    const user = useSelector((state) => state.auth.user);
    const [product, setProduct] = useState();
    const [reviews, setReviews] = useState([]);
    const [top8Product, setTop8Product] = useState([]);
    const { id } = useParams();
    

    // Lấy dữ liệu top 8 sản phẩm
    useEffect(() => {
      const getTop8Product = async () => {
        const response = await apiProduct.getTop8Product();
        if (response) {
          setTop8Product(response.data);
        }
      };
      getTop8Product();

      const getProductDetail = async () => {
        const response = await apiProduct.getProductDetail(id);
        if (response) {
          setProduct(response.data);
        }
      };
      getProductDetail();

    }, []);

    // Lấy dữ liệu sản phẩm chi tiết
    // useEffect(() => {
    //   const getProductDetail = async () => {
    //     const response = await apiProduct.getProductDetail(id);
    //     if (response) {
    //       setProduct(response.data);
    //     }
    //   };
    //   getProductDetail();
    //   console.log(product)
    // }, []);

    // Lấy dữ liệu nhận xét sản phẩm

    let data = {
      name: "Lê Hàn Quốc",
      discount: "119,000",
      price: "140,000",
      rate: "5",
      sold: "235"
    };

    let list_comment = [
      {
        id:1,
        userName: "lethuyen",
        content: "Hồi xưa cũng đặt online mà hàng về là không thấy màu xanh giờ đặt của shop là thấy khác hẳn, đảm bảo xịn luôn. Shop hỗ trợ nhiệt tình, 10đ 😀",
        rating: 5,
        post_date: "05/11/2022"
      },
      {
        id:2,
        userName: "lethuyen",
        content: "Hồi xưa cũng đặt online mà hàng về là không thấy màu xanh giờ đặt của shop là thấy khác hẳn, đảm bảo xịn luôn. Shop hỗ trợ nhiệt tình, 10đ 😀",
        rating: 5,
        post_date: "05/11/2022"
      }
    ]

    return (
        <Box className= "container" style={{ backgroundColor: "#fff"}}>
            <DetailProduct data={product} />

            <Box sx={{
              width: "100%",
              padding: "0px 15px 30px",
              borderTop: "1px solid #ECECEC"
            }}>
                <Box className="detailProduct__title">
                  <h2>
                      {"Top sản phẩm bán chạy"}
                  </h2>
                </Box>
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
                style={{ borderTop: "1px solid #ECECEC" }}
              >
                {top8Product.map((item) => (
                <SwiperSlide>
                <CardProduct data={item}/>
                </SwiperSlide>
              ))}
              </Swiper>
            </Box>
            <Comment data={list_comment}/>
            <Box className="textComment">
                <p>Đánh giá của bạn về sản phẩm </p>
                <Box className="textComment__stars">
                  <Box className="textComment__stars-one">
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                  <Box className="textComment__stars-two">
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                  <Box className="textComment__stars-three">
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                  <Box className="textComment__stars-four">
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                  <Box className="textComment__stars-five">
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                </Box>
                <textarea className="textComment__textarea"/>
                <Button variant="contained" sx={{ backgroundColor: "black", textTransform: "uppercase", fontWeight: "400"}}>GỬI</Button>
            </Box>

        </Box>
    );
}
export default ProductDetail;