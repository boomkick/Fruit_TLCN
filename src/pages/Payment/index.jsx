import { useCallback, useEffect, useState } from "react";
import "./Payment.scss";
import { Grid, Typography, Box, Stack, Radio, RadioGroup } from "@mui/material";
import { groupByGiftCart, numWithCommas } from "../../constraints/Util";
import { useDispatch, useSelector } from "react-redux";
import ChooseAddress from "../../components/ChooseAddress";
import { Link, useNavigate } from "react-router-dom";
import apiCart from "../../apis/apiCart";
import { toast } from "react-toastify";
import { deleteAll } from "../../slices/cartSlice";
import Loading from "../../components/Loading";
import PaymentItem from "../../components/PaymentItem";
import PaymentGiftCart from "../../components/PaymentGiftCart";
import apiGiftCart from "../../apis/apiGiftCart";

function Payment() {
  const CartItems = useSelector((state) => state.cart.items);
  const paymentAddress = useSelector((state) => state.payment.address);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState("1");
  const [loading, setLoading] = useState(false);
  const [giftCartList, setGiftCartList] = useState([]);
  const [addresses, setAddresses] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Tính tổng giá tiền, phí vận chuyển, mã giảm giá nếu có
  const feeShip = 0;
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
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const [openAddress, setOpenAddress] = useState(false);
  const handleOpenAddress = useCallback(() => setOpenAddress(true), []);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);

  useEffect(() => {
    const getAddresses = () => {
      if (!CartItems || CartItems.length < 1) {
        navigate("/");
        toast.warning("Hãy thêm sản phẩm vào giỏ hàng trước");
      }
      if (!paymentAddress) {
        navigate("/my-account/address/add");
        toast.warning("Vui lòng thêm địa chỉ nhận hàng");
      }
    };
    getAddresses();
  }, []);

  const handleChangeTypePayment = (event) => {
    setPayment(event.target.value);
  };

  const finalPrice = () => {
    return totalPrice + feeShip > 0 ? Math.round(totalPrice + feeShip) : 0;
  };

  // Thanh toán
  const handleSubmit = () => {
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
      CityId: paymentAddress.city,
      DistrictId: paymentAddress.district,
      WardId: paymentAddress.ward,
      DetailLocation: paymentAddress.addressDetail,
      Name: paymentAddress.name,
      Phone: paymentAddress.phone,
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
                  {groupByGiftCart(giftCartList, CartItems)?.noGiftList?.map(
                    (item) => (
                      <PaymentItem data={item} />
                    )
                  )}
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
            <Box>
              <Box className="cart-summary">
                <Box py={1}>
                  <Box className="cart-summary__price">
                    <span>Tạm tính</span>
                    <span>{numWithCommas(totalPrice)} ₫</span>
                  </Box>
                  <Box className="cart-summary__price">
                    <span> Giảm giá</span>
                    <span style={{ color: "#00AB56" }}>
                      {numWithCommas(-0)} ₫
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
    </>
  );
}

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

export default Payment;
