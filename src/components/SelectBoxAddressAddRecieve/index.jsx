
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
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from '@mui/material/styles';
import { useState } from "react";
// import apiAddress from "../../apis/apiAddress";
import apiLocation from "../../apis/apiLocation";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function SelectBoxAddressAddRecieve(props) {
    const address = useSelector((state) => state.address.locations)
    const [listCity, setListCity] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])

    const [selectedCity, setSelectedCity] = useState({})
    const [selectedDistrict, setSelectedDistrict] = useState({})
    const [selectedWard, setSelectedWard] = useState({})

    
    // Gán danh sách dữ liệu của thành phố -> quận -> phường
    useEffect(() => {
      const setDataCity = async () => {
        apiLocation.getListCity()
          .then((res) => {
            setListCity(res.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      };

      setDataCity();
    }, []);

    // Thay đổi city
    const handleChangeCity = (event) =>{
      setSelectedCity(event.target.value);
      props.onChangeCity(event.target.value);
    }

    useEffect(() => {
      const setDataDistrict = async () => {
        apiLocation.getListDistrictByCityId({cityId: selectedCity})
          .then((res) => {
            setListDistrict(res.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      };

      setDataDistrict();
    }, [selectedCity])

    // Thay đổi quận
    const handleChangeDistrict = (event) =>{
      setSelectedDistrict(event.target.value);
      props.onChangeDistrict(event.target.value);
    }

    useEffect(() => {
      const setDataWard = async () => {
        apiLocation.getListWardByCityIdAndDistrictId({cityId: selectedCity, districtId: selectedDistrict})
          .then((res) => {
            setListWard(res.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      };

      setDataWard();
    }, [selectedDistrict])

    // Thay đổi huyện
    const handleChangeWard = (event) =>{
      setSelectedWard(event.target.value);
      props.onChangeWard(event.target.value);
    }

    return (
      <>
      <Stack direction="row">
            <Typography className={props.classLabel||"create-address__label"}>
              Tỉnh/Thành phố:
            </Typography>
            <FormControl className="create-address__input" sx={{flex:"1"}}>
              <Select
                size="small"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={selectedCity ?? "123214"}
                value={selectedCity ? selectedCity : ""}
                label="Age"
                onChange={handleChangeCity}
                
                input={<InputCustom placeholder="Chọn Tỉnh/Thành phố" />}
              >
                {listCity ? listCity.map(item => <MenuItem value={item.level1_id}>{item.name}</MenuItem>) : <></>}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row">
            <Typography  className={props.classLabel||"create-address__label"}>
              Quận huyện:
            </Typography>
            <FormControl className="create-address__input" sx={{flex:"1"}}>
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
                {listDistrict ? listDistrict.map(item => <MenuItem value={item.level2_id}>{item.name}</MenuItem>) : <></>}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row">
            <Typography  className={props.classLabel||"create-address__label"}>
              Phường xã:
            </Typography>
            <FormControl className="create-address__input" sx={{flex:"1"}}>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedWard ? selectedWard : ""}
                label="Age"
                onChange={handleChangeWard}
                input={<InputCustom placeholder="Chọn Xã/Thị trấn" />}
              >
                {listWard ? listWard.map(item => <MenuItem value={item.level3_id}>{item.name}</MenuItem>) : <></>}
              </Select>
            </FormControl>
          </Stack>
        </>
    )
}


const InputCustom = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      boxSizing: "border-box",
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      display: "flex",
      height: "40px !important",
      padding: '0px 26px 0px 12px',
      alignItems: "center",
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#1890ff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

SelectBoxAddressAddRecieve.propTypes = {
  onChangeCity:PropTypes.func,
  onChangeDistrict:PropTypes.func,
  onChangeWard:PropTypes.func
};

export default SelectBoxAddressAddRecieve