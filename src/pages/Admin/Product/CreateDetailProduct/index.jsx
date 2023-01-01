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
import { productUnit, productStatus } from "../../../../constraints/Product";
import apiCategory from "../../../../apis/apiCategory"
import apiProduct from "../../../../apis/apiProduct"


function CreateDetailProduct(props) {
  const [review, setReview] = React.useState([rev])
  const [files, setFiles] = React.useState([])
  const [edit, setEdit] = useState(props.edit)
  const [product, setProduct] = useState({})
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [listCategory, setListCategory] = useState([])
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("")
  const [minPurchase, setMinPurchase] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const navigate = useNavigate();

  // Get all categories
  useEffect(() => {
    const getData = async () => {
      setListCategory([]);
      apiCategory.showAllCategory()
        .then(res => {
          setListCategory(res.data);
        })
        .catch(() => {
          setListCategory([]);
        });
        
    };
    getData();
  }, [])

  // Change value of select box

  const onChangeImg = (e) => {
    if (e.target.files.length > 0) {
      if (files.length === 4) {
        toast.info("Số hình ảnh tối đa cho 1 sản phẩm là 4")
      } else {
        let filesState = [...files, e.target.files[0]]
        setFiles(filesState)
        console.log("filesState", filesState);
        let reviewsState = [...review, URL.createObjectURL(e.target.files[0])]
        if (review[0] === rev) {
          reviewsState = [URL.createObjectURL(e.target.files[0])]
        }
        setReview(reviewsState)
      }
    }
  }

  // handle Add product
  const handleInsert = () => {
    console.log("fileStateInsert: ", files);
    // {"CategoryId": 3, "name": "Lê Hàn Quốc", "Price": 500000, "Quantity": 80, "Unit": "UNIT", "MinPurchase":1, "Description": "aaaa", "status":"SELLING"}
    let unitString = unit == 0 ? "WEIGHT" : "UNIT"
    let statusString = status == 0 ? "SELLING" : status == 1 ? "UNSOLD" : "OUT_OF_STOCK"
    let params = new FormData(); 
    const product = {
        Name: name,
        CategoryId: category,
        Quantity: quantity,
        Price: price,
        Unit: unitString,
        MinPurchase: minPurchase,
        Description: description,
        Status: statusString,
    }

    params.append('product', JSON.stringify(product));
    files.forEach((item) => {
      params.append('files', item);
    })
    for (var pair of params.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    if(!(name && category && price && quantity && unitString && minPurchase && description && statusString)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    else{
    apiProduct.postProduct(params)
      .then(res => {
        toast.success("Thêm sản phẩm thành công")
        setName("")
        setCategory("")
        setQuantity("")
        setPrice("")
        setUnit("")
        setMinPurchase("")
        setDescription("")
        setStatus("")
        setFiles([])
        setReview([rev])
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
      "Quantity": quantity,
      "Price": price,
      "Unit": unit,
      "MinPurchase": minPurchase,
      "Description": description,
      "Status": status,
    }
    if(!(name && category && price && quantity && unit && minPurchase && description && status)) {
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
          <TextField value={price} onChange={(event) => { setPrice(event.target.value) }}
              size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">Giá trị mua tối thiểu</Typography>
          <TextField value={minPurchase} onChange={(event) => { setMinPurchase(event.target.value) }}
              size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">Số lượng</Typography>
          <TextField value={quantity} onChange={(event) => { setQuantity(event.target.value) }}
              size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">
            Loại sản phẩm:
          </Typography>
          <FormControl className="create-address__input" sx={{flex:"1"}}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
              onChange={e=>setCategory(e.target.value)}
              
              input={<InputCustom placeholder="Chọn loại sản phẩm" />}
            >
              {
                listCategory.map(item => <MenuItem value={item?.id}>{item?.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" >
          <Typography className="cruBrand__label">Mô Tả</Typography>
          <TextField value={description} onChange={(event) => { setDescription(event.target.value) }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>

        <Stack direction="row" >
          <Typography className="cruBrand__label">
            Tình trạng:
          </Typography>
          <FormControl className="create-address__input" sx={{flex:"1"}}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={status}
              label="Status"
              onChange={e=>setStatus(e.target.value)}
              
              input={<InputCustom placeholder="Chọn tình trạng" />}
            >
              {
                productStatus.map(item => <MenuItem value={item.id}>{item.text}</MenuItem>)
              }
            </Select>
          </FormControl>
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
          <Typography className="cruBrand__label" style={{minWidth: "184px"}}>Thêm ảnh:</Typography>
          <Stack >
            <div style={{display: "flex", marginBottom: "5px"}}>
              {review.map((item) => {
                  return <img src={item} width="180px" height="180px" style={{marginRight: "10px"}} alt="" />
              })}
            </div>
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
