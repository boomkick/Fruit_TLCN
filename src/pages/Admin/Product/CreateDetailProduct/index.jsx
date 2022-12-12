 /* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
// import apiBrand from "../../../../apis/apiBrand";
import "./CreateDetailProduct.scss";
import {
  Stack,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  InputBase
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import rev from "../../../../assets/img/product_le_han_quoc.jpg";
import SelectBoxAddress from "../../../../components/SelectBoxAddress";
import { useParams,useNavigate } from "react-router-dom";
import { productUnit } from "../../../../constraints/Product";
function CreateDetailProduct(props) {
  const [review, setReview] = React.useState(rev)
  const [edit, setEdit] = useState(props.edit)
  const [product, setProduct] = useState({})
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [listCategory, setListCategory] = useState([])
  const [price, setPrice] = useState("")
  // const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("")
  const [minPurchase, setMinPurchase] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getData = async () => {
  //     setListCategory([]);
  //     apiCategory.getAll()
  //       .then(res => {
  //         setListCategory(res.data.categories);
  //       })
  //       .catch(() => {
  //         setListCategory([]);
  //       });
        
  //   };
  //   getData();
  // }, [listCategory])

  // Change value of select box

  const onChangeImg = (e) => {
    if (e.target.files.length > 0) {
      setReview(URL.createObjectURL(e.target.files[0]))
    }
  }

  // handle Add product

  const handleInsert = () => {
    const params = {
      "Name": name,
      "CategoryId": category,
      // "Quantity": quantity,
      "Price": price,
      "Unit": unit,
      "MinPurchase": minPurchase,
      "Description": description,
      "Status": status,
    }
    if(!(name && category && price && unit && minPurchase && description && status)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    else{
    apiProduct.insertProduct(params)
      .then(res => {
        toast.success("Thêm sản phẩm thành công")
        setName("")
        setCategory("")
        // setQuantity("")
        setPrice("")
        setUnit("")
        setMinPurchase("")
        setDescription("")
        setStatus("")
      })
      .catch(error => {
        toast.error("Thêm sản phẩm thất bại!")
      })
    }
  }

  // handle update product

  const handleUpdate = () => {
    const params = {
      "Name": name,
      "CategoryId": category,
      // "Quantity": quantity,
      "Price": price,
      "Unit": unit,
      "MinPurchase": minPurchase,
      "Description": description,
      "Status": status,
    }
    if(!(name && category && price && unit && minPurchase && description && status)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    else{
    apiProduct.insertProduct(params,idProduct)
      .then(res => {
        toast.success("Sửa sản phẩm thành công")
      })
      .catch(error => {
        toast.error("Sửa sản phẩm thất bại!")
      })
    }
  }

  // get data for a particular product


  // Set thông tin cho product detail
  // useEffect(() => {
  //   const loaddata = () => {
  //     if (edit === true) {
  //       apiBrand.getBrandByID({id:idBrand})
  //         .then(res => {
  //           const brand = res.data.brand
  //           console.log(brand)
  //             if (brand) {
  //               setName(brand.name)
                
  //               setPhone(brand.phone)
  //               setAddressDetails(brand.addressDetails)
  //               setDescription(brand.description)
  //               setCommune(brand.brandCommune)
  //               setDistrict(brand.brandDistrict.id)
  //               setProvince(brand.brandProvince.id)
  //               setCountry(brand.brandCountry.id)
  //             }
  //             else {
  //               navigate("/admin/brand/create")
  //               toast.error("Địa chỉ này không tồn tại!")
  //             }
  //         })
  //     }
  //   }
  //   loaddata()
  // }, [edit])

  return (
    <Box width={'100%'} bgcolor='#fff'>
      <Stack className="cruBrand" p={3} justifyContent="center" width="700px" spacing={2} bgcolor='#fff'>
        <Stack direction="row">
          <Typography className="cruBrand__label">Nhập tên sản phẩm</Typography>
          <TextField value={name} onChange={(event) => { setName(event.target.value) }}
              size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">Giá</Typography>
          <TextField value={name} onChange={(event) => { setName(event.target.value) }}
              size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">Loại sản phẩm</Typography>
          <TextField value={name} onChange={(event) => { setName(event.target.value) }}
              size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        {edit == true ? <Stack direction="row">
          <Typography className="cruBrand__label">Số lượng</Typography>
          <TextField value={name} onChange={(event) => { setName(event.target.value) }}
              size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack> : <></>}

        <Stack direction="row" >
          <Typography className="cruBrand__label">Mô Tả</Typography>
          <TextField value={description} onChange={(event) => { setDescription(event.target.value) }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>

        <Stack direction="row" >
          <Typography className="cruBrand__label">Tình trạng</Typography>
          <TextField value={description} onChange={(event) => { setDescription(event.target.value) }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>

        <Stack direction="row">
          <Typography className="cruBrand__label">
            Đơn vị:
          </Typography>
          <FormControl className="create-address__input" sx={{flex:"1"}}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={unit}
              label="Age"
              onChange={e=>setUnit(e.target.value)}
              
              input={<InputCustom placeholder="Chọn đơn vị" />}
            >
              {
                productUnit.map(item => <MenuItem value={item.id}>{item.text}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Stack>

        {/* <Stack direction="row">
          <Typography className="cruBrand__label">Liên hệ</Typography>
          <TextField value={phone} onChange={(event) => { setPhone(event.target.value) }} size="small" id="outlined-multiline-flexible"
            multiline
            maxRows={4} variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        <SelectBoxAddress province={province} district={district} commune={commune}
          onChangeProvince={handleChangeProvince}
          onChangeDistrict={handleChangeDistrict}
          onChangeCommune={handleChangeCommune}
          classLabel="cruBrand__label"
        /> */}
        <Stack direction="row" p={2}>
          <Typography className="cruBrand__label">Thêm ảnh</Typography>
          <Stack>
            <img src={review} width="210px" height="210px" alt="" />
            <input type="file" id="myfile" name="myfile" onChange={onChangeImg}></input>
          </Stack>
        </Stack>

        <Stack justifyContent="center">
          <Button width="450px" variant="contained" onClick={edit ? handleUpdate
                : handleInsert} >{edit? "Cập nhật":"Thêm"}</Button>
        </Stack>
      </Stack>
    </Box>
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

export default CreateDetailProduct;
