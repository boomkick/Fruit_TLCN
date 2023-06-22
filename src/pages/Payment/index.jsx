import { useCallback, useEffect, useState } from "react";
import "./Payment.scss";
import { Grid, Typography, Box, Stack, Radio, RadioGroup } from "@mui/material";
import {
  formatDateTime,
  groupByGiftCart,
  numWithCommas,
  roundPrice,
} from "../../constraints/Util";
import { useDispatch, useSelector } from "react-redux";
import ChooseAddress from "../../components/ChooseAddress";
import { useNavigate } from "react-router-dom";
import apiCart from "../../apis/apiCart";
import { toast } from "react-toastify";
import { deleteAll } from "../../slices/cartSlice";
import Loading from "../../components/Loading";
import PaymentItem from "../../components/PaymentItem";
import PaymentGiftCart from "../../components/PaymentGiftCart";
import apiGiftCart from "../../apis/apiGiftCart";
import apiGHNAddress from "../../apis/apiGHNAddress";
import ChangeButton from "../../components/Button/ChangeButton";
import { GetGHNProvinceByIdProvider } from "../../providers/GetGHNProvincesProvider";
import { GetGHNDistrictByIdProvider } from "../../providers/GetGHNDistrictsProvider";
import { GetGHNWardByIdProvider } from "../../providers/GetGHNWardsProvider";
import { PaymentAddress } from "./PaymentAddress";

const paymentMethods = [
  {
    id: "0",
    display: "Thanh toán tiền mặt khi nhận hàng",
    value: "0",
    image:
      "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg",
  },
  {
    id: "1",
    display: "Thanh toán bằng Momo",
    value: "1",
    image: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
  },
];

const shippingFeePayerOptions = [
  {
    id: "2",
    display: "Trả phí khi nhận hàng",
    value: "2",
    image:
      "https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Orange.png",
  },
  {
    id: "1",
    display: "Trả phí qua Momo",
    value: "1",
    image: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
  },
];

const serviceTypeFee = {
  1: 1.5,
  2: 1.2,
  3: 1,
};

const serviceTypeTime = {
  1: 1,
  2: 1.25,
  3: 1.7,
};

const PromotionTypeEnum = {
  PRCIE: 0,
  PERCENTAGE: 1,
};

