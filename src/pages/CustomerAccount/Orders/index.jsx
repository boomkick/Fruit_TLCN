import { useState, memo } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Pagination,
  Stack,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import "./Orders.scss";
import OrderItem from "../../../components/OrderItem/index.jsx";
import { orderTabs } from "../../../constraints/OrderItem";
import { useEffect } from "react";
import apiCart from "../../../apis/apiCart";
import { useSelector } from "react-redux";
import BasicDateRangePicker from "../../../components/BasicDateRangePicker";
import { toast } from "react-toastify";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const paymentMethods = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 2, label: "MOMO", name: "Dịch vụ thanh toán momo" },
  { id: 1, label: "CASH", name: "Tiền mặt" },
];

const sortByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "PURCHASEDATE ", name: "Ngày đặt hàng" },
  { id: 2, label: "TOTAL", name: "Tổng hóa đơn" },
];

const orderByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "ASC", name: "Tăng dần" },
  { id: 2, label: "DESC", name: "Giảm dần" },
];

function Orders() {
  const [selected, setSelected] = useState(0);
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const user = useSelector((state) => state.auth.user);

  // Khai báo bộ lọc
  // Theo phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState(0);
  const handleChangePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Theo ngày khởi tại
  const [createdDate, setCreatedDate] = useState([null, null]);
  const handleChangeCreatedDate = (value) => {
    setCreatedDate(value);
  };

  // Theo tổng hóa đơn
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }
  const handleChangeMinValue = (event) => {
    if (
      isNumber(event.target.value) ||
      event.target.value === "" ||
      !event.target.value
    ) {
      setMinValue(event.target.value);
    } else {
      setMinValue("");
      toast.info("Vui lòng nhập chữ số nguyên");
    }
  };

  const handleChangeMaxValue = (event) => {
    if (
      isNumber(event.target.value) ||
      event.target.value === "" ||
      !event.target.value
    ) {
      setMaxValue(event.target.value);
    } else {
      setMaxValue("");
      toast.info("Vui lòng nhập chữ số nguyên");
    }
  };

  // Sắp xếp loại
  const [sortBy, setSortBy] = useState([0]);
  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const [order, setOrder] = useState([0]);
  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  // Xử lí khi người dùng thay đổi tình trạng đơn hàng
  useEffect(() => {
    const getData = async () => {
      let param = {
        page: 1,
        pageSize: 8,
      };
      if (selected != 3) {
        param["status"] = selected;
      }
      setOrders([]);
      await apiCart
        .getOrdersFilterOfUser(param)
        .then((response) => {
          setOrders(response.data.carts);
          setMaxPage(response.data.maxPage);
        })
        .catch(setOrders([]));
    };
    handleReset();
    getData();
  }, [user, selected]);

  // Xử lí khi người dùng đổi trang
  useEffect(() => {
    const getData = async () => {
      let param = {
        page: currentPage,
        pageSize: 8,
      };
      if (selected != 3) {
        param["status"] = selected;
      }
      setOrders([]);
      await apiCart
        .getOrdersFilterOfUser(param)
        .then((response) => {
          setOrders(response.data.carts);
          setMaxPage(response.data.maxPage);
        })
        .catch(setOrders([]));
    };
    getData();
  }, [currentPage]);

  // Đổi tình trạng đơn hàng
  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  // Đổi trang
  const handleChangePage = (event, newValue) => {
    setCurrentPage(newValue);
  };

  // Xử lí lọc
  const handleFilter = () => {
    if (parseInt(maxValue) < parseInt(minValue)) {
      toast.error("Nhập giá trị sau lớn hơn");
      return;
    }
    const getData = async () => {
      let param = {
        page: 1,
        pageSize: 8,
      };
      if (selected != 3) {
        param["status"] = selected;
      }
      if (createdDate[0] && createdDate[0] !== null) {
        param["fromDate"] = createdDate[0].format("YYYY-MM-DD");
      }
      if (createdDate[1] && createdDate[1] !== null) {
        param["toDate"] = createdDate[1].format("YYYY-MM-DD");
      }
      if (minValue) {
        param["fromTotal"] = minValue;
      }
      if (maxValue) {
        param["toTotal"] = maxValue;
      }
      if (paymentMethod !== 0) {
        // Nếu pttt là 1 trên FE -> CASH, còn 2 thì là MOMO
        // Ở dưới BE 0 -> CASH, 1 -> MOMO
        param["paymentMethod"] = paymentMethod == 1 ? 0 : 1;
      }
      if (sortBy !== 0) {
        param["SortBy"] = sortBy == 1 ? "PURCHASEDATE" : "TOTAL";
      }
      if (order !== 0) {
        param["order"] = order == 1 ? "ASC" : "DESC";
      }
      setOrders([]);
      apiCart
        .getOrdersFilterOfUser(param)
        .then((response) => {
          setOrders(response.data.carts);
          setMaxPage(response.data.maxPage);
        })
        .catch(setOrders([]));
    };
    getData();
  };

  const handleReset = () => {
    setCreatedDate([null, null]);
    setMinValue("");
    setMaxValue("");
    setPaymentMethod(0);
    setSortBy(0);
    setOrder(0);
  };

  return (
    <>
      <Typography variant="h6">Đơn hàng của tôi</Typography>
      <Box className="myorder" sx={{ width: "100%" }}>
        <Box className="myorder__tabs">
          <Tabs
            value={selected}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {orderTabs.map((item) => (
              <Tab
                key={item.id}
                label={item.type}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "400",
                }}
                {...a11yProps(item.id)}
              />
            ))}
          </Tabs>
        </Box>
        <Box
          style={{
            marginTop: "10px",
            backgroundColor: "aliceblue",
            borderRadius: "5px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            style={{ flexWrap: "wrap", justifyContent: "space-between" }}
          >
            <Stack direction="column" sx={{ width: "48%" }}>
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
                <Typography className={"create-selectbox__label"}>
                  Thanh toán bằng:
                </Typography>
                <Select
                  value={paymentMethod}
                  onChange={handleChangePaymentMethod}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  className="create-selectbox__input"
                  size="small"
                >
                  {paymentMethods ? (
                    paymentMethods.map((item) => (
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
                <Typography className={"create-selectbox__label"}>
                  Ngày tạo:
                </Typography>
                <BasicDateRangePicker
                  onChangeCreatedDate={handleChangeCreatedDate}
                  value={createdDate}
                  className="create-selectbox__input"
                  status="ClientOrderFilter"
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
                <Typography className={"create-selectbox__label"}>
                  Tổng hóa đơn:
                </Typography>
                <Stack direction="row" width="70%" style={{ display: "flex" }}>
                  <TextField
                    id="outlined-basic"
                    label="Giá từ"
                    value={minValue}
                    onChange={handleChangeMinValue}
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
                    value={maxValue}
                    onChange={handleChangeMaxValue}
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
                <Typography className={"create-selectbox__label"}>
                  Sắp xếp loại:
                </Typography>
                <Select
                  value={sortBy}
                  onChange={handleChangeSortBy}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  size="small"
                  className="create-selectbox__input"
                >
                  {sortByItems ? (
                    sortByItems.map((item) => (
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
                <Typography className={"create-selectbox__label"}>
                  Sắp xếp theo:
                </Typography>
                <Select
                  value={order}
                  onChange={handleChangeOrder}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  size="small"
                  className="create-selectbox__input"
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
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            style={{ flexWrap: "wrap", justifyContent: "space-between" }}
          >
            <Stack width="130px">
              <Button
                variant="contained"
                startIcon={<FilterAltIcon />}
                style={{ padding: "7px 10px", margin: "0px 0px 10px 10px" }}
                onClick={handleFilter}
              >
                Bộ lọc
              </Button>
            </Stack>
            <Stack width="130px">
              <Button
                variant="contained"
                endIcon={<RotateLeftIcon />}
                style={{ padding: "7px 10px", margin: "0px 10px 10px 0px" }}
                onClick={handleReset}
              >
                Làm mới
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box>
          {orders.length === 0 ? (
            <TabPanel
              key={selected}
              value={selected}
              index={selected}
              dir={theme.direction}
            >
              <Box className="myorder__none">
                <img
                  height="200px"
                  width="200px"
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                  alt=""
                />
                <Typography>Chưa có đơn hàng</Typography>
              </Box>
            </TabPanel>
          ) : (
            <TabPanel
              key={selected}
              value={selected}
              index={selected}
              dir={theme.direction}
            >
              {orders.map((item) => (
                <OrderItem key={item.id} order={item} />
              ))}
            </TabPanel>
          )}

          {maxPage > 1 ? (
            <Stack spacing={2}>
              <Pagination
                count={maxPage}
                page={currentPage}
                onChange={handleChangePage}
                style={{ justifyContent: "center", display: "flex" }}
              />
            </Stack>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const getOrderByType = (orders, id) => {
  let result = id === 3 ? orders : orders.filter((item) => item.status === id);
  return result;
};

export default memo(Orders);
