import {
  Grid,
  FormControl,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FilterButton from "../components/Button/FilterButton";
import ClearButton from "../components/Button/ClearButton";
import apiProfile from "../apis/apiProfile";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

EmployeeSearchForm.propTypes = {
  page: PropTypes.number.isRequired,
  handleSetData: PropTypes.func.isRequired,
};

const keyWordTypeItems = [
  { id: 3, label: "NONE", name: "Mặc định" },
  { id: 0, label: "EMAIL", name: "Email" },
  { id: 1, label: "PHONE", name: "Số điện thoại" },
  { id: 2, label: "NAME", name: "Tên nhân viên" },
];

// Remember to subtract 1 unit when sent to BE
const roleItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "ROLE_EMPLOYEE", name: "Nhân viên" },
  { id: 2, label: "ROLE_ADMIN", name: "Quản trị viên" },
];

export default function EmployeeSearchForm(props) {
  // Theo loại keyword
  const [keyWordType, setKeyWordType] = useState(3);
  const handleChangeKeyWordType = (event) => {
    setKeyWordType(event.target.value);
  };
  // Theo nội dung keyword
  const [keyWord, setKeyWord] = useState("");
  const handleChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };
  // Theo vị trí
  const [role, setRole] = useState(0);
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      let param = {};
      // if (keyWordType !== 0) {
      //   param["KeyWordType"] = keyWordType === 1 ? "PHONE" : "NAME";
      // }
      if(keyWordType !== 3)
        param["SearchBy"] = keyWordType;
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      if (role !== 0) {
        param["role"] = roleItems.find((item) => item.id === role).id;
      }
      if (props.page) {
        param["page"] = props.page;
      }
      apiProfile
        .getEmployeeByAdmin(param)
        .then((response) => {
          props.handleSetData(response.data);
          console.log("response.data: ", response.data);
        })
        .catch(props.handleSetData({}));
    };
    getData();
  }, [props.page]);

  const handleFilter = () => {
    const getData = async () => {
      let param = {};
      // if (keyWordType !== 0) {
      //   param["KeyWordType"] = keyWordType === 1 ? "PHONE" : "NAME";
      // }
      if(keyWordType !== 3)
        param["SearchBy"] = keyWordType;
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      if (role !== 0) {
        param["role"] = roleItems.find((item) => item.id === role).id;
      }
      apiProfile
        .getEmployeeByAdmin(param)
        .then((response) => {
          props.handleSetData(response.data);
        })
        .catch(props.handleSetData({}));
    };
    getData();
  };

  const handleReset = () => {
    setKeyWord("");
    setKeyWordType(3);
    setRole(0);
  };

  return (
    <>
      <Grid container mb={2}>
        <Stack
          direction="row"
          mb={1}
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
          sx={{ backgroundColor: "#FFF", height: "80px" }}
          px={2}
        >
          <Typography fontSize="26px">Quản lý nhân viên</Typography>
          <Stack display={"flex"} flexDirection={"row"}>
            <Link to="/admin/user">
              <Button variant="outlined" pr={2} sx={{ marginRight: "5px" }}>
                Người dùng
              </Button>
            </Link>
            <Link to="/admin/employee/update-role/">
              <Button variant="contained" pr={2} sx={{ marginRight: "5px" }} startIcon={<AddIcon />}>
                Thêm mới
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        mb={2}
      >
        <Grid item xs={6}>
          <Stack direction="column">
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
                Tìm kiếm theo:
              </Typography>
              <Select
                value={keyWordType}
                onChange={handleChangeKeyWordType}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                cursor="pointer"
                sx={{ minWidth: 300, width: "70%" }}
              >
                {keyWordTypeItems ? (
                  keyWordTypeItems.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="column">
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
                size="big"
              />
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="column">
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
                Vị trí/ vai trò:
              </Typography>
              <Select
                value={role}
                onChange={handleChangeRole}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                cursor="pointer"
                sx={{ minWidth: 300, width: "70%" }}
              >
                {roleItems ? (
                  roleItems.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
          </Stack>
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
  )
}
