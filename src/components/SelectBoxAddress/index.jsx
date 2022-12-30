
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
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

function SelectBoxAddress(props) {
    const address = useSelector((state) => state.address.locations)
    const [listCity, setListCity] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])

    const [selectedCity, setSelectedCity] = useState({})
    const [selectedDistrict, setSelectedDistrict] = useState({})
    const [selectedWard, setSelectedWard] = useState({})

    const {userCity, userDistrict, userWard} = props
    
    // Gán danh sách dữ liệu của thành phố -> quận -> phường
    useEffect(() => {
      console.log("props: ", props);
      let listAllCity = []
      let listAllDistrict = []
      let listAllWard = []
      const setDataCity = async () => {
        address.forEach(city => {
          listAllCity.push(city)
          listAllDistrict = listAllDistrict.concat(city?.level2s)
          city?.level2s.forEach(district => {
            listAllWard = listAllWard.concat(district?.level3s)
          })
        });

        setListCity(listAllCity)
        setListDistrict(listAllDistrict)
        setListWard(listAllWard)
      };

      setDataCity();
    }, []);

    // Gán giá trị địa chỉ nếu có của người mua hàng
    useEffect(() => {
      let city = listCity.find((item) => item?.level1_id == userCity)
      setSelectedCity(city)

      let district = listDistrict.find((item) => item?.level2_id === userDistrict)
      setSelectedDistrict(district)

      let ward = listWard.find((item) => item?.level3_id === userWard)
      setSelectedWard(ward)
    }, [])


    // Main ------------------start
    // Trong trường hợp selectedCity bị thay đổi thì
    const handleChangeCityList = (item) => {
      setSelectedCity(item)
    }
    useEffect(() => {
      console.log("(selectedCity", selectedCity)
      setListDistrict(selectedCity?.level2s)
    }, [selectedCity]);

    // Trong trường hợp selectedCity bị thay đổi thì
    const handleChangeDistrictList = (item) => {
      setSelectedCity(item)
    }
    useEffect(() => {
      setListWard(selectedDistrict?.level3s)
    }, [selectedDistrict]);
    // // Main ------------------end
  
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
              value={selectedCity ? selectedCity.level1_id : ""}
              label="Age"
              onChange={e=>props.onChangeCity(e.target.value)}
              
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
              value={selectedDistrict ? selectedDistrict.level2_id : ""}
              label="Age"
              onChange={e=>props.onChangeDistrict(e.target.value)}
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
              value={selectedWard ? selectedWard.level3_id : ""}
              label="Age"
              onChange={e=>props.onChangeWard(e.target.value)}
              input={<InputCustom placeholder="Chọn Xã/Thị trấn" />}
            >
              {listWard ? listWard.map(item => <MenuItem value={item.level3_id}>{item.name}</MenuItem>) : <></>}
            </Select>
          </FormControl>
        </Stack></>
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

  SelectBoxAddress.propTypes = {
    city: PropTypes.string,
    district:PropTypes.string,
    ward:PropTypes.string,
    onChangeCity:PropTypes.func,
    onChangeDistrict:PropTypes.func,
    onChangeWard:PropTypes.func
  };

export default SelectBoxAddress