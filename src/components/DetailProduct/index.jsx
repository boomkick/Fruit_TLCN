import React from "react";
import "./DetailProduct.scss";
import { Link } from "react-router-dom";
import {
  Box,
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QuantityButtons from "../../components/QuantityButtons";
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import FacebookIcon from '@mui/icons-material/Facebook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
//import img
import imgDefault from "../../assets/img/img_default.jpg";

function DetailProduct({ data }) {
  const list_cities = () => [
    { label: 'Ho Chi Minh', year: 1994 },
    { label: 'Ha Noi', year: 1972 },
    { label: 'Da Nang', year: 1974 },
    { label: 'Can Tho', year: 2008 },
    { label: 'Hai Phong', year: 1957 },
  ]
  return (
    <Box className="detailProduct">
                <Box className="detailProduct__img">
                    <div className="detailProduct__primary-img">
                        <img alt="" src={imgDefault}></img>
                    </div>
                    <div className="detailProduct__list-img">
                        <img className="detailProduct__item-img" alt="" src={imgDefault}></img>
                        <img className="detailProduct__item-img" alt="" src={imgDefault}></img>
                        <img className="detailProduct__item-img" alt="" src={imgDefault}></img>
                        <img className="detailProduct__item-img" alt="" src={imgDefault}></img>
                    </div>
                </Box>
                <Box className="detailProduct__general">
                    <div className="detailProduct__info">
                        <h3>{data?.name}</h3>
                        <div className="detailProduct__info-underline-title"></div>
                        <div className="detailProduct__info-price">
                            <h4 className="detailProduct__info-price-original">{data?.price}</h4>
                            <h4 className="detailProduct__info-price-sale">{data?.discount}</h4>
                        </div>
                        <div className="detailProduct__info-rate">
                            <div className="detailProduct__info-rate-star">
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                            </div>
                            <p> ({data?.rate} đánh giá)  |  Đã bán {data?.sold}</p>
                        </div>
                        <div className="detailProduct__info-shipping">
                            <p>
                                <LocalShippingIcon sx={{ fontSize: 20}}/>
                                <span> Bạn muốn vận chuyển đến?</span>
                            </p>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={list_cities()}
                                sx={{
                                    width: 220,
                                    fontSize: 18,
                                    my: 2
                                }}
                                renderInput={(params) => <TextField {...params} label="Chọn Tỉnh/ Thành phố" />}
                                />
                        </div>
                        <div className="detailProduct__quantity-info">
                            <QuantityButtons/>
                            <button className="detailProduct__add-to-cart" style={{ fontWeight: 600}}>THÊM VÀO GIỎ HÀNG</button>
                        </div>
                        <div className="detailProduct__info-guide">
                            <div style={{display: "flex", fontSize: "20px", lineHeight: "28px"}}>
                                <InfoIcon sx={{ fontSize: "20px", marginRight: "2px"}}/>
                                <p>Hướng dẫn cách đặt hàng trực tuyến</p>
                            </div>
                            <div style={{display: "flex", fontSize: "20px", lineHeight: "28px"}}>
                                <BookIcon sx={{ fontSize: "20px", marginRight: "2px"}}/>
                                <p>Câu hỏi thường gặp khi mua hàng</p>
                            </div>
                            <FacebookIcon sx={{
                                fontSize: "40px", 
                                marginTop: "20px",
                                cursor: "pointer"
                            }}/>
                        </div>
                    </div>
                    <div className="detailProduct__support">
                        <div className="detailProduct__support-box">
                            <div className="detailProduct__support-box-item">
                                <LocalShippingIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                            <div className="detailProduct__support-box-item">
                                <VolunteerActivismIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                            <div className="detailProduct__support-box-item">
                                <VolunteerActivismIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                        </div>
                        <div className="detailProduct__support-box">
                        <div className="detailProduct__support-box-item">
                                <VolunteerActivismIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                            <div className="detailProduct__support-box-item">
                                <VolunteerActivismIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
  );
}

export default DetailProduct;