function Payment() {
  const CartItems = useSelector((state) => state.cart.items);
  const paymentAddress = useSelector((state) => state.payment.address);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState("1");
  const [shippingFeePayer, setShippingFeePayer] = useState("1");
  const [loading, setLoading] = useState(false);
  const [giftCartList, setGiftCartList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Tính tiền giảm giá
  const [totalPromotionPrice, setTotalPromotionPrice] = useState(0);
  const handleGetPromotionPriceItem = useCallback((item) => {
    if (
      Number(item.product?.promotion.type) === PromotionTypeEnum.PRCIE.valueOf()
    ) {
      return item.product?.promotion.value;
    } else {
      const percent = item.product?.promotion.value / 100;
      return item.product?.price * percent;
    }
  }, []);

  useEffect(() => {
    if (CartItems.length > 0) {
      let totalPromotion = CartItems.reduce((total, item) => {
        if (item.product?.promotion) {
          return total + handleGetPromotionPriceItem(item);
        }
        return total;
      }, 0);
      setTotalPromotionPrice(totalPromotion);
    }
  }, [CartItems, handleGetPromotionPriceItem]);

  // Tính tiền phí ship giao hàng của GHN
  const [shippingFee, setShippingFee] = useState(0);
  useEffect(() => {
    const handleGetFeeShip = async () => {
      const totalQuantity = CartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const paramsFeeShip = {
        service_id: 53320,
        service_type_id: 2,
        to_district_id: paymentAddress.district,
        to_ward_code: paymentAddress.ward,
        height: totalQuantity,
        length: totalQuantity,
        weight: totalQuantity * 250,
        width: totalQuantity,
      };

      if (CartItems.length > 0) {
        await apiGHNAddress
          .postShippingOrderFee(paramsFeeShip)
          .then((res) => {
            setShippingFee(
              roundPrice(
                res?.data?.total *
                  (serviceTypeFee[paymentAddress.serviceType.toString()] || 1)
              )
            );
          })
          .catch();
      }
    };
    if (paymentAddress) handleGetFeeShip();
  }, [CartItems, paymentAddress]);

  // Tính thời gian vận chuyển, thời gian này là timestamp
  const [shippingTime, setShippingTime] = useState(0);
  useEffect(() => {
    const handleGetTimeShip = async () => {
      const paramsTimeShip = {
        service_id: 53320,
        to_district_id: paymentAddress.district,
        to_ward_code: paymentAddress.ward,
      };

      if (CartItems.length > 0) {
        await apiGHNAddress
          .postShippingOrderTime(paramsTimeShip)
          .then((res) => {
            const timeNow = Math.round(Date.now() / 1000);
            const timeShipping = res?.data?.leadtime - timeNow;
            const heSo =
              serviceTypeTime[paymentAddress.serviceType.toString()] || 1;
            setShippingTime(new Date((timeShipping * heSo + timeNow) * 1000));
          })
          .catch();
      }
    };
    if (paymentAddress) handleGetTimeShip();
  }, [CartItems, paymentAddress]);

  // Tính tổng giá tiền, phí vận chuyển, mã giảm giá nếu có
  useEffect(() => {
    const handleGetData = async () => {
      await apiGiftCart
        .getCurrentGiftCart()
        .then((res) => {
          setGiftCartList(res?.data);
        })
        .catch((error) => {
          toast.error(error.toString());
        });

      // setData(groupByGiftCart(giftCartList, cart));
    };
    handleGetData();

    const calcPrice = () => {
      const total = CartItems.reduce(
        (t, item) => t + item.product.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };
    calcPrice();
  }, [CartItems]);

  // Địa chỉ nhận hàng
  const [openAddress, setOpenAddress] = useState(false);
  const handleOpenAddress = useCallback(() => setOpenAddress(true), []);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);

  useEffect(() => {
    const getAddresses = () => {
      if (!CartItems || CartItems.length < 1) {
        navigate("/");
        toast.warning("Hãy thêm sản phẩm vào giỏ hàng trước");
      }
    };
    getAddresses();
  }, []);

  const handleChangeTypePayment = (event) => {
    setPayment(event.target.value);
    if (event.target.value == 0) setShippingFeePayer("2");
  };

  const handleChangeTypeShippingFeePayer = (event) => {
    setShippingFeePayer(event.target.value);
  };

  const finalPrice = useCallback(() => {
    return totalPrice + shippingFee > 0
      ? Math.round(totalPrice + shippingFee - totalPromotionPrice)
      : 0;
  }, [totalPrice, shippingFee, totalPromotionPrice]);

  // Thanh toán
  const handleSubmit = () => {
    if (!paymentAddress) {
      toast.info(
        "Vui lòng nhập thông tin địa chỉ nhận hàng!"
      );
      return;
    }
    if (loading) {
      toast.info(
        "Thanh toán đang được thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    let payload = {};
    let listCartDetail = {
      listCartDetailId: CartItems.map((item) => {
        return item.id;
      }),
    };
    payload = {
      CityId: paymentAddress.city.toString(),
      DistrictId: paymentAddress.district.toString(),
      WardId: paymentAddress.ward,
      DetailLocation: paymentAddress.addressDetail,
      Name: paymentAddress.name,
      Phone: paymentAddress.phone,
      ServiceType: paymentAddress.serviceType,
      ShippingFeePayer: Number(shippingFeePayer),
      paymentMethod: 0,
      ...listCartDetail,
    };

    setLoading(true);
    if (payment == 1) {
      payload.paymentMethod = 1;
      apiCart
        .postPayment(payload)
        .then((res) => {
          toast.success("Đặt hàng thành công!");
          dispatch(deleteAll());
          const url = res?.data?.paymentUrl;
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          document.body.appendChild(link);
          link.click();
          navigate("/my-account/orders");
        })
        .catch((error) => {
          toast.error("Đặt hàng không thành công. Vui lòng thử lại");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      apiCart
        .postPayment(payload)
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

  return (
    <>
      <GetGHNProvinceByIdProvider ProvinceId={paymentAddress?.city}>
        <GetGHNDistrictByIdProvider
          ProvinceId={paymentAddress?.city}
          DistrictId={paymentAddress?.district}
        >
          <GetGHNWardByIdProvider
            DistrictId={paymentAddress?.district}
            WardId={paymentAddress?.ward}
          >
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
                        {groupByGiftCart(
                          giftCartList,
                          CartItems
                        )?.noGiftList?.map((item) => (
                          <PaymentItem data={item} />
                        ))}
                      </Stack>
                    </Box>
                  </Box>

                  {groupByGiftCart(giftCartList, CartItems)?.giftCartList?.map(
                    (item) => (
                      <PaymentGiftCart data={item} />
                    )
                  )}
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <Box className="cart__address">
                    <Stack
                      direction="row"
                      mb={1.5}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#888",
                        }}
                      >
                        Giao tới
                      </Typography>
                      <ChangeButton handleChange={handleOpenAddress} />
                    </Stack>
                    <PaymentAddress />
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
                  {payment == 1 ? (
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
                        Phí shipping
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={shippingFeePayer}
                        onChange={handleChangeTypeShippingFeePayer}
                      >
                        {shippingFeePayerOptions.map((item) => (
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
                  ) : null}

                  <Box>
                    <Box className="cart-summary">
                      <Box py={1}>
                        <Box className="cart-summary__price">
                          <span>Dự kiến giao hàng: </span>
                          <span>
                            {formatDateTime(shippingTime || Date.now())}
                          </span>
                        </Box>
                        <Box className="cart-summary__divider"></Box>
                        <Box className="cart-summary__price">
                          <span>Tạm tính</span>
                          <span>{numWithCommas(totalPrice)} ₫</span>
                        </Box>
                        <Box className="cart-summary__price">
                          <span> Giảm giá</span>
                          <span style={{ color: "#00AB56" }}>
                            {numWithCommas(totalPromotionPrice || 0)} ₫
                          </span>
                        </Box>
                        <Box className="cart-summary__price">
                          <span> Phí giao hàng</span>
                          <span style={{ color: "#00AB56" }}>
                            {numWithCommas(shippingFee)} ₫
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
            <ChooseAddress
              handleOpen={handleOpenAddress}
              handleClose={handleCloseAddress}
              open={openAddress}
            />
          </GetGHNWardByIdProvider>
        </GetGHNDistrictByIdProvider>
      </GetGHNProvinceByIdProvider>
    </>
  );
}

export default Payment;
