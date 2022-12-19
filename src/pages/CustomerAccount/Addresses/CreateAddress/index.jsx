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

function CreateAddress(props) {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  // const [addressType, setAddressType] = useState("");
  const [addressid, setAddressid] = useState("");
  const [edit, setEdit] = useState(props.edit);
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loaddata = () => {
      if (edit === true) {
        apiAddress.getProfileUser()
        .then((res) => {
          const user = res.data;
          if (user) {
            setFullName(user.firstName + " " + user.lastName);
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
      // addressType: Number(addressType),
      ward: ward,
      companyName: companyName,
      district: district,
      fullName: fullName,
      phone: phone,
      city: city,
    };
    if (
      !(
        addressDetail &&
        // addressType &&
        ward &&
        // companyName &&
        district &&
        fullName &&
        phone &&
        city
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      apiAddress
        .saveAddress(params)
        .then((res) => {
          toast.success("Thêm địa chỉ thành công");
          setFullName("");
          setCompanyName("");
          setPhone("");
          setAddressDetail("");
          // setAddressType(1);
          setWard("");
          setDistrict("");
          setCity("");
        })
        .catch((error) => {
          toast.error("Thêm địa chỉ thất bại!");
        });
    }
  };

  const handleUpdate = () => {
    const params = {
      addressDetail: addressDetail,
      // addressType: Number(addressType),
      ward: ward,
      companyName: companyName,
      district: district,
      fullName: fullName,
      phone: phone,
      city: city,
    };

    if (
      !(
        addressDetail &&
        // addressType &&
        ward &&
        // companyName &&
        district &&
        fullName &&
        phone &&
        city
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    apiAddress
      .saveAddress(params)
      .then((res) => {
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        toast.error("Cập nhật thất bại!");
      });
  };

  return (
    <Box className="create-address" p={2} m={2}>
      <Typography variant="h6">Địa chỉ nhận hàng</Typography>

      <Stack p="2rem" spacing={1.875} width="80%">
        {console.log("city", city)}
        <SelectBoxAddress
          userCity={city}
          userDistrict={district}
          userWard={ward}
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
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
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
