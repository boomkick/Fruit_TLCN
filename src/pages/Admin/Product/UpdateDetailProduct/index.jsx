/* eslint-disable */
import React, { Fragment, useCallback } from "react";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import FileUploadIcon from "@mui/icons-material/FileUpload";
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
  InputBase,
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { productUnit, productStatus } from "../../../../constraints/Product";
import apiCategory from "../../../../apis/apiCategory";
import apiProduct from "../../../../apis/apiProduct";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Loading from "../../../../components/Loading";

function UpdateDetailProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("UNIT");
  const [minPurchase, setMinPurchase] = useState("1");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [weight, setWeight] = useState('');
  const [loadingUpdateProduct, setloadingUpdateProduct] = useState(false);
  const navigate = useNavigate();

  // Xử lí hình ảnh
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [fourthImage, setFourthImage] = useState(null);

  const handleChangeEditImage = useCallback((position, action) => {
    if (filesStatus[position - 1] != "NA") {
      setFilesStatus((filesStatus) =>
        filesStatus.map((item, index) =>
          index === position - 1 ? action : item
        )
      );
    }
  }, []);

  // Xử lí phần danh sách hình ảnh hiển thị ban đầu
  const [filesEdit, setFilesEdit] = useState([]);
  const [filesStatus, setFilesStatus] = useState([]);

  // Tạo file status
  function createStatusFiles(n) {
    let listStatus = [];
    for (let i = 0; i < 4; i++) {
      if (i > n - 1) listStatus.push("NA");
      else listStatus.push("NONE");
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

  // handle update product
  const handleUpdate = async () => {
    setloadingUpdateProduct(true);
    // Xử lí tham số tình trạng ảnh chỉnh sửa
    // let text_status = ''
    let unitString = "UNIT";
    let statusString = status == 0 ? "SELLING" : "UNSOLD";
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
      Weight: weight,
      EditImageStatus: filesStatus.filter((item) => item != "NA"),
    };

    params.append("editProduct", JSON.stringify(product));
    [firstImage, secondImage, thirdImage, fourthImage].forEach((item) => {
      if (item) params.append("files", item);
    });

    for (var pair of params.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (
      !(
        name &&
        category &&
        price &&
        unitString &&
        minPurchase &&
        description &&
        statusString &&
        weight
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      setloadingUpdateProduct(false);
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
            setFilesEdit(product?.productImages);
            setWeight(product?.weight)
            setFilesStatus(createStatusFiles(product?.productImages?.length));
            navigate("/admin/product/");
            setloadingUpdateProduct(false);
          } else {
            toast.error("Cập nhật sản phẩm thất bại!");
            setloadingUpdateProduct(false);
          }
        })
        .catch((error) => {
          setloadingUpdateProduct(false);
          toast.error("Cập nhật sản phẩm thất bại!");
        });
    }
  };

  // get data for a particular product
  const getProduct = React.useCallback(() => {
    const loaddata = async () => {
      await apiProduct.getProductDetail(id).then((res) => {
        const product = res.data;
        if (product) {
          setName(product?.name);
          setCategory(product?.category?.id);
          setQuantity(product?.quantity);
          setPrice(product?.price);
          setUnit(product?.unit);
          setMinPurchase("1");
          setDescription(product?.description);
          setStatus(product?.status);
          setWeight(product?.weight)
          // old image
          setFilesEdit(product?.productImages);
          setFilesStatus(createStatusFiles(product?.productImages?.length));
        } else {
          navigate("/admin/product/");
          toast.error("Địa chỉ này không tồn tại!");
        }
      });
    };

    loaddata();
  }, []);

  // Set thông tin cho product detail
  useEffect(() => {
    getProduct();
  }, []);

  const handleReset = useCallback(() => {
    setFirstImage(null);
    setSecondImage(null);
    setThirdImage(null);
    setFourthImage(null);
    setFilesEdit([]);
    setFilesStatus([]);
    getProduct();
  }, []);

  useEffect(() => {
    filesEdit.forEach((item, index) => {
      if (index === 0) setFirstImage(item);
      else if (index === 1) setSecondImage(item);
      else if (index === 2) setThirdImage(item);
      else if (index === 3) setFourthImage(item);
    });
  }, [filesEdit]);

  return (
    <Box width={"100%"} bgcolor="#fff">
      <Stack
        className="cruBrand"
        p={3}
        justifyContent="center"
        width="1035px"
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
          <Typography className="cruBrand__label">Khối lượng</Typography>
          <TextField
            value={weight}
            onChange={(event) => {
              setWeight(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: "1" }}
            helperText= 'Đơn vị gram'
          />
        </Stack>
        <Stack direction="row">
          <Typography className="cruBrand__label">Số lượng</Typography>
          <TextField
            disabled={true}
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
            maxRows={10}
            rows={5}
            multiline={true}
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

        <Stack direction="row" p={2}>
          <Typography className="cruBrand__label" style={{ minWidth: "184px" }}>
            Ảnh sản phẩm:
          </Typography>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between  "}
            alignItem={"center"}
            width={"100%"}
          >
            <Stack
              display={"flex"}
              flexDirection={"column"}
              flex={"1"}
              justifyContent={"center"}
              alignItem={"center"}
            >
              <img
                src={
                  firstImage
                    ? firstImage?.url
                      ? firstImage?.url
                      : URL.createObjectURL(firstImage)
                    : null
                }
                width="180px"
                height="180px"
                style={{ marginRight: "10px" }}
                alt=""
              />
              <Stack
                spacing={1}
                py={1}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: "10px",
                  justifyContent: "space-around",
                }}
              >
                {firstImage ? (
                  <>
                    <Fragment>
                      <input
                        color="primary"
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                          setFirstImage(e.target.files[0]);
                          handleChangeEditImage(1, "EDIT");
                        }}
                        id="icon-button-file1"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="icon-button-file1">
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          color="success"
                          component={"span"}
                          sx={{ marginTop: "0px !important" }}
                        >
                          Edit
                        </Button>
                      </label>
                    </Fragment>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => {
                        setFirstImage(null);
                        handleChangeEditImage(1, "DELETE");
                      }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Fragment>
                    <input
                      color="primary"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        setFirstImage(e.target.files[0]);
                        handleChangeEditImage(1, "EDIT");
                      }}
                      id="icon-button-file1"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="icon-button-file1">
                      <Button
                        variant="outlined"
                        startIcon={<FileUploadIcon />}
                        sx={{ marginTop: "0px !important" }}
                        component={"span"}
                      >
                        Upload
                      </Button>
                    </label>
                  </Fragment>
                )}
              </Stack>
            </Stack>
            <Stack
              display={"flex"}
              flexDirection={"column"}
              flex={"1"}
              justifyContent={"center"}
              alignItem={"center"}
            >
              <img
                src={
                  secondImage
                    ? secondImage?.url
                      ? secondImage?.url
                      : URL.createObjectURL(secondImage)
                    : null
                }
                width="180px"
                height="180px"
                style={{ marginRight: "10px" }}
                alt=""
              />
              <Stack
                spacing={1}
                py={1}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: "10px",
                  justifyContent: "space-around",
                }}
              >
                {secondImage ? (
                  <>
                    <Fragment>
                      <input
                        color="primary"
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                          setSecondImage(e.target.files[0]);
                          handleChangeEditImage(2, "EDIT");
                        }}
                        id="icon-button-file2"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="icon-button-file2">
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          color="success"
                          component={"span"}
                        >
                          Edit
                        </Button>
                      </label>
                    </Fragment>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => {
                        setSecondImage(null);
                        handleChangeEditImage(2, "DELETE");
                      }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Fragment>
                    <input
                      color="primary"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        setSecondImage(e.target.files[0]);
                        handleChangeEditImage(2, "EDIT");
                      }}
                      id="icon-button-file2"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="icon-button-file2">
                      <Button
                        variant="outlined"
                        startIcon={<FileUploadIcon />}
                        sx={{ marginTop: "0px !important" }}
                        component={"span"}
                      >
                        Upload
                      </Button>
                    </label>
                  </Fragment>
                )}
              </Stack>
            </Stack>
            <Stack
              display={"flex"}
              flexDirection={"column"}
              flex={"1"}
              justifyContent={"center"}
              alignItem={"center"}
            >
              <img
                src={
                  thirdImage
                    ? thirdImage?.url
                      ? thirdImage?.url
                      : URL.createObjectURL(thirdImage)
                    : null
                }
                width="180px"
                height="180px"
                style={{ marginRight: "10px" }}
                alt=""
              />
              <Stack
                spacing={1}
                py={1}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: "10px",
                  justifyContent: "space-around",
                }}
              >
                {thirdImage ? (
                  <>
                    <Fragment>
                      <input
                        color="primary"
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                          setThirdImage(e.target.files[0]);
                          handleChangeEditImage(3, "EDIT");
                        }}
                        id="icon-button-file3"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="icon-button-file3">
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          color="success"
                          component={"span"}
                        >
                          Edit
                        </Button>
                      </label>
                    </Fragment>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => {
                        setThirdImage(null);
                        handleChangeEditImage(3, "DELETE");
                      }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Fragment>
                    <input
                      color="primary"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        setThirdImage(e.target.files[0]);
                        handleChangeEditImage(3, "EDIT");
                      }}
                      id="icon-button-file3"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="icon-button-file3">
                      <Button
                        variant="outlined"
                        startIcon={<FileUploadIcon />}
                        sx={{ marginTop: "0px !important" }}
                        component={"span"}
                      >
                        Upload
                      </Button>
                    </label>
                  </Fragment>
                )}
              </Stack>
            </Stack>

            <Stack
              display={"flex"}
              flexDirection={"column"}
              flex={"1"}
              justifyContent={"center"}
              alignItem={"center"}
            >
              <img
                src={
                  fourthImage
                    ? fourthImage?.url
                      ? fourthImage?.url
                      : URL.createObjectURL(fourthImage)
                    : null
                }
                width="180px"
                height="180px"
                style={{ marginRight: "10px" }}
                alt=""
              />
              <Stack
                spacing={1}
                py={1}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: "10px",
                  justifyContent: "space-around",
                }}
              >
                {fourthImage ? (
                  <>
                    <Fragment>
                      <input
                        color="primary"
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                          setFourthImage(e.target.files[0]);
                          handleChangeEditImage(4, "EDIT");
                        }}
                        id="icon-button-file4"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="icon-button-file4">
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          color="success"
                          component={"span"}
                        >
                          Edit
                        </Button>
                      </label>
                    </Fragment>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => {
                        setFourthImage(null);
                        handleChangeEditImage(4, "DELETE");
                      }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Fragment>
                    <input
                      color="primary"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        setFourthImage(e.target.files[0]);
                        handleChangeEditImage(4, "EDIT");
                      }}
                      id="icon-button-file4"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="icon-button-file4">
                      <Button
                        variant="outlined"
                        startIcon={<FileUploadIcon />}
                        sx={{ marginTop: "0px !important" }}
                        component={"span"}
                      >
                        Upload
                      </Button>
                    </label>
                  </Fragment>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" flexDirection={"row"}>
          <Button
            variant="contained"
            onClick={handleReset}
            sx={{ marginRight: "10px", width: "120px" }}
            style={{ backgroundColor: "#74768B" }}
            startIcon={<RotateLeftIcon />}
          >
            {"Reset"}
          </Button>

          <Stack justifyContent="end" flexDirection={"row"}>
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{ marginRight: "10px", width: "120px" }}
              startIcon={loadingUpdateProduct ? null : <SaveIcon />}
            >
              {loadingUpdateProduct && <Loading />}Cập nhật
            </Button>
            <Button
              variant="contained"
              color={"error"}
              startIcon={<CancelIcon />}
              onClick={() => navigate("/admin/product")}
            >
              {"Hủy bỏ"}
            </Button>
          </Stack>
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
