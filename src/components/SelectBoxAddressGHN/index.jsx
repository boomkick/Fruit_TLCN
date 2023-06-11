import React from "react";
import {
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import apiLocation from "../../apis/apiLocation";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiGHNAddress from "../../apis/apiGHNAddress";

SelectBoxAddressGHN.propTypes = {
  onChangeCity: PropTypes.func,
  onChangeDistrict: PropTypes.func,
  onChangeWard: PropTypes.func,
};

function SelectBoxAddressGHN(props) {
  const address = useSelector((state) => state.address.locations);
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // Gán danh sách dữ liệu của thành phố -> quận -> phường
  useEffect(() => {
    const setDataCity = async () => {
      await apiGHNAddress
        .getProvinces()
        .then((res) => {
          setListCity(res.data);
        })
        .catch((error) => {
            toast.error(error);
        })
    };

    setDataCity();
  }, []);

  // Thay đổi city
  const handleChangeCity = (event) => {
    setSelectedCity(event.target.value);
    props.onChangeCity(event.target.value);
  };

  useEffect(() => {
    const setDataDistrict = async () => {
        let params = {
            province_id: selectedCity
        };
        await apiGHNAddress
        .getDistrictsByProvinceId(params)
        .then((res) => {
          setListDistrict(res.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    };

    setDataDistrict();
  }, [selectedCity]);

  // Thay đổi quận
  const handleChangeDistrict = (event) => {
    setSelectedDistrict(event.target.value);
    props.onChangeDistrict(event.target.value);
  };

  useEffect(() => {
    const setDataWard = async () => {
        apiGHNAddress
        .getWardsByDictrictId({
          district_id: selectedDistrict,
        })
        .then((res) => {
          setListWard(res.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    };

    setDataWard();
  }, [selectedDistrict]);

  // Thay đổi huyện
  const handleChangeWard = (event) => {
    setSelectedWard(event.target.value);
    props.onChangeWard(event.target.value);
  };

  if (!props.helper)
    return (
      <>
        <Stack direction="row">
          <Typography className={props.classLabel || "create-address__label"}>
            Tỉnh/Thành phố:
          </Typography>
          <FormControl className="create-address__input" sx={{ flex: "1" }}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectedCity ? selectedCity : ""}
              label="Age"
              onChange={handleChangeCity}
              input={<InputCustom placeholder="Chọn Tỉnh/Thành phố" />}
            >
              {listCity ? (
                listCity.map((item) => (
                  <MenuItem value={item.ProvinceID}>{item.ProvinceName}</MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row">
          <Typography className={props.classLabel || "create-address__label"}>
            Quận huyện:
          </Typography>
          <FormControl className="create-address__input" sx={{ flex: "1" }}>
            <InputLabel id="demo-simple-select-helper-label"></InputLabel>
            <Select
              sx={{ flex: 0.65 }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectedDistrict ? selectedDistrict : ""}
              label="Age"
              onChange={handleChangeDistrict}
              input={<InputCustom placeholder="Chọn Quận/Huyện" />}
            >
              {listDistrict ? (
                listDistrict.map((item) => (
                  <MenuItem value={item.DistrictID}>{item.DistrictName}</MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row">
          <Typography className={props.classLabel || "create-address__label"}>
            Phường xã:
          </Typography>
          <FormControl className="create-address__input" sx={{ flex: "1" }}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectedWard ? selectedWard : ""}
              label="Age"
              onChange={handleChangeWard}
              input={<InputCustom placeholder="Chọn Xã/Thị trấn" />}
            >
              {listWard ? (
                listWard.map((item) => (
                  <MenuItem value={item.WardCode}>{item.WardName}</MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Stack>
      </>
    );

  if (props.helper)
    return (
      <>
        <Stack direction="row" style={{ marginBottom: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Tỉnh/Thành phố
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCity}
              label="Tỉnh/Thành phố"
              onChange={handleChangeCity}
            >
              {listCity ? (
                listCity.map((item) => (
                  <MenuItem value={item.ProvinceID}>{item.ProvinceName}</MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" style={{ marginBottom: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedDistrict}
              label="Quận/Huyện"
              onChange={handleChangeDistrict}
            >
              {listDistrict ? (
                listDistrict.map((item) => (
                  <MenuItem value={item.DistrictID}>{item.DistrictName}</MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedWard}
              label="Phường/Xã"
              onChange={handleChangeWard}
            >
              {listWard ? (
                listWard.map((item) => (
                  <MenuItem value={item.WardID}>{item.WardName}</MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Stack>
      </>
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

export default SelectBoxAddressGHN;
