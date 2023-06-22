import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { GetGHNProvinceById, GetGHNProvinceByIdLoading } from "../../../providers/GetGHNProvincesProvider";
import { GetGHNDistrictById, GetGHNDistrictByIdLoading } from "../../../providers/GetGHNDistrictsProvider";
import { GetGHNWardById, GetGHNWardByIdLoading } from "../../../providers/GetGHNWardsProvider";
import LoadingAPI from "../../../components/LoadingAPI";

export function PaymentAddress() {
  const paymentAddress = useSelector((state) => state.payment.address);
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
      {paymentAddress ? (
        <>
          <Typography mb={0.25} fontWeight={500}>
            Người nhận:&nbsp;{paymentAddress.name}
          </Typography>
          <Typography mb={0.25} fontWeight={500}>
            Điện thoại:&nbsp;{paymentAddress.phone}
          </Typography>
          <Typography mb={0.25} fontWeight={500}>
            Địa chỉ:&nbsp;{provinceData?.ProvinceName},&nbsp;
            {districtData?.DistrictName},&nbsp;{wardData?.WardName}
          </Typography>
          <Typography mb={0.25} fontWeight={500}>
            Địa chỉ chi tiết:&nbsp;{paymentAddress.addressDetail}
          </Typography>
          {/* <Typography color="#888">{`${paymentAddress.addressDetail}, ${paymentAddress.city}, ${paymentAddress.district}, ${paymentAddress.ward}`}</Typography> */}
        </>
      ) : (
        <Typography mb={0.25} fontWeight={500}>
            Chưa có địa chỉ
          </Typography>
      )}
    </LoadingAPI>
  );
}