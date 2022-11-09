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
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ButtonGroup from '@mui/material/ButtonGroup';
import { toast } from "react-toastify";
import QuantityButtons from "../../components/QuantityButtons";
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import FacebookIcon from '@mui/icons-material/Facebook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
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

function ProductDetail() {
    const [product, setProduct] = useState({});

    let data = {
      name: "Capo Musedo – MC1",
      discount: "119,000",
      price: "140,000",
      rate: "5",
      sold: "235"
    };

    let list_comment = [
      {
        id:1,
        userName: "lethuyen",
        content: "Capo thiết kế cho cần đàn nhỏ của acoustic nên kẹp sướng lắm luôn, nhìn vừa sang vừa chất. Do hồi xưa mình mua nhầm 1 cái hàng fake nên giờ cầm vào cái của shop là thấy khác hẳn, đảm bảo xịn luôn. Shop hỗ trợ nhiệt tình, 10đ 😀",
        rating: 5,
        post_date: "05/11/2022"
      },
      {
        id:2,
        userName: "lethuyen",
        content: "Capo thiết kế cho cần đàn nhỏ của acoustic nên kẹp sướng lắm luôn, nhìn vừa sang vừa chất. Do hồi xưa mình mua nhầm 1 cái hàng fake nên giờ cầm vào cái của shop là thấy khác hẳn, đảm bảo xịn luôn. Shop hỗ trợ nhiệt tình, 10đ 😀",
        rating: 5,
        post_date: "05/11/2022"
      }
    ]

    return (
        <Box className= "container" style={{ backgroundColor: "#fff"}}>
            <DetailProduct data={data} />

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
                <SwiperSlide>
                  {/* <CardProduct data={item} /> */}
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
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
                <SwiperSlide>
                  {/* <CardProduct data={item} /> */}
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
              </Swiper>
            </Box>
        </Box>
    );
}
export default ProductDetail;