import {
  Grid,
  FormControl,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FilterButton from "../components/Button/FilterButton";
import ClearButton from "../components/Button/ClearButton";
import apiProfile from "../apis/apiProfile";
import { Link } from "react-router-dom";

UserSearchForm.propTypes = {
  page: PropTypes.number.isRequired,
  handleSetData: PropTypes.func.isRequired,
};

const searchByItems = [
  { id: 3, label: "NONE", name: "Mặc định" },
  { id: 0, label: "EMAIL", name: "Email" },
  { id: 1, label: "PHONE", name: "Số điện thoại" },
  { id: 2, label: "NAME", name: "Tên người dùng" },
];

export default function UserSearchForm(props) {
  // Theo loại keyword
  const [searchBy, setSearchBy] = useState(3);
  const handleChangeSearchBy = (event) => {
    setSearchBy(event.target.value);
  };
  // Theo nội dung keyword
  const [keyWord, setKeyWord] = useState("");
  const handleChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      let param = {};
      if (searchBy !== 3) {
        param["SearchBy"] = searchBy
      }
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      if (props.page) {
        param["page"] = props.page;
      }
      apiProfile
        .getUserByAdmin(param)
        .then((response) => {
          props.handleSetData(response.data);
        })
        .catch(props.handleSetData({}));
    };
    getData();
  }, [props.page]);

  const handleFilter = () => {
    const getData = async () => {
      let param = {};
      if (searchBy !== 3) {
        param["SearchBy"] = searchBy;
      }
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      apiProfile
        .getUserByAdmin(param)
        .then((response) => {
          props.handleSetData(response.data);
        })
        .catch(props.handleSetData({}));
    };
    getData();
  };

  const handleReset = () => {
    setKeyWord("");
    setSearchBy(3);
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
          <Typography fontSize="26px">Quản lý người dùng</Typography>
          <Stack display={"flex"} flexDirection={"row"}>
            <Link to="/admin/employee">
              <Button variant="outlined" pr={2} sx={{ marginRight: "5px" }}>
                Nhân viên
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
                value={searchBy}
                onChange={handleChangeSearchBy}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                cursor="pointer"
                sx={{ minWidth: 300, width: "70%" }}
              >
                {searchByItems ? (
                  searchByItems.map((item) => (
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
