import React from "react";
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
import "./PaymentInformationBoxTextField.scss";
import { roundPrice } from "../../constraints/Util";

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
          <Box p={1.25} className="detailOrder__content">
            <Typography style={{ color: "#000", fontWeight: 500 }}>
              {props?.order?.name}
            </Typography>
            <Typography>
              {`Địa chỉ: ${props?.order?.detailLocation}, ${provinceData?.ProvinceName},
                ${districtData?.DistrictName},
                ${wardData?.WardName}`}
            </Typography>
            <Typography>Điện thoại: {props?.order?.phone}</Typography>
          </Box>
        </Box>

        <Box className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC GIAO HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
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
              {roundPrice(props?.order?.shippingFee ? props?.order?.shippingFee : 0)} đ
            </Typography>
          </Box>
        </Box>
        <Box className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC THANH TOÁN</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>
              {
                paymentMethod.find(
                  (item) => item.id == props?.order?.bill?.paymentMethod
                )?.text
              }
            </Typography>
          </Box>
        </Box>
      </Stack>
    </LoadingAPI>
  );
}
