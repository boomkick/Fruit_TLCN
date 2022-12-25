import React from "react";
import "./DetailProduct.scss";
import { Link } from "react-router-dom";
import {
  Box,
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import FacebookIcon from '@mui/icons-material/Facebook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AppleIcon from '@mui/icons-material/Apple';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
//import img
import imgProduct from "../../assets/img/product_le_han_quoc.jpg";
import apiCart from "../../apis/apiCart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { productUnit, productStatus } from "../../constraints/Product";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function DetailProduct({ data }) {
    const user = useSelector((state) => state.auth.user);
    const status = productStatus.find((item) => item.id == data?.status)
    const [quantity, setQuantity] = React.useState(1);

    const list_cities = () => [
    { label: 'Ho Chi Minh', year: 1994 },
    { label: 'Ha Noi', year: 1972 },
    { label: 'Da Nang', year: 1974 },
    { label: 'Can Tho', year: 2008 },
    { label: 'Hai Phong', year: 1957 },
  ]

  async function handleClickAddItem() {
    let param = {
        productId: data?.id,
        quantity: quantity
    }
    await apiCart.postCart(param)
    .then((res) => {
        toast.success("Đã thêm sản phẩm thành công")
    })
    .catch((error => {
        toast.error(error.toString())
    }))

  }

  function handleStatusProduct(status) {
    if(status?.id == 0) {
        return (
            <>
                <AddShoppingCartIcon style={{color: "#49A94D"}}/>
                <p>{status?.text}</p>
            </>
        )
    }else if (status?.id == 1) {
        return (
            <>
                <ProductionQuantityLimitsIcon style={{color: "E40100"}}/>
                <p>{status?.text}</p>
            </>
        )
    }else {
        return (
            <>
                <RemoveShoppingCartIcon style={{color: "E40100"}}/>
                <p>{status?.text}</p>
            </>
        )
    }
  }

  return (
    <Box className="detailProduct">
                <Box className="detailProduct__img">
                    <div className="detailProduct__primary-img">
                        <img alt="" src={data?.productImages[0]?.url}></img>
                    </div>
                    <div className="detailProduct__list-img">
                        {
                            data?.productImages.length > 0 ? data?.productImages.map((item) => (
                                <img className="detailProduct__item-img" alt="" src={item?.url}></img>
                            )) : <></>
                        }
                    </div>
                </Box>
                <Box className="detailProduct__general">
                    <div className="detailProduct__info">
                        <h3>{data?.name}</h3>
                        <div className="detailProduct__info-underline-title"></div>
                            { data?.discount ? (
                                <div className="detailProduct__info-price">
                                    <h4 className="detailProduct__info-price-original">{data?.price}đ</h4>
                                    <h4 className="detailProduct__info-price-sale">{data?.discount}đ</h4>
                                </div>
                            ) : (
                                <div className="detailProduct__info-price">
                                    <h4 className="detailProduct__info-price-sale">{data?.price}đ</h4>
                                </div>
                            )}
                        <div className="detailProduct__info-rate">
                            <div className="detailProduct__info-rate-star">
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                            </div>
                            <p> ({data?.rate} đánh giá)</p>
                        </div>
                        {/* <div className="detailProduct__info-shipping">
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
                        </div> */}
                        <div className="detailProduct__info-general">
                            <div>
                                <p className="detailProduct__info-general-text">Đơn vị :</p>
                                <p className="detailProduct__info-general-text">Giá trị tối thiểu :</p>
                                <p className="detailProduct__info-general-text">Mô tả :</p>
                            </div>
                            <div >
                                <p className="detailProduct__info-general-text">{productUnit.find(item => item.id == data?.unit)?.text}</p>
                                <p className="detailProduct__info-general-text">{data?.unit == 0 ? `${data?.minPurchase} kilogram`: `${data?.minPurchase} phần`}</p>
                                <p className="detailProduct__info-general-text">{data?.description}</p>
                            </div>
                        </div>
                        <div className="detailProduct__status">
                            {status?.id != 0 ? <></> : 
                            <>
                                <ButtonGroup size="small" aria-label="small outlined button group" className="quantity-buttons" style={{height: "40px"}}>
                                    <Button onClick={() => {(quantity > 0) ? setQuantity(quantity - 1) : setQuantity(0)}}>-</Button>
                                    <Button >{quantity}</Button>
                                    <Button onClick={() => {setQuantity(quantity + 1)}}>+</Button>
                                </ButtonGroup>
                                <button 
                                    className="detailProduct__add-to-cart" 
                                    style={{ fontWeight: 600, cursor: "pointer"}}
                                    onClick={handleClickAddItem}
                                >THÊM VÀO GIỎ HÀNG</button>
                            </>}
                            {/* <ButtonGroup size="small" aria-label="small outlined button group" className="quantity-buttons" style={{height: "40px"}}>
                                <Button onClick={() => {(quantity > 0) ? setQuantity(quantity - 1) : setQuantity(0)}}>-</Button>
                                <Button >{quantity}</Button>
                                <Button onClick={() => {setQuantity(quantity + 1)}}>+</Button>
                            </ButtonGroup>
                            <button 
                                className="detailProduct__add-to-cart" 
                                style={{ fontWeight: 600, cursor: "pointer"}}
                                onClick={handleClickAddItem}
                            >THÊM VÀO GIỎ HÀNG</button> */}
                            <div className="detailProduct__status-info">
                                {handleStatusProduct(status)}
                            </div>
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
                                <p>Nhận hàng, kiểm tra, thanh toán tận tay</p>
                            </div>
                            <div className="detailProduct__support-box-item">
                                <AppleIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Sản phẩm tươi và sạch, luôn đảm bảo chất lượng cho người dùng</p>
                            </div>
                        </div>
                        <div className="detailProduct__support-box">
                        <div className="detailProduct__support-box-item">
                                <PhoneIphoneIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Hotline đặt hàng
                                093 471 0592
                                (Làm việc cả T7, CN)</p>
                            </div>
                            <div className="detailProduct__support-box-item">
                                <FacebookIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Hỗ trợ qua Facebook Messenger</p>
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
  );
}

export default DetailProduct;
