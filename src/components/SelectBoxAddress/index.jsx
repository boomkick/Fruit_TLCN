
import React from "react";
import {
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputBase
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
// import apiAddress from "../../apis/apiAddress";
import { useEffect } from "react";
import PropTypes from 'prop-types';

function SelectBoxAddress(props) {
    const [listprovince, setListProvince] = useState([])
    const [listdistrict, setListDistrict] = useState([])
    const [listcommune, setListCommune] = useState([])
   
    const {province,district,commune} = props
    // useEffect(() => {
    //   const getData = async () => {
    //     apiAddress.getAllProvince()
    //       .then(res => {
    //         setListProvince(res.data.list);
    //       })
    //   };
    //   getData();
    // }, []);
  
    // useEffect(() => {
    //   const getData = async () => {
    //     const params = { id: props.province }
    //     setListCommune([]);
    //     setListDistrict([]);
    //     apiAddress.getDistrictInProvinceById(params)
    //       .then(res => {
    //         setListDistrict(res.data.list);
            
    //       })
    //   };
    //   getData();
    // }, [props.province])
  
    // useEffect(() => {
    //   const getData = async () => {
    //     const params = { id: props.district }
    //     setListCommune([]);
    //     apiAddress.getCommuneInDistrictById(params)
    //       .then(res => {
    //         setListCommune(res.data.list);
    //       })
    //   };
    //   getData();
    // }, [props.district])

    // useEffect(()=>{
    //   const handle = ()=>{
    //     if(!props.setAddressDetails)
    //       return
    //     let province = listprovince?.find(item=>item.id === props.province)
    //     let district = listdistrict?.find(item=>item.id === props.district)
    //     let commune = listcommune?.find(item=>item.id === props.commune)
        
    //     if(province && district && commune)
    //         props.setAddressDetails(`${province.name}, ${district.name}, ${commune.name}`)
    //     else
    //         props.setAddressDetails('')
    //   }
    //   handle()
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[props.district,props.commune,props.province])
  
   
  
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
              value={province}
              label="Age"
              onChange={e=>props.onChangeProvince(e.target.value)}
              
              input={<InputCustom placeholder="Chọn Tỉnh/Thành phố" />}
            >
              {
                listprovince.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)
              }
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
              value={district}
              label="Age"
              onChange={e=>props.onChangeDistrict(e.target.value)}
              input={<InputCustom placeholder="Chọn Quận/Huyện" />}
            >
              {
                listdistrict.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)
              }
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
              value={commune}
              label="Age"
              onChange={e=>props.onChangeCommune(e.target.value)}
              input={<InputCustom placeholder="Chọn Xã/Thị trấn" />}
            >
              {
                listcommune.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)
              }
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
    province: PropTypes.string,
    district:PropTypes.string,
    commune:PropTypes.string,
    onChangeProvince:PropTypes.func,
    onChangeDistrict:PropTypes.func,
    onChangeCommune:PropTypes.func
  };

export default SelectBoxAddress