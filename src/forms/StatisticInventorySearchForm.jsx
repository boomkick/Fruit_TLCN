import { Grid, FormControl, Stack, Typography } from "@mui/material";
import BasicDateRangePicker from "../components/BasicDateRangePicker";
import PropTypes from "prop-types";
import { useState } from "react";
import apiInventory from "../apis/apiInventory";
import FilterButton from "../components/Button/FilterButton";
import ClearButton from "../components/Button/ClearButton";

StatisticInventorySearchForm.propTypes = {
  handleSetData: PropTypes.func.isRequired,
};

export default function StatisticInventorySearchForm(props) {
  const [createdDate, setCreatedDate] = useState([null, null]);
  const handleChangeCreatedDate = (value) => {
    setCreatedDate(value);
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
      apiInventory
        .getNotificationInventory(param)
        .then((response) => {
          props.handleSetData(response.data.result);
        })
        .catch(props.setData({}));
    };
    getData();
  };

  const handleReset = () => {
    setCreatedDate([null, null]);
  };

  return (
    <>
      <Grid container mb={2}>
        <Typography fontSize="26px">Thống kê kho hàng</Typography>
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
