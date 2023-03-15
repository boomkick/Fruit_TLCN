import { Button, FormControl, Stack, Typography } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import BasicDateRangePicker from "../components/BasicDateRangePicker";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import PropTypes from "prop-types";
import { useState } from "react";
import apiStatistics from "../apis/apiStatistic";
import "bootstrap/dist/css/bootstrap.min.css"

StatisticCartSearchForm.propTypes = {
  handleSetData: PropTypes.func.isRequired,
};

export default function StatisticCartSearchForm(props) {
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
      apiStatistics
        .getCart(param)
        .then((response) => {
          props.handleSetData(response.data);
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
      <Row >
        <Typography fontSize="26px">Thống kê đơn hàng</Typography>
      </Row>
      <Row className="mt-3">
        <Col>
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
        </Col>
      </Row>
      <Row className="mt-3 mb-3 justify-content-between">
        <Stack width="130px">
          <Button
            variant="contained"
            startIcon={<FilterAltIcon />}
            style={{ padding: "7px 10px" }}
            onClick={handleFilter}
          >
            Bộ lọc
          </Button>
        </Stack>
        <Stack width="130px">
          <Button
            variant="contained"
            endIcon={<RotateLeftIcon />}
            style={{ padding: "7px 10px" }}
            onClick={handleReset}
          >
            Làm mới
          </Button>
        </Stack>
      </Row>
    </>
  );
}
