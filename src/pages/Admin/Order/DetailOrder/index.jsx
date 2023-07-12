import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-toastify";
import {
  formatDateTime,
  groupByGiftCartWithCartDetails,
  numWithCommas,
  roundPrice
} from "../../../../constraints/Util";
import apiLocation from "../../../../apis/apiLocation";
import { GetGHNProvinceByIdProvider } from "../../../../providers/GetGHNProvincesProvider";
import { GetGHNDistrictByIdProvider } from "../../../../providers/GetGHNDistrictsProvider";
import { GetGHNWardByIdProvider } from "../../../../providers/GetGHNWardsProvider";
import PaymentInformationBoxTextField from "../../../../components/PaymentInformationBoxTextField.jsx";
import Loading from "../../../../components/Loading";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function DetailOrder() {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  // Thông tin giá trị đơn hàng
  const [billWithoutDiscount, SetBillWithoutDiscount] = useState(0);
  const [discount, SetDiscount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      await apiCart
        .getProcessCart({ id: id })
        .then((res) => {
          setOrder(res.data);
          if (res.data?.cartDetails) {
            let realBill = 0;
            res.data?.cartDetails.forEach((item) => {
              realBill += item?.price * item?.quantity;
            });
            SetBillWithoutDiscount(realBill);
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

  // Xử lí đơn hàng
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const handleComfirm = async () => {
    setLoadingConfirm(true)
    let params = {
      processDescription: "",
      status: 1,
      weight: 1,
      length: 1,
      width: 1,
      height: 1,
    };
    await apiCart
      .putProcessCart(params, id)
      .then((res) => {
        toast.success("Xác nhận thành công");
        navigate("/admin/order");
      })
      .catch((error) => {
        toast.error("Xác nhận không thành công");
      });
      setLoadingConfirm(false)
  };

  const handleCancel = async () => {
    let params = {
      processDescription: "",
      status: 2,
      weight: 1,
      length: 1,
      width: 1,
      height: 1,
    };
    await apiCart
      .putProcessCart(params, id)
      .then((res) => {
        toast.success("Hủy đơn thành công");
        navigate("/admin/order");
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
    <>
      <GetGHNProvinceByIdProvider ProvinceId={order?.cityId}>
        <GetGHNDistrictByIdProvider
          ProvinceId={order?.cityId}
          DistrictId={order?.districtId}
        >
          <GetGHNWardByIdProvider
            DistrictId={order?.districtId}
            WardId={order?.wardId}
          >
            <Box>
              <Stack bgcolor="white" p={2}>
                <Typography mt={2.5} mx={2} fontSize="22px" fontWeight={300}>
                  Chi tiết đơn hàng {order?.id}
                </Typography>
                <Typography sx={{ fontSize: "13px", textAlign: "end" }}>
                  Ngày đặt hàng: {formatDateTime(order?.createdDate)}
                </Typography>
              </Stack>
              <PaymentInformationBoxTextField order={order} />

              <Stack className="detailOrder-Table">
                <Stack direction="row" className="detailOrder-Table__heading">
                  <Box>Sản phẩm</Box>
                  <Box>Giá</Box>
                  <Box>Số lượng</Box>
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
                            Xem nhận xét
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Box>{numWithCommas(item.price || 0)}₫</Box>
                    <Box>{numWithCommas(item.quantity || 0)}</Box>
                    <Box>
                      {numWithCommas(item.price * item.quantity || 0)} ₫
                    </Box>
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
                      <Box>{numWithCommas(item.price || 0)}₫</Box>
                      <Box>
                        {item.quantity}
                      </Box>
                      <Box>
                        {numWithCommas(item.price * item.quantity || 0)} ₫
                      </Box>
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
                      Phí vận chuyển
                    </Typography>
                    <Typography className="detailOrder__summary-value">
                      {numWithCommas(roundPrice(order?.shippingFee || 0))} ₫
                    </Typography>
                  </Stack>
                  <Stack py={0.625} direction="row">
                    <Typography className="detailOrder__summary-label">
                      Phí tổng cộng
                    </Typography>
                    <Typography className="detailOrder__summary-value detailOrder__summary-value--final">
                    {numWithCommas(roundPrice(
                        order?.bill?.total + order?.shippingFee || 0
                      ))}{" "}
                      ₫
                    </Typography>
                  </Stack>
                </Stack>
              )}
              <Stack
                direction="row"
                spacing="16px"
                justifyContent="flex-end"
                p={2}
              >
                {order?.status === 0 && (
                  <>
                    <Button variant="contained" onClick={handleComfirm} startIcon={loadingConfirm ? null : <SaveIcon />}>
                    {loadingConfirm && <Loading color="#fff" />}
                      Xác nhận
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCancel}
                      startIcon={<CancelIcon/>}
                    >
                      Hủy bỏ
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          </GetGHNWardByIdProvider>
        </GetGHNDistrictByIdProvider>
      </GetGHNProvinceByIdProvider>
    </>
  );
}

export default DetailOrder;
