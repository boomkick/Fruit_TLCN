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
  InputBase,
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import rev from "../../../../assets/img/product_le_han_quoc.jpg";
import SelectBoxAddress from "../../../../components/SelectBoxAddress";
import { useParams, useNavigate } from "react-router-dom";
import { productUnit, productStatus } from "../../../../constraints/Product";
import apiCategory from "../../../../apis/apiCategory";
import apiProduct from "../../../../apis/apiProduct";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function UpdateDetailProduct() {
  const { id } = useParams();
  const [review, setReview] = React.useState([rev]);
  const [files, setFiles] = React.useState([]);
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // Xử lí phần danh sách hình ảnh hiển thị ban đầu
  const [filesEdit, setFilesEdit] = useState([]);
  const [filesStatus, setFilesStatus] = useState([]);
  // Hiển thị button xóa sau khi ấn

  // Tạo file status
  function createStatusFiles(n) {
    let listStatus = [];
    for (let i = 0; i < n; i++) {
      listStatus.push("NONE");
    }
    return listStatus;
  }

  // Get all categories
  useEffect(() => {
    const getData = async () => {
      setListCategory([]);
      apiCategory
        .showAllCategory()
        .then((res) => {
          setListCategory(res.data);
        })
        .catch(() => {
          setListCategory([]);
        });
    };
    getData();
  }, []);

  // Change value of select box

  const onChangeImg = (e) => {
    if (filesStatus.filter((item) => item === "EDIT").length < files.length) {
      toast.info("Bạn đang thêm ảnh vào sản phẩm");
    }
    if (e.target.files.length > 0) {
      if (files.length === 4) {
        toast.info("Số hình ảnh tối đa cho 1 sản phẩm là 4");
      } else {
        let filesState = [...files, e.target.files[0]];
        setFiles(filesState);
        let reviewsState = [...review, URL.createObjectURL(e.target.files[0])];
        if (review[0] === rev) {
          reviewsState = [URL.createObjectURL(e.target.files[0])];
        }
        setReview(reviewsState);
      }
    }
  };

  // handle update product
  const handleUpdate = async () => {
    if (files.length < filesStatus.filter((item) => item === "EDIT").length) {
      let text = "";
      filesStatus
        .filter((item) => item === "EDIT")
        .forEach((item, index) => {
          if (item === "EDIT") {
            text = text + (index + 1) + ", ";
          }
        });
      toast.info(
        "Vui lòng chọn đúng số ảnh, bạn chỉ chỉnh sửa ảnh " + text.slice(0, -2)
      );
      return;
    }
    if (files.length > filesStatus.filter((item) => item === "EDIT").length) {
      let countFile =
        filesStatus.filter((item) => item === "NONE").length + files.length;
      if (countFile > 4) {
        toast.info("Tối đã mỗi sản phẩm chỉ chứa 4 ảnh");
        return;
      }
    }
    // Xử lí tham số tình trạng ảnh chỉnh sửa
    // let text_status = ''
    let unitString = unit == 0 ? "WEIGHT" : "UNIT";
    let statusString =
      status == 0 ? "SELLING" : status == 1 ? "UNSOLD" : "OUT_OF_STOCK";
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
      EditImageStatus: filesStatus,
    };

    params.append("editProduct", JSON.stringify(product));
    files.forEach((item) => {
      params.append("files", item);
    });
    for (var pair of params.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (
      !(
        name &&
        category &&
        price &&
        quantity &&
        unitString &&
        minPurchase &&
        description &&
        statusString
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      await apiProduct
        .putProduct(params, id)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Cập nhật sản phẩm thành công");
            const product = res.data;
            setName(product?.name);
            setCategory(product?.category?.id);
            setQuantity(product?.quantity);
            setPrice(product?.price);
            setUnit(product?.unit);
            setMinPurchase(product?.minPurchase);
            setDescription(product?.description);
            setStatus(product?.status);
            // old image
            setFilesEdit(product?.productImages);
            setFilesStatus(createStatusFiles(product?.productImages?.length));
            // new image
            setFiles([]);
            setReview([]);
          } else {
            toast.error("Cập nhật sản phẩm thất bại!");
          }
        })
        .catch((error) => {
          toast.error("Cập nhật sản phẩm thất bại!");
        });
    }
  };

  // get data for a particular product
  // Set thông tin cho product detail
  useEffect(() => {
    const loaddata = async () => {
      await apiProduct.getProductDetail(id).then((res) => {
        const product = res.data;
        if (product) {
          setName(product?.name);
          setCategory(product?.category?.id);
          setQuantity(product?.quantity);
          setPrice(product?.price);
          setUnit(product?.unit);
          setMinPurchase(product?.minPurchase);
          setDescription(product?.description);
          setStatus(product?.status);
          // old image
          setFilesEdit(product?.productImages);
          setFilesStatus(createStatusFiles(product?.productImages?.length));
          // new image
          setFiles([]);
          setReview([]);
        } else {
          navigate("/admin/product/");
          toast.error("Địa chỉ này không tồn tại!");
        }
      });
    };

    loaddata();
  }, []);

  // Xử lí xóa hình ảnh
  const handleDeleteImage = (event, item, index) => {
    if (filesStatus[index] !== "DELETE") {
      let newFileStatus = filesStatus;
      newFileStatus[index] = "DELETE";
      setFilesStatus(newFileStatus);
      toast.success(`Bạn đã chọn ảnh sản phẩm số ${index + 1} để xóa`);
    } else {
      let newFileStatus = filesStatus;
      newFileStatus[index] = "NONE";
      setFilesStatus(newFileStatus);
      toast.success(`Ảnh sản phẩm số ${index + 1} sẽ không thay đổi`);
    }
  };

  // Xử lí thay đổi hình ảnh
  const handleEditImage = (event, item, index) => {
    if (filesStatus[index] !== "EDIT") {
      let newFileStatus = filesStatus;
      newFileStatus[index] = "EDIT";
      setFilesStatus(newFileStatus);
      toast.success(`Bạn đã chọn ảnh sản phẩm số ${index + 1} để chỉnh sửa`);
    } else {
      let newFileStatus = filesStatus;
      newFileStatus[index] = "NONE";
      setFilesStatus(newFileStatus);
      toast.success(`Ảnh sản phẩm số ${index + 1} sẽ không thay đổi`);
    }
  };

  return (
    <Box width={"100%"} bgcolor="#fff">
      <Stack
        className="cruBrand"
        p={3}
        justifyContent="center"
        width="700px"
        spacing={2}
        bgcolor="#fff"
      >
        <Stack direction="row">
          <Typography className="cruBrand__label">Nhập tên sản phẩm</Typography>
          <TextField
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: "1" }}
          />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">Giá</Typography>
          <TextField
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: "1" }}
          />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">
            Giá trị mua tối thiểu
          </Typography>
          <TextField
            value={minPurchase}
            onChange={(event) => {
              setMinPurchase(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: "1" }}
          />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">Số lượng</Typography>
          <TextField
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: "1" }}
          />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">Loại sản phẩm:</Typography>
          <FormControl className="create-address__input" sx={{ flex: "1" }}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              input={<InputCustom placeholder="Chọn loại sản phẩm" />}
            >
              {listCategory.map((item) => (
                <MenuItem value={item?.id}>{item?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row">
          <Typography className="cruBrand__label">Mô Tả</Typography>
          <TextField
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: "1" }}
          />
        </Stack>

        <Stack direction="row">
          <Typography className="cruBrand__label">Tình trạng:</Typography>
          <FormControl className="create-address__input" sx={{ flex: "1" }}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              input={<InputCustom placeholder="Chọn tình trạng" />}
            >
              {productStatus.map((item) => (
                <MenuItem value={item.id}>{item.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row">
          <Typography className="cruBrand__label">Đơn vị:</Typography>
          <FormControl className="create-address__input" sx={{ flex: "1" }}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={unit}
              label="Age"
              onChange={(e) => setUnit(e.target.value)}
              input={<InputCustom placeholder="Chọn đơn vị" />}
            >
              {productUnit.map((item) => (
                <MenuItem value={item.id}>{item.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" p={2}>
          <Typography className="cruBrand__label" style={{ minWidth: "184px" }}>
            Ảnh sản phẩm:
          </Typography>
          <Stack>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              {filesEdit?.map((item, index) => {
                return (
                  <>
                    <img
                      src={item?.url}
                      width="180px"
                      height="180px"
                      style={{ marginRight: "10px" }}
                      alt=""
                    />
                    <Stack
                      spacing={1}
                      justifyContent="center"
                      py={1}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderRight: "1px solid #ccc",
                        marginRight: "2px",
                      }}
                    >
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        sx={{
                          "&:hover": { color: "green" },
                          transition: "ease 0.2s",
                          borderRadius: "5px",
                        }}
                        onClick={(event) => handleEditImage(event, item, index)}
                      />
                      {filesStatus[index] === "DELETE" ? (
                        <DeleteIcon
                          onClick={(event) =>
                            handleDeleteImage(event, item, index)
                          }
                          variant="outlined"
                          style={{
                            cursor: "pointer",
                            marginTop: "0px",
                            marginLeft: "5px",
                            color: "red",
                          }}
                          sx={{
                            "&:hover": { color: "red" },
                            transition: "ease 0.2s",
                            borderRadius: "5px",
                          }}
                        />
                      ) : (
                        <DeleteIcon
                          onClick={(event) =>
                            handleDeleteImage(event, item, index)
                          }
                          variant="outlined"
                          style={{
                            cursor: "pointer",
                            marginTop: "0px",
                            marginLeft: "5px",
                          }}
                          sx={{
                            "&:hover": { color: "red" },
                            transition: "ease 0.2s",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </Stack>
                  </>
                );
              })}
            </div>
            {/* <input type="file" id="myfile" name="myfile" onChange={onChangeImg}></input> */}
          </Stack>
        </Stack>
        {/* <Stack direction="row" >
          <Typography className="cruBrand__label" style={{minWidth: "184px"}}>Tình trạng ảnh</Typography>
          <Stack style={{display: "flex", flexDirection: "row" }} sx={{ flex: "1" }}>
            {filesStatus.map((item) => {return <>
              <Typography className="cruBrand__label">{item}</Typography>
            </>})}
          </Stack>
        </Stack> */}
        <Stack direction="row" p={2}>
          <Typography className="cruBrand__label" style={{ minWidth: "184px" }}>
            Thêm ảnh chỉnh sửa:
          </Typography>
          <Stack>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              {review.map((item) => {
                return (
                  <img
                    src={item}
                    width="180px"
                    height="180px"
                    style={{ marginRight: "10px" }}
                    alt=""
                  />
                );
              })}
            </div>
            <input
              type="file"
              id="myfile"
              name="myfile"
              onChange={onChangeImg}
            ></input>
          </Stack>
        </Stack>

        <Stack justifyContent="center">
          <Button width="450px" variant="contained" onClick={handleUpdate}>
            {"Cập nhật"}
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

export default UpdateDetailProduct;
