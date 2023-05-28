import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-toastify";
import {
  groupByGiftCartWithCartDetails,
  numWithCommas,
} from "../../../../constraints/Util";
import { paymentMethod } from "../../../../constraints/PaymentMethod";
import apiLocation from "../../../../apis/apiLocation";

function DetailOrder() {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  // Thông tin giá trị đơn hàng
  const [billWithoutDiscount, SetBillWithoutDiscount] = useState(0);
  const [discount, SetDiscount] = useState(0);

  // Thông tin đơn hàng, trọng lượng, chiều dài, cao, rộng
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    const getData = async () => {
      await apiCart
        .getProcessCart({ id: id })
        .then((res) => {
          setOrder(res.data);
          if (res.data?.cartDetails) {
            let realBill = 0;
            let sumaryBill = 0;
            res.data?.cartDetails.forEach((item) => {
              realBill += item?.product?.price * item?.quantity;
              sumaryBill += item?.price * item?.quantity;
            });
            SetBillWithoutDiscount(realBill);
            SetDiscount(realBill - sumaryBill);
          }
          setProducts(groupByGiftCartWithCartDetails(res.data?.cartDetails));
        })
        .catch((error) => {
          setOrder(null);
          toast.warning("Không tìm thấy đơn hàng");
        });
    };
    getData();
  }, []);

  const handleComfirm = () => {
    let params = {
      processDescription: "",
      status: 1,
      weight: weight,
      length: length,
      width: width,
      height: height,
    };
    if (weight && length && width && height) {
      apiCart
        .putProcessCart(params, id)
        .then((res) => {
          toast.success("Xác nhận thành công");
          navigate("/employee/order");
        })
        .catch((error) => {
          toast.error("Xác nhận không thành công");
        });
    } else toast.info("Vui lòng nhập đầy đủ thông tin.");
  };
  const handleCancel = () => {
    apiCart
      .getCancelCart(id)
      .then((res) => {
        toast.success("Hủy đơn thành công");
        navigate("/employee/order");
      })
      .catch((error) => {
        toast.error("Hủy đơn không thành công");
      });
  };

  // Lấy dữ liệu dịa chỉ
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  useEffect(() => {
    const getLocation = () => {
      const params = {
        cityId: order?.cityId,
        districtId: order?.districtId,
        wardId: order?.wardId,
      };
      apiLocation.getCityById(params).then((res) => {
        setCity(res.data);
      });
      apiLocation.getDistrictByCityIdDistrictId(params).then((res) => {
        setDistrict(res.data);
      });
      apiLocation.getWardByIdCityIdDistrictIdWardId(params).then((res) => {
        setWard(res.data);
      });
    };
    if (order?.cityId && order?.districtId && order?.wardId) {
      getLocation();
    }
  }, [order]);

  // Chuyển trang về sản phẩm để thêm nhận xét
  const handleWriteReview = (event, idProduct) => {
    navigate(`/product-detail/${idProduct}`);
  };

  return (
    <Box>
      <Stack bgcolor="white" p={2}>
        <Typography mt={2.5} mx={2} fontSize="22px" fontWeight={300}>
          Chi tiết đơn hàng {order?.id}
        </Typography>
        <Typography sx={{ fontSize: "13px", textAlign: "end" }}>
          Ngày đặt hàng: {order?.createdDate}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        mt={1.25}
        mb={2.5}
        className="detailOrder"
        jutifyContent="space-between"
        mx={2}
      >
        <Stack className="detailOrder__boxInfo">
          <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography style={{ color: "#000", fontWeight: 500 }}>
              {order?.name}
            </Typography>
            <Typography>
              Địa chỉ:{" "}
              {`${city?.name}, ${district?.name},
                                  ${ward?.name},
                                  ${order?.detailLocation}`}
            </Typography>
            <Typography>Điện thoại: {order?.phone}</Typography>
          </Box>
        </Stack>

        <Stack className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC GIAO HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>
              <img
                width="56px"
                height="16px"
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-VN.png"
                alt=""
              />
              {order?.shipping ? order?.shipping : "Giao hàng nhanh"}
            </Typography>
            <Typography>
              Phí vận chuyển: {order?.feeShip ? order?.feeShip : "15000"}đ
            </Typography>
          </Box>
        </Stack>
        <Stack className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC THANH TOÁN</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>
              {
                paymentMethod.find(
                  (item) => item.id == order?.bill?.paymentMethod
                )?.text
              }
            </Typography>
            <Typography style={{ color: "#fda223" }}>
              {order?.bill?.purchaseDate
                ? order?.bill?.purchaseDate
                : "Chưa thanh toán"}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack className="detailOrder-Table">
        <Stack direction="row" className="detailOrder-Table__heading">
          <Box>Sản phẩm</Box>
          <Box>Giá</Box>
          <Box>Số lượng</Box>
          <Box>Giảm giá</Box>
          <Box>Tạm tính</Box>
        </Stack>
        {products?.noGiftList?.map((item) => (
          <Stack
            key={item?.id}
            direction="row"
            className="detailOrder-Table__row"
          >
            <Stack direction="row" className="orderDetail__item">
              <Box mr={1.875}>
                <img
                  height="60px"
                  width="60px"
                  src={item?.product?.image?.url}
                  alt=""
                />
              </Box>
              <Stack spacing={1.5}>
                <Link
                  to={
                    item?.product?.id
                      ? `/product-detail/${item?.product?.id}`
                      : ""
                  }
                >
                  <Typography fontSize="14px">{item?.product?.name}</Typography>
                </Link>
                <Typography fontSize="13px">
                  ID product in bill: {item?.id}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    sx={{
                      fontSize: "12px",
                      width: "102px",
                      height: "30px",
                      padding: 0,
                    }}
                    onClick={(event) => {
                      handleWriteReview(event, item?.product?.id);
                    }}
                  >
                    Viết nhận xét
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Box>{numWithCommas(item.product.price || 0)}₫</Box>
            <Box>{numWithCommas(item.quantity || 0)}</Box>
            <Box>
              {numWithCommas(
                (item.product.price - item.price) * item.quantity || 0
              )}{" "}
              ₫
            </Box>
            <Box>{numWithCommas(item.price * item.quantity || 0)} ₫</Box>
          </Stack>
        ))}
      </Stack>
      {/* Sản phẩm theo giỏ quà */}
      {products?.giftCartList?.map((giftCart) => (
        <Stack className="detailOrder-Table">
          <Stack direction="row" className="detailOrder-Table__heading">
            <Box>{giftCart?.name}</Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
          </Stack>
          {giftCart?.cartDetails?.map((item) => (
            <Stack
              key={item?.id}
              direction="row"
              className="detailOrder-Table__row"
            >
              <Stack direction="row" className="orderDetail__item">
                <Box mr={1.875}>
                  <img
                    height="60px"
                    width="60px"
                    src={item?.product?.image?.url}
                    alt=""
                  />
                </Box>
                <Stack spacing={1.5}>
                  <Link
                    to={
                      item?.product?.id
                        ? `/product-detail/${item?.product?.id}`
                        : ""
                    }
                  >
                    <Typography fontSize="14px">
                      {item?.product?.name}
                    </Typography>
                  </Link>
                  <Typography fontSize="13px">
                    ID product in bill: {item?.id}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: "12px",
                        width: "102px",
                        height: "30px",
                        padding: 0,
                      }}
                      onClick={(event) => {
                        handleWriteReview(event, item?.product?.id);
                      }}
                    >
                      Viết nhận xét
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
              <Box>{numWithCommas(item.product.price || 0)}₫</Box>
              <Box>{numWithCommas(item.quantity || 0)}</Box>
              <Box>
                {numWithCommas(
                  (item.product.price - item.price) * item.quantity || 0
                )}{" "}
                ₫
              </Box>
              <Box>{numWithCommas(item.price * item.quantity || 0)} ₫</Box>
            </Stack>
          ))}
        </Stack>
      ))}
      {order && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
          mt={3.5}
        >
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Tạm tính
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(billWithoutDiscount || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Giảm giá
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(discount || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Phí vận chuyển
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Phí tổng cộng
            </Typography>
            <Typography className="detailOrder__summary-value detailOrder__summary-value--final">
              {numWithCommas(order?.bill?.total + 0 || 0)}₫
            </Typography>
          </Stack>
          {order?.status === 0 && (
            <>
              <Stack py={0.625} direction="row">
                <Typography
                  className="detailOrder__summary-label"
                  style={{ paddingRight: "100px", borderTop: "1px solid #ccc" }}
                >
                  Cân đo đơn hàng
                </Typography>
              </Stack>
              <Stack py={0.625} direction="row">
                <Typography className="detailOrder__summary-label">
                  Trọng lượng
                </Typography>
                <TextField
                  value={weight}
                  onChange={(event) => {
                    setWeight(event.target.value);
                  }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "160px", padding: "0px 20px" }}
                />
              </Stack>
              <Stack py={0.625} direction="row">
                <Typography className="detailOrder__summary-label">
                  Chiều cao
                </Typography>
                <TextField
                  value={height}
                  onChange={(event) => {
                    setHeight(event.target.value);
                  }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "160px", padding: "0px 20px" }}
                />
              </Stack>
              <Stack py={0.625} direction="row">
                <Typography className="detailOrder__summary-label">
                  Chiều dài
                </Typography>
                <TextField
                  value={length}
                  onChange={(event) => {
                    setLength(event.target.value);
                  }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "160px", padding: "0px 20px" }}
                />
              </Stack>
              <Stack py={0.625} direction="row">
                <Typography className="detailOrder__summary-label">
                  Chiều rộng
                </Typography>
                <TextField
                  value={width}
                  onChange={(event) => {
                    setWidth(event.target.value);
                  }}
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "160px", padding: "0px 20px" }}
                />
              </Stack>
            </>
          )}
        </Stack>
      )}
      <Stack direction="row" spacing="16px" justifyContent="flex-end" p={2}>
        {order?.status === 0 && (
          <>
            <Button variant="contained" onClick={handleComfirm}>
              Xác nhận
            </Button>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Hủy bỏ
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

export default DetailOrder;
