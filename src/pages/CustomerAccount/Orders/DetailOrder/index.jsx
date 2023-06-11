import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-toastify";
import {
  groupByGiftCartWithCartDetails,
  numWithCommas,
  roundPrice,
} from "../../../../constraints/Util";
import { GetGHNProvinceByIdProvider } from "../../../../providers/GetGHNProvincesProvider";
import { GetGHNDistrictByIdProvider } from "../../../../providers/GetGHNDistrictsProvider";
import { GetGHNWardByIdProvider } from "../../../../providers/GetGHNWardsProvider";
import PaymentInformationBoxTextField from "../../../../components/PaymentInformationBoxTextField.jsx/index.jsx";

function DetailOrder() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState(null);
  const [billWithoutDiscount, SetBillWithoutDiscount] = useState(0);
  const [discount, SetDiscount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      await apiCart
        .getCartHistoryById({ id: id })
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
  }, [id]);

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
              <Typography mt={2.5} fontSize="19px" fontWeight={300}>
                Chi tiết đơn hàng #{order?.id}
              </Typography>
              <Typography fontSize="13px" textAlign="end">
                Ngày đặt hàng: {order?.createdDate}
              </Typography>
              <PaymentInformationBoxTextField order={order} />

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
                      {numWithCommas(roundPrice(order?.shippingFee || 0))} ₫
                    </Typography>
                  </Stack>
                  <Stack py={0.625} direction="row">
                    <Typography className="detailOrder__summary-label">
                      Tổng cộng
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
            </Box>
          </GetGHNWardByIdProvider>
        </GetGHNDistrictByIdProvider>
      </GetGHNProvinceByIdProvider>
    </>
  );
}

export default DetailOrder;
