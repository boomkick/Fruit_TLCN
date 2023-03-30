import {
  Grid,
  Button,
  FormControl,
  Stack,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Modal,
} from "@mui/material";
import BasicDateRangePicker from "../components/BasicDateRangePicker";
import PropTypes from "prop-types";
import { useState } from "react";
import apiInventory from "../apis/apiInventory";
import FilterButton from "../components/Button/FilterButton";
import ClearButton from "../components/Button/ClearButton";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { Button } from "bootstrap";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

InventorySearchForm.propTypes = {
  handleSetData: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

const unitByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "WEIGHT", name: "Trọng lượng" },
  { id: 2, label: "UNIT", name: "Đơn vị" },
];

const orderByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "DELIVERY_DATE ", name: "Ngày nhập hàng" },
  { id: 1, label: "EXPIRE_DATE ", name: "Ngày hết hạn" },
  { id: 2, label: "QUANTITY", name: "Số lượng sản phẩm" },
  { id: 2, label: "IMPORT_PRICE", name: "Giá nhập sản phẩm" },
];

const orderSelections = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "ASC", name: "Tăng dần" },
  { id: 2, label: "DESC", name: "Giảm dần" },
];

export default function InventorySearchForm(props) {
  // Khai báo bộ lọc
  // Theo nội dung keyword
  const [keyWord, setKeyWord] = useState("");
  const handleChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  // Theo productId
  const [productId, setProductId] = useState("");
  const handleChangeProductId = (event) => {
    setProductId(event.target.value);
  };

  // Theo số lượng
  const [minQuantity, setMinQuantity] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState(null);
  function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }
  const handleChangeMinQuantity = (event) => {
    if (
      isNumber(event.target.value) ||
      event.target.value === "" ||
      !event.target.value
    ) {
      setMinQuantity(event.target.value);
    } else {
      setMinQuantity("");
      toast.info("Vui lòng nhập chữ số nguyên");
    }
  };

  const handleChangeMaxQuantity = (event) => {
    if (
      isNumber(event.target.value) ||
      event.target.value === "" ||
      !event.target.value
    ) {
      setMaxQuantity(event.target.value);
    } else {
      setMaxQuantity("");
      toast.info("Vui lòng nhập chữ số nguyên");
    }
  };

  // Theo Giá thu mua sản lượng
  const [minImportPrice, setMinImportPrice] = useState(null);
  const [maxImportPrice, setMaxImportPrice] = useState(null);
  const handleChangeMinImportPrice = (event) => {
    if (
      isNumber(event.target.value) ||
      event.target.value === "" ||
      !event.target.value
    ) {
      setMinImportPrice(event.target.value);
    } else {
      setMinImportPrice("");
      toast.info("Vui lòng nhập chữ số nguyên");
    }
  };

  const handleChangeMaxImportPrice = (event) => {
    if (
      isNumber(event.target.value) ||
      event.target.value === "" ||
      !event.target.value
    ) {
      setMaxImportPrice(event.target.value);
    } else {
      setMaxImportPrice("");
      toast.info("Vui lòng nhập chữ số nguyên");
    }
  };

  // Theo ngày nhập hàng
  const [deliveryDate, setDeliveryDate] = useState([null, null]);
  const handleChangeDeliveryDate = (value) => {
    setDeliveryDate(value);
  };

  // Theo ngày hết hạn của chuyến hàng
  const [expireDate, setExpireDate] = useState([null, null]);
  const handleChangeExpireDate = (value) => {
    setExpireDate(value);
  };

  // Theo nhà cung cấp sản phẩm
  const [supplierId, setSupplierId] = useState("");
  const handleChangeSupplierId = (event) => {
    setSupplierId(event.target.value);
  };

  // Theo đơn vị
  const [unit, setUnit] = useState(0);
  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };

  // Sắp xếp loại
  const [orderBy, setOrderBy] = useState(0);
  const handleChangeOrderBy = (event) => {
    setOrderBy(event.target.value);
  };
  const [order, setOrder] = useState(0);
  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  const handleFilter = () => {
    const getData = async () => {
      let param = {
        page: props.page,
        pageSize: 8,
      };
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      if (productId && productId !== "") {
        param["productId"] = productId;
      }
      if (deliveryDate[0] && deliveryDate[0] !== null) {
        param["fromDeliveryDate"] = deliveryDate[0].format("YYYY-MM-DD");
      }
      if (deliveryDate[1] && deliveryDate[1] !== null) {
        param["toDeliveryDate"] = deliveryDate[1].format("YYYY-MM-DD");
      }
      if (expireDate[0] && expireDate[0] !== null) {
        param["fromExpireDate"] = expireDate[0].format("YYYY-MM-DD");
      }
      if (expireDate[1] && expireDate[1] !== null) {
        param["toExpireDate"] = expireDate[1].format("YYYY-MM-DD");
      }
      if (supplierId && supplierId !== "") {
        param["supplierId"] = supplierId;
      }
      if (minQuantity) {
        param["minQuantity"] = minQuantity;
      }
      if (maxQuantity) {
        param["maxQuantity"] = maxQuantity;
      }
      if (minImportPrice) {
        param["minImportPrice"] = minImportPrice;
      }
      if (maxImportPrice) {
        param["maxImportPrice"] = maxImportPrice;
      }
      if (unit !== 0) {
        param["unit"] = unit === 1 ? "WEIGHT" : "UNIT";
      }
      if (orderBy !== 0) {
        param["orderBy"] = orderByItems.find(
          (item) => item.id === orderBy
        ).label;
      }
      if (order !== 0) {
        param["order"] = order === 1 ? "ASC" : "DESC";
      }
      apiInventory
        .getInventory(param)
        .then((response) => {
          props.handleSetData(response.data.data);
        })
        .catch(props.handleSetData([]));
    };
    getData();
  };

  const handleReset = () => {
    setKeyWord("");
    setProductId("");
    setMinQuantity("");
    setMaxQuantity("");
    setMinImportPrice("");
    setMaxImportPrice("");
    setDeliveryDate([null, null]);
    setExpireDate([null, null]);
    setSupplierId("");
    setUnit(0);
    setOrderBy(0);
    setOrder(0);
  };

  return (
    <>
      <Box className="productAdmin">
        <Stack
          direction="row"
          mb={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: "#FFF", height: "80px" }}
          px={2}
        >
          <Typography fontSize="26px">Quản lý kho hàng</Typography>
          <Link to="/admin/inventory/create">
            <Button variant="outlined" pr={2}>
              Nhập hàng
            </Button>
          </Link>
        </Stack>

        <Box style={{ backgroundColor: "#fff", p: 2, m: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            style={{ flexWrap: "wrap", justifyContent: "space-between" }}
          >
            <Stack direction="column" sx={{ width: "45%", marginLeft: "8px" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Nội dung tìm kiếm:
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Nội dung"
                  value={keyWord}
                  onChange={handleChangeKeyWord}
                  variant="outlined"
                  sx={{ width: "70%" }}
                  size="small"
                />
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%", marginLeft: "8px" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  ID sản phẩm:
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="ID sản phẩm"
                  value={productId}
                  onChange={handleChangeProductId}
                  variant="outlined"
                  sx={{ width: "70%" }}
                  size="small"
                />
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Số lượng:
                </Typography>
                <Stack direction="row" width="70%" style={{ display: "flex" }}>
                  <TextField
                    id="outlined-basic"
                    label="Từ"
                    value={minQuantity}
                    onChange={handleChangeMinQuantity}
                    variant="outlined"
                    sx={{ width: "40%" }}
                    size="small"
                  />
                  <Typography
                    sx={{ fontSize: "16px", padding: "7px 10px 0px 10px" }}
                  >
                    Đến:
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Đến"
                    value={maxQuantity}
                    onChange={handleChangeMaxQuantity}
                    variant="outlined"
                    sx={{ width: "40%" }}
                    size="small"
                  />
                </Stack>
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Giá nhập:
                </Typography>
                <Stack direction="row" width="70%" style={{ display: "flex" }}>
                  <TextField
                    id="outlined-basic"
                    label="Từ"
                    value={minImportPrice}
                    onChange={handleChangeMinImportPrice}
                    variant="outlined"
                    sx={{ width: "40%" }}
                    size="small"
                  />
                  <Typography
                    sx={{ fontSize: "16px", padding: "7px 10px 0px 10px" }}
                  >
                    Đến:
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Đến"
                    value={maxImportPrice}
                    onChange={handleChangeMaxImportPrice}
                    variant="outlined"
                    sx={{ width: "40%" }}
                    size="small"
                  />
                </Stack>
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Ngày nhập:
                </Typography>
                <BasicDateRangePicker
                  onChangeCreatedDate={handleChangeDeliveryDate}
                  value={deliveryDate}
                />
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Ngày hết hạn:
                </Typography>
                <BasicDateRangePicker
                  onChangeCreatedDate={handleChangeExpireDate}
                  value={expireDate}
                />
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%", marginLeft: "8px" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  ID nhà cung cấp:
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="ID nhà cung cấp"
                  value={supplierId}
                  onChange={handleChangeSupplierId}
                  variant="outlined"
                  sx={{ width: "70%" }}
                  size="small"
                />
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Đơn vị:
                </Typography>
                <Select
                  value={unit}
                  onChange={handleChangeUnit}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  sx={{ minWidth: 300, width: "70%" }}
                >
                  {unitByItems ? (
                    unitByItems.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Sắp xếp loại:
                </Typography>
                <Select
                  value={orderBy}
                  onChange={handleChangeOrderBy}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  sx={{ minWidth: 300, width: "70%" }}
                >
                  {orderByItems ? (
                    orderByItems.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Sắp xếp theo:
                </Typography>
                <Select
                  value={order}
                  onChange={handleChangeOrder}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  sx={{ minWidth: 300, width: "70%" }}
                >
                  {orderSelections ? (
                    orderSelections.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            style={{
              flexWrap: "wrap",
              justifyContent: "space-between",
              margin: "0px 10px 10px 10px",
            }}
          >
            <Stack width="130px">
              {/* <Button
                variant="contained"
                startIcon={<FilterAltIcon />}
                style={{ padding: "7px 10px" }}
                onClick={handleFilter}
              >
                Bộ lọc
              </Button> */}
              <FilterButton handleFilter={handleFilter}/>
            </Stack>
            <Stack width="130px">
              {/* <Button
                variant="contained"
                endIcon={<RotateLeftIcon />}
                style={{ padding: "7px 10px" }}
                onClick={handleReset}
              >
                Làm mới
              </Button> */}
              <ClearButton handleReset={handleReset}/>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
