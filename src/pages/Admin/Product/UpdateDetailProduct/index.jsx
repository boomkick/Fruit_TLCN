 /* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
// import apiBrand from "../../../../apis/apiBrand";
import "./UpdateDetailProduct.scss";
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

class ProductImageEdit {
  constructor(id, url, editStatus, file) {
    this.id = id,
    this.url = url,
    this.editStatus = editStatus,
    this.file = file
  }
}

function UpdateDetailProduct() {
  const {id} = useParams()
  const [review, setReview] = React.useState([rev])
  const [files, setFiles] = React.useState([])
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

  // Xử lí phần danh sách hình ảnh hiển thị ban đầu
  const [filesEdit, setFilesEdit] = useState([])

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
        let reviewsState = [...review, URL.createObjectURL(e.target.files[0])]
        if (review[0] === rev) {
          reviewsState = [URL.createObjectURL(e.target.files[0])]
        }
        setReview(reviewsState)
      }
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

  // get data for a particular product
  // Set thông tin cho product detail
  useEffect(() => {
    const loaddata = async () => {
          console.log(id)
          await apiProduct.getProductDetail(id)
          .then(res => {
            const product = res.data
              if (product) {
                setName(product?.name)
                setCategory(product?.category?.id)
                setQuantity(product?.quantity)
                setPrice(product?.price)
                setUnit(product?.unit)
                setMinPurchase(product?.minPurchase)
                setDescription(product?.description)
                setStatus(product?.status)
                // old image
                let listProductImageEdit = []
                product?.productImages.forEach(item => {
                  let productImageEdit = new ProductImageEdit(item.id, item.url, "None", null);
                  listProductImageEdit.push(productImageEdit)
                });
                setFilesEdit(listProductImageEdit)
                // new image
                setFiles([])
                setReview([])
              }
              else {
                navigate("/admin/product/")
                toast.error("Địa chỉ này không tồn tại!")
              }
          })
    }
    loaddata()
  }, [])

  // Xử lí xóa hình ảnh
  const handleDeleteImage = (index) => {
    let oldFile = filesEdit
    let newItem = oldFile.pop(index)
    newItem.editStatus = "DELETE"
    console.log("filesEdit", filesEdit)
    console.log("newItem", newItem)
    setFilesEdit([...oldFile, newItem]);
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
        <Stack direction="row" p={2}>
          <Typography className="cruBrand__label" style={{minWidth: "184px"}}>Ảnh sản phẩm:</Typography>
          <Stack >
            <div style={{display: "flex", marginBottom: "5px"}}>
              {filesEdit.map((item, index) => {
                  return (<>
                    <img src={item?.url} width="180px" height="180px" style={{marginRight: "10px"}} alt="" />
                    <Stack spacing={1} justifyContent="center" py={1} style={{display: "flex", flexDirection: "row", borderRight: "1px solid #ccc", marginRight: "2px"}}>
                        <EditIcon 
                        style={{cursor: "pointer"}} 
                        sx={{
                          "&:hover": { color: "#FFFFFF", backgroundColor: "green" }, 
                          transition: "ease 0.2s",
                          borderRadius: "5px"
                        }}
                        onClick={() => toast.error("Bạn đã xác nhận edit sản phẩm này")}
                        />
                      {/* <Button onClick={() => openDialogDeleteAll(item)} variant="outlined" color="error">
                        Xóa
                      </Button> */}
                      <DeleteIcon onClick={handleDeleteImage(item)} variant="outlined" style={{cursor: "pointer", marginTop: "0px", marginLeft: "5px"}} 
                      sx={{
                        "&:hover": { color: "#FFFFFF", backgroundColor: "red" }, 
                        transition: "ease 1s",
                        borderRadius: "5px",
                      }}/>
                    </Stack>
                  </>)
              })}
            </div>
            <input type="file" id="myfile" name="myfile" onChange={onChangeImg}></input>
          </Stack>
        </Stack>
        <Stack direction="row" p={2}>
          <Typography className="cruBrand__label" style={{minWidth: "184px"}}>Thêm ảnh chỉnh sửa:</Typography>
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
          <Button width="450px" variant="contained" onClick={handleUpdate} >{"Cập nhật"}</Button>
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

export default UpdateDetailProduct;
