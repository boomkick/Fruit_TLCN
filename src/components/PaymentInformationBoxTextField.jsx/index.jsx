import React, { useEffect, useRef, useState } from "react";
import LoadingAPI from "../LoadingAPI";
import {
  GetGHNProvinceById,
  GetGHNProvinceByIdLoading,
} from "../../providers/GetGHNProvincesProvider";
import { Box, Stack, Typography } from "@mui/material";
import {
  GetGHNDistrictById,
  GetGHNDistrictByIdLoading,
} from "../../providers/GetGHNDistrictsProvider";
import {
  GetGHNWardById,
  GetGHNWardByIdLoading,
} from "../../providers/GetGHNWardsProvider";
import { paymentMethod } from "../../constraints/PaymentMethod";
import {ServiceTypeEnum} from '../../constraints/GHNService'
import "./PaymentInformationBoxTextField.scss";
import { formatDateTime, roundPrice, numWithCommas } from "../../constraints/Util";
import { cartStatus } from "../../constraints/Cart";

export default function PaymentInformationBoxTextField(props) {
  // Province
  const provinceData = React.useContext(GetGHNProvinceById);
  const provinceDataLoading = React.useContext(GetGHNProvinceByIdLoading);

  // District
  const districtData = React.useContext(GetGHNDistrictById);
  const districtDataLoading = React.useContext(GetGHNDistrictByIdLoading);

  // Ward
  const wardData = React.useContext(GetGHNWardById);
  const wardDataLoading = React.useContext(GetGHNWardByIdLoading);

  const [isAddressLoaded, setIsAddressLoaded] = useState(false);
  const [isShippingLoaded, setIsShippingLoaded] = useState(false);
  const [isPaymentLoaded, setIsPaymentLoaded] = useState(false);
  const addressRef = useRef(null);
  const shippingRef = useRef(null);
  const paymentRef = useRef(null);
  useEffect(() => {
    if(isAddressLoaded && isShippingLoaded && isPaymentLoaded) {      
      const arrHeights = [addressRef.current.offsetHeight, shippingRef.current.offsetHeight, paymentRef.current.offsetHeight];
      let max = arrHeights[0];
      for(let i = 1; i < arrHeights.length; i++) {
        if(arrHeights[i] > max)
          max = arrHeights[i];
      }
      addressRef.current.style.height = `${max}px`
      shippingRef.current.style.height = `${max}px`
      paymentRef.current.style.height = `${max}px`
    }
  }, [isAddressLoaded, isShippingLoaded, isPaymentLoaded])

  return (
    <LoadingAPI
      loading={provinceDataLoading || districtDataLoading || wardDataLoading}
    >
      <Stack
        display={"flex"}
        direction="row"
        mt={1.25}
        mb={2.5}
        className="detailOrder"
        justifyContent="space-between"
      >
        <Box className="detailOrder__boxInfo">
          <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content" ref={e => {addressRef.current = e; setIsAddressLoaded(true)}}>
            <Typography style={{ color: "#000", fontWeight: 500 }}>
              Tên người nhận: {props?.order?.name}
            </Typography>
            <Typography>
              {`Địa chỉ: ${provinceData?.ProvinceName},
                ${districtData?.DistrictName},
                ${wardData?.WardName}`}
            </Typography>
            <Typography>
              {`Địa chỉ chi tiết: ${props?.order?.detailLocation}`}
            </Typography>
            <Typography>Điện thoại: {props?.order?.phone}</Typography>
            <Typography>Trạng thái đơn hàng: {cartStatus.find((e) => e.id == props?.order?.status)?.text}</Typography>
          </Box>
        </Box>

        <Box className="detailOrder__boxInfo" >
          <Typography>HÌNH THỨC GIAO HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content" ref={e => {shippingRef.current = e; setIsShippingLoaded(true)}}>
            <Typography>
              <img
                width="56px"
                height="16px"
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-VN.png"
                alt=""
              />
              Giao hàng nhanh
            </Typography>
            <Typography>
              Phí vận chuyển:{" "}
              {numWithCommas(roundPrice(props?.order?.shippingFee ? props?.order?.shippingFee : 0))} đ
            </Typography>
            <Typography>
              Dịch vụ vận chuyển:{" "}
              {ServiceTypeEnum[props?.order?.ghnServiceType]}
            </Typography>
            <Typography>
              Giao hàng lúc:{" "}
              {formatDateTime(new Date(props?.order?.deliveryTime)).substring(0, 10)}
            </Typography>
          </Box>
        </Box>
        <Box className="detailOrder__boxInfo" >
          <Typography>HÌNH THỨC THANH TOÁN</Typography>
          <Box p={1.25} className="detailOrder__content" ref={e => {paymentRef.current = e; setIsPaymentLoaded(true)}}>
            <Typography>
              {
                paymentMethod.find(
                  (item) => item.id == props?.order?.bill?.paymentMethod
                )?.text
              }
            </Typography>
            <Typography>
              {props?.order?.bill?.purchaseDate
                ? 'Ngày thanh toán: ' + formatDateTime(props?.order?.bill?.purchaseDate)
                : "Chưa thanh toán"}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </LoadingAPI>
  );
}
