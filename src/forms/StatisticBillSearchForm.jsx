import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import BasicDateRangePicker from "../components/BasicDateRangePicker";
import PropTypes from "prop-types";
import React, { useState } from "react";
import apiStatistics from "../apis/apiStatistic";
import { toast } from "react-toastify";
import ClearButton from "../components/Button/ClearButton";
import FilterButton from "../components/Button/FilterButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

StatisticBillSearchForm.propTypes = {
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

export default function StatisticBillSearchForm(props) {
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

  const handleFilter = () => {
    const getData = async () => {
      let param = {};
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
        param["order"] = order === 1 ? "ASC" : "DESC";
      }
      if (minValue) {
        param["FromTotal"] = minValue;
      }
      if (maxValue) {
        param["ToTotal"] = maxValue;
      }
      apiStatistics
        .getBill(param)
        .then((response) => {
          props.handleSetData(response.data);
        })
        .catch(props.setData(0));
    };
    getData();
  };

  const handleReset = () => {
    setCreatedDate([null, null]);
    setSortBy(0);
    setOrder(0);
    setMinValue("");
    setMaxValue("");
  };

  const handleExportFileExcel = React.useCallback(() => {
    const getData = async () => {
      let param = {};
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
        param["order"] = order === 1 ? "ASC" : "DESC";
      }
      if (minValue) {
        param["FromTotal"] = minValue;
      }
      if (maxValue) {
        param["ToTotal"] = maxValue;
      }
      apiStatistics
        .getBillExport(param)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `StatisticBill.xlsx`);
          document.body.appendChild(link);
          link.click();
        });
    };
    getData();
  }, []);

  return (
    <>
      <Grid container mb={2}>
        <Stack
          width={"100%"}
          direction="row"
          mb={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: "#FFF", height: "80px" }}
          px={2}
        >
          <Typography fontSize="26px">Thống kê hóa đơn</Typography>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            pr={2}
            onClick={handleExportFileExcel}
          >
            Xuất file Excel
          </Button>
        </Stack>
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
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} mr={2}>
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
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} mr={2}>
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
