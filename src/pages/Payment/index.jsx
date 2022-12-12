import { useCallback, useEffect, useState } from "react";
import "./Payment.scss";
import {
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InfoIcon from "@mui/icons-material/Info";
import DiscountIcon from "@mui/icons-material/Discount";
import { numWithCommas } from "../../constraints/Util";
import { useDispatch, useSelector } from "react-redux";

import ChooseAddress from "../../components/ChooseAddress";
import { clearCoupon } from "../../slices/paymentSlice";
import { Link, useNavigate } from "react-router-dom";
import apiCart from "../../apis/apiCart";
import { toast } from "react-toastify";
import { deleteAll } from "../../slices/cartSlice";

import apiAddress from "../../apis/apiAddress";
// import apiNotify from '../../apis/apiNotify'
import Loading from "../../components/Loading";

function Payment() {
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const [openAddress, setOpenAddress] = useState(false);

  const [payment, setPayment] = useState("1");
  const [expandDetail, setExpandDetail] = useState(false);
  const [couponValue, setCouponValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const CartItems = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.payment.coupon);
  // const addresses = useSelector((state) => state.payment.address);
  const [addresses, setAddresses] = useState();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feeShip = 15000;

  useEffect(() => {
    const calcPrice = () => {
      const total = CartItems.reduce(
        (t, num) => t + num.price * num.quantity,
        0
      );
      setTotalPrice(total);
    };
    calcPrice();
  }, [CartItems]);

  useEffect(() => {
    const getAddresses = () => {
      apiAddress
        .getProfileUser()
        .then((res) => {
          setAddresses(res.data.user.address);
          console.log(res.data.user.address);
        })
        .catch(() => {
          navigate("/my-account/address/create");
          toast.warning("Vui lòng thêm địa chỉ mới");
        });
    };
    getAddresses();
  }, []);

  useEffect(() => {
    const handle = () => {
      if (coupon) {
        let value = 0;
        if (coupon.unit === "đ") {
          value = coupon.value;
        } else {
          if (totalPrice > 0) value = (coupon.value * totalPrice) / 100;
        }
        setCouponValue(value);
      }
    };
    handle();
  }, [coupon, totalPrice]);

  useEffect(() => {
    const loadTitle = () => {
      document.title = "Đơn hàng của tôi";
    };
    loadTitle();
  }, []);

  const handleChangeTypePayment = (event) => {
    setPayment(event.target.value);
  };

  const handleExpand = () => {
    setExpandDetail((pre) => !pre);
  };

  const handleOpenAddress = useCallback(() => setOpenAddress(true), []);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);

  const finalPrice = () => {
    return totalPrice + feeShip - (couponValue || 0) > 0
      ? Math.round(totalPrice + feeShip - (couponValue || 0))
      : 0;
  };

  const handleSubmit = () => {
    if (loading) {
      toast.info(
        "Thanh toán đang được thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }

    // if (!addressShip) {
    //   toast.warning("Vui lòng chọn địa chỉ giao hàng");
    //   return;
    // }

    // const payload = {
    //   CartItems.map((item) => {
    //     return {
    //       productId: item.id,
    //       productName: item.name,
    //       productImage: item.imageList[0].url,
    //       quantity: item.quantity,
    //       price: item.price,
    //     };
    //   }),
    // };

    let payload = CartItems.map((item) => {
      return {
        productId: item.id,
        productName: item.name,
        productImage: item.imageList[0].url,
        quantity: item.quantity,
        price: item.price,
      };
    });

    setLoading(true);
    if (payment == 2) {
      apiCart
        .saveOrderPayPal(payload)
        .then((res) => {
          toast.success("Đặt hàng thành công!");
          dispatch(deleteAll());
          // navigate(res.data.link);
          window.location.assign(res.data.link);
        })
        .catch((error) => {
          toast.error("Đặt hàng không thành công. Vui lòng thử lại");
        })
        .finally(() => {
          setLoading(false);
        });

    } else {
      apiCart
        .saveOrderCOD(payload)
        .then((res) => {
          toast.success("Đặt hàng thành công!");
          dispatch(deleteAll());
          navigate("/my-account/orders");
        })
        .catch((error) => {
          toast.error("Đặt hàng không thành công. Vui lòng thử lại");
        })
        .finally(() => {
          setLoading(false);
        });

    }
  };

  // const handleCancel = (id) => {
  //   let params = {
  //     //...order,
  //     type: {
  //       id: orderTabs[5].id,
  //       name: orderTabs[5].type,
  //     },
  //   };
  //   apiCart
  //     .changeTypeOrder(params, id)

  // }

  return (
    <>
      <Box className="container">
        <Grid container spacing={2} mt="24px">
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Box bgcolor="#fff" p={2}>
              <Box mb={2}>
                <Stack direction={"row"} spacing={68.5}>
                  <Typography
                    className="payment__title"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Sản phẩm
                  </Typography>
                  <Typography
                    className="payment__title"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Tổng cộng
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    borderTop: "1px solid #bfbfbf",
                    width: "90%",
                    paddingBottom: "20px",
                  }}
                ></Box>
                <Stack className="payment__listItem">
                  {CartItems.map((item) => (
                    <Stack
                      key={item?.id}
                      direction="row"
                      className="orderDetail__item"
                      p={1}
                    >
                      <Box mr={1.875}>
                        <img
                          height="60px"
                          width="60px"
                          src={item?.imageList[0]?.url}
                          alt=""
                        />
                      </Box>
                      <Stack
                        spacing={1.5}
                        width="100%"
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Link to={"/"}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {item?.name} x {item?.quantity}
                          </Typography>
                        </Link>

                        {/* <Typography fontSize="14px" color="#888">
                          SL:{item?.quantity}
                        </Typography> */}
                        <Typography fontSize="14px" color="#888">
                          {numWithCommas(item?.quantity * item?.price || 0)} đ
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box className="cart__address">
              <Stack direction="row" mb={1.5} justifyContent="space-between">
                <Typography
                  style={{ fontSize: "16px", fontWeight: 500, color: "#888" }}
                >
                  Giao tới
                </Typography>
                <Typography
                  onClick={handleOpenAddress}
                  color="#1890ff"
                  sx={{ cursor: "pointer" }}
                >
                  Thay đổi
                </Typography>
              </Stack>
              {addresses && (
                <>
                  <Typography mb={0.25} fontWeight={500}>
                    {addresses.name}&nbsp;&nbsp;&nbsp;{addresses.phone}
                  </Typography>
                  <Typography color="#888">{`${addresses.addressDetail}, ${addresses.commune.name}, ${addresses.district.name}, ${addresses.province.name}`}</Typography>
                </>
              )}
            </Box>

            <Box
              sx={{
                backgroundColor: "#fff",
                marginBottom: "20px",
                padding: "16px",
              }}
            >
              <Typography
                className="payment__title"
                gutterBottom
                variant="h5"
                component="div"
              >
                Chọn hình thức thanh toán
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={payment}
                onChange={handleChangeTypePayment}
              >
                {paymentMethods.map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    alignItems="center"
                    sx={{ height: "64px" }}
                  >
                    <Radio
                      name="payment"
                      id={String(item.id)}
                      value={item.value}
                      sx={{ padding: 0, marginRight: "8px" }}
                    />
                    <img
                      alt=""
                      width="32px"
                      height="32px"
                      style={{ marginRight: "12px" }}
                      src={item.image}
                    ></img>
                    <label htmlFor={item.id}>
                      <Typography sx={{ margin: "auto 0" }}>
                        {item.display}
                      </Typography>
                    </label>
                  </Stack>
                ))}
              </RadioGroup>
            </Box>

            {/* <Box className='cart-coupon'>
            <Box className="cart-coupon__title">
              Tiki Khuyến mãi
            </Box>
            {
              coupon &&
              <Box className="cart-coupon__item">
                <svg className="cart-coupon__bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286 60"><g fill="none" fillRule="evenodd"><g stroke="#017FFF"><g><g><g><g><g><path fill="#E5F2FF" d="M 278 0.5 c 2.071 0 3.946 0.84 5.303 2.197 c 1.358 1.357 2.197 3.232 2.197 5.303 h 0 v 44 c 0 2.071 -0.84 3.946 -2.197 5.303 c -1.357 1.358 -3.232 2.197 -5.303 2.197 h 0 H 64.973 c -0.116 -1.043 -0.587 -1.978 -1.291 -2.682 c -0.814 -0.814 -1.94 -1.318 -3.182 -1.318 c -1.243 0 -2.368 0.504 -3.182 1.318 c -0.704 0.704 -1.175 1.64 -1.29 2.682 h 0 h -48.028 c -2.071 0 -3.946 -0.84 -5.303 -2.197 c -1.358 -1.357 -2.197 -3.232 -2.197 -5.303 h 0 V 8 c 0 -2.071 0.84 -3.946 2.197 -5.303 c 1.357 -1.358 3.232 -2.197 5.303 -2.197 h 48.027 c 0.116 1.043 0.587 1.978 1.291 2.682 c 0.814 0.814 1.94 1.318 3.182 1.318 c 1.243 0 2.368 -0.504 3.182 -1.318 c 0.704 -0.704 1.175 -1.64 1.29 -2.682 H 64.972 z" transform="translate(-1024 -2912) translate(80 2252) translate(0 460) translate(464) translate(480) translate(0 200)"></path><g strokeDasharray="2 4" strokeLinecap="square"><path d="M0.5 0L0.5 48" transform="translate(-1024 -2912) translate(80 2252) translate(0 460) translate(464) translate(480) translate(0 200) translate(60 8)"></path></g></g></g></g></g></g></g></g></svg>
                <Box className="cart-coupon__content">
                  <Box p={1}>
                    <img src={coupon.img} alt="" />
                  </Box>
                  <Box className="cart-coupon__right">
                    <Typography fontSize="13px" fontWeight="500">{`Giảm ${(couponValue || 0) / 1000}K`}</Typography>
                    <Box>
                      <InfoIcon sx={{ color: "#1890ff" }} />
                      <Button onClick={unchooseCoupon} className="cart-coupon__unchoose" variant="contained">Bỏ chọn</Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            }
            <Box onClick={handleOpen} className="cart-coupon__showmore">
              <DiscountIcon sx={{ height: "18px", color: "#0b74e5" }} /> Chọn hoặc nhập Mã Khuyến Mãi khác
            </Box>
          </Box> */}

            <Box>
              <Box className="cart-summary">
                <Box py={1}>
                  <Box className="cart-summary__price">
                    <span>Tạm tính</span>
                    <span>{numWithCommas(totalPrice)} ₫</span>
                  </Box>
                  <Box className="cart-summary__price">
                    <span>Phí vận chuyển</span>
                    <span>{numWithCommas(feeShip)} ₫</span>
                  </Box>
                  <Box className="cart-summary__price">
                    <span> Giảm giá</span>
                    <span style={{ color: "#00AB56" }}>
                      {numWithCommas(-(couponValue || 0))} ₫
                    </span>
                  </Box>
                  <Box className="cart-summary__divider"></Box>
                  <Box className="cart-summary__price">
                    <span>Tổng tiền</span>
                    <Box className="cart-summary__valueprice">
                      <span>{numWithCommas(finalPrice())} ₫</span>
                      <span>(Đã bao gồm VAT nếu có)</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* <Button
                variant="contained"
                onClick={handleSubmitOrderFake}
                sx={{
                  width: "100%",
                  height: "42px",
                  backgroundColor: "#ff424e",
                  "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" },
                }}
              >
                {loading && <Loading />} Mua hàng
              </Button> */}
              <button
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  height: "42px",
                  fontWeight: 600,
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "1em",
                  lineHeight: "38px",
                  padding: "0 18px",
                  marginBottom: "15px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                {loading && <Loading />} Mua hàng
              </button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* <ChooseCoupon handleOpen={handleOpen} handleClose={handleClose} open={open} /> */}
      <ChooseAddress
        handleOpen={handleOpenAddress}
        handleClose={handleCloseAddress}
        open={openAddress}
      />
    </>
  );
}

const paymentMethods = [
  {
    id: "1",
    display: "Thanh toán tiền mặt khi nhận hàng",
    value: "1",
    image:
      "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg",
  },
  {
    id: "2",
    display: "Thanh toán bằng PayPal",
    value: "2",
    image:
      "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015__480.png",
  },
];

export default Payment;
