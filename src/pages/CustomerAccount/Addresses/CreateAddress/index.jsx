/* eslint-disable */
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  InputBase,
} from "@mui/material";
import SelectBoxAddress from "../../../../components/SelectBoxAddress";
import "./CreateAddress.scss";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import apiAddress from "../../../../apis/apiAddress";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../../../slices/paymentSlice";

function CreateAddress(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  // const [addressType, setAddressType] = useState("");
  const paymentAddress = useSelector((state) => state.payment.address);
  const [addressid, setAddressid] = useState("");
  const [edit, setEdit] = useState(props.edit);
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const loaddata = () => {
      if (edit === true) {
        apiAddress.getProfileUser()
        .then((res) => {
          const user = res.data;
          if (user) {
            setName(user.firstName + " " + user.lastName);
            setPhone(user.phone);
            setAddressDetail(user.detailLocation);
            setWard(user.wardId);
            setDistrict(user.districtId);
            setCity(user.cityId);
          } else {
            navigate("/my-account/address/create");
            toast.error("Địa chỉ này không tồn tại!");
          }
        });
      }
      setAddressid(params.id);
    };
    loaddata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  const handleChangeCity = (value) => {
    setCity(value);
  };

  const handleChangeDistrict = (value) => {
    setDistrict(value);
  };

  const handleChangeWard = (value) => {
    setWard(value);
  };

  const handleSave = () => {
    const params = {
      addressDetail: addressDetail,
      ward: ward,
      district: district,
      name: name,
      phone: phone,
      city: city,
    };
    if (
      !(
        addressDetail &&
        ward &&
        district &&
        name &&
        phone &&
        city
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      dispatch(setAddress(params));
      toast.success("Cập nhật địa chỉ nhận hàng thành công");
    }
  };

  const handleUpdate = () => {
    const params = {
      addressDetail: addressDetail,
      ward: ward,
      district: district,
      name: name,
      phone: phone,
      city: city,
    };
    // Dữ liệu test
    // params.city = "01"
    // params.district = "001"
    // params.ward = "00001"
    console.log(params.city)
    console.log(params.district)
    console.log(params.ward)

    if (
      !(
        addressDetail &&
        ward &&
        district &&
        name &&
        phone &&
        city
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    dispatch(setAddress(params));
    toast.success("Cập nhật địa chỉ nhận hàng thành công");
    navigate("/payment");
  };

  return (
    <Box className="create-address" p={2} m={2}>
      <Typography variant="h6">Địa chỉ nhận hàng</Typography>

      <Stack p="2rem" spacing={1.875} width="80%">
        <SelectBoxAddress
          userCity={city}
          userDistrict={district}
          userWard={ward}
          onChangeCity={handleChangeCity}
          onChangeDistrict={handleChangeDistrict}
          onChangeWard={handleChangeWard}
        />
        {/* Address - start */}
        {/* Address - end */}

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

        <Stack direction="row" justifyContent="flex-start">
          {/* <Typography className="create-address__label"></Typography> */}
          <Button
            onClick={edit ? handleUpdate : handleSave}
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

export default CreateAddress;
