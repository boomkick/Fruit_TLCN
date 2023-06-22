/* eslint-disable */
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  InputBase,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import "./AddRecieveAddressInputForm.scss";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SelectBoxAddressGHN from "../SelectBoxAddressGHN";
import { setAddress } from "../../slices/paymentSlice";
import PropTypes from "prop-types";

const serviceTypeOptions = [
  { id: 1, label: "NHANH", name: "Nhanh" },
  { id: 2, label: "CHUAN", name: "Chuẩn" },
  { id: 3, label: "TIETKIEM", name: "Tiết kiệm" },
];

AddRecieveAddressInputForm.propsTypes = {
  handleClose: PropTypes.func,
};

function AddRecieveAddressInputForm(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const paymentAddress = useSelector((state) => state.payment.address);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("paymentAddress: ", paymentAddress);
    if(paymentAddress){
      setName(paymentAddress.name)
      setPhone(paymentAddress.phone)
      setAddressDetail(paymentAddress.addressDetail)
      setCity(paymentAddress.city)
      setDistrict(paymentAddress.district)
      setWard(paymentAddress.ward)
    }
  }, [paymentAddress])

  // Thay đổi phương thức vận chuyển
  const [serviceType, setServiceType] = useState(1);
  const handleChangeServiceType = (event) => {
    setServiceType(event.target.value);
  };

  // Thay đổi gía trị địa chỉ
  const handleChangeCity = (value) => {
    setCity(value);
  };

  const handleChangeDistrict = (value) => {
    setDistrict(value);
  };

  const handleChangeWard = (value) => {
    setWard(value);
  };

  const handleAddAddressToPayment = () => {
    const params = {
      addressDetail: addressDetail,
      ward: ward,
      district: district,
      name: name,
      phone: phone,
      city: city,
      serviceType: serviceType,
    };

    if (
      !(
        addressDetail &&
        ward &&
        district &&
        name &&
        phone &&
        city &&
        serviceType
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    dispatch(setAddress(params));
    toast.success("Cập nhật địa chỉ nhận hàng thành công");
    props.handleClose();
  };

  return (
    <Box className="create-address" style={{ padding: "25px 25px 10px 25px" }}>
      <Stack spacing={1.875}>
        <SelectBoxAddressGHN
          cityId={city}
          districtId={district}
          wardId={ward}
          onChangeCity={handleChangeCity}
          onChangeDistrict={handleChangeDistrict}
          onChangeWard={handleChangeWard}
        />

        <Stack direction="row">
          <Typography className="create-address__label">
            Tên người nhận:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="Nhập họ và tên"
              size="small"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Địa chỉ chi tiết
          </Typography>
          <Stack className="create-address__input">
            <InputCustom
              value={addressDetail}
              onChange={(event) => {
                setAddressDetail(event.target.value);
              }}
              size="small"
              rows={4}
              placeholder="Nhập địa chỉ"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Số điện thoại nhận hàng:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              size="small"
              placeholder="Nhập số điện thoại"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className={"create-address__label"}>
            Dịch vụ vận chuyển:
          </Typography>
          <FormControl className="create-address__input" sx={{ flex: "1" }}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={serviceType}
              label="Age"
              onChange={handleChangeServiceType}
              input={<InputCustom placeholder="Chọn Tỉnh/Thành phố" />}
            >
              {serviceTypeOptions ? (
                serviceTypeOptions.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" justifyContent="flex-start">
          <Button
            onClick={handleAddAddressToPayment}
            className="btn__Update"
            variant="contained"
          >
            Lưu địa chỉ
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

const InputCustom = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    boxSizing: "border-box",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    display: "flex",
    height: "40px !important",
    padding: "0px 26px 0px 12px",
    alignItems: "center",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#1890ff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default AddRecieveAddressInputForm;
