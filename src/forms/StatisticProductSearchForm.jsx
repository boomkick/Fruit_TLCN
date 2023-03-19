import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import BasicDateRangePicker from "../components/BasicDateRangePicker";
import PropTypes from "prop-types";
import { useState } from "react";
import apiStatistics from "../apis/apiStatistic";
import FilterButton from "../components/Button/FilterButton";
import ClearButton from "../components/Button/ClearButton";

StatisticProductSearchForm.propTypes = {
  handleSetData: PropTypes.func.isRequired,
};

const sortByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "PRODUCTNAME ", name: "Tên sản phẩm" },
  { id: 2, label: "SALE", name: "Số lượng bán được" },
  { id: 3, label: "PROFIT", name: "Lợi nhuận" },
];

const orderByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "ASC", name: "Tăng dần" },
  { id: 2, label: "DESC", name: "Giảm dần" },
];

export default function StatisticProductSearchForm(props) {
  //Theo keyword
  const [keyWord, setKeyWord] = useState("");
  const handleChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  // Theo ngày khởi tạo
  const [createdDate, setCreatedDate] = useState([null, null]);
  const handleChangeCreatedDate = (value) => {
    setCreatedDate(value);
  };

  // Sắp xếp loại
  const [sortBy, setSortBy] = useState(0);
  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const [order, setOrder] = useState(0);
  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };

  const handleFilter = () => {
    const getData = async () => {
      let param = {};
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      if (createdDate[0] && createdDate[0] !== null) {
        param["FromDate"] = createdDate[0].format("YYYY-MM-DD");
      }
      if (createdDate[1] && createdDate[1] !== null) {
        param["ToDate"] = createdDate[1].format("YYYY-MM-DD");
      }
      if (sortBy !== 0) {
        param["SortBy"] = sortByItems.find((item) => item.id === sortBy).label;
      }
      if (order !== 0) {
        param["order"] = order == 1 ? "ASC" : "DESC";
      }
      apiStatistics
        .getProduct(param)
        .then((response) => {
          props.handleSetData(response.data);
        })
        .catch(props.setData(0));
    };
    getData();
  };

  const handleReset = () => {
    setKeyWord("");
    setCreatedDate([null, null]);
    setSortBy(0);
    setOrder(0);
  };

  return (
    <>
      <Grid container mb={2}>
        <Typography fontSize="26px">Thống kê sản phẩm</Typography>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        mb={2}
      >
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={6}>
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
            <Typography
              sx={{ fontSize: "16px", fontWeight: "bold", marginRight: "10px" }}
            >
              Ngày tạo:
            </Typography>
            <BasicDateRangePicker
              onChangeCreatedDate={handleChangeCreatedDate}
              value={createdDate}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
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
              value={sortBy}
              onChange={handleChangeSortBy}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              cursor="pointer"
              sx={{ minWidth: 300, width: "70%" }}
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
        </Grid>
        <Grid item xs={6}>
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
              {orderByItems ? (
                orderByItems.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Grid item xs={1}>
          <Stack width={"100%"}>
            <FilterButton handleFilter={handleFilter} />
          </Stack>
        </Grid>
        <Grid item xs={1}>
          <Stack width={"100%"}>
            <ClearButton handleReset={handleReset} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
