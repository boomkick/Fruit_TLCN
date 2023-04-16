import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiProfile from "../../../../apis/apiProfile";
import apiLocation from "../../../../apis/apiLocation";
import { role } from "../../../../constraints/Role";
import UserDetailCart from "../UserDetailCart";

function DetailUser() {
  const id = useParams().id;
  const navigate = useNavigate();

  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // Gán danh sách dữ liệu của thành phố -> quận -> phường
  useEffect(() => {
    const setDataCity = async () => {
      apiLocation
        .getListCity()
        .then((res) => {
          setListCity(res.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    };

    setDataCity();
  }, [id]);

  useEffect(() => {
    const setDataDistrict = async () => {
      apiLocation
        .getListDistrictByCityId({ cityId: selectedCity })
        .then((res) => {
          setListDistrict(res.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    };

    setDataDistrict();
  }, [selectedCity]);

  useEffect(() => {
    const setDataWard = async () => {
      apiLocation
        .getListWardByCityIdAndDistrictId({
          cityId: selectedCity,
          districtId: selectedDistrict,
        })
        .then((res) => {
          setListWard(res.data);
        })
        .catch((error) => {
          toast.error(error);
        });
    };

    setDataWard();
  }, [selectedDistrict]);

  useEffect(() => {
    apiProfile.getEmployeeByAdminWithID({ id: id }).then((response) => {
      setEmail(response.data?.email);
      setFirstName(response.data?.firstName);
      setLastName(response.data?.lastName);
      setPhone(response.data?.phone);
      setDetailLocation(response.data?.detailLocation);
      setSelectedCity(response.data?.cityId);
      setSelectedDistrict(response.data?.districtId);
      setSelectedWard(response.data?.wardId);
      setStatus(response.data?.status);
    });
  }, [id]);

  // Nhập email
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [detailLocation, setDetailLocation] = useState("");
  const [status, setStatus] = useState("");

  return (
    <>
      <Box width={"100%"} bgcolor="#fff">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontSize="26px" m={2}>
              Thông tin người dùng
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack
              className="cruBrand"
              p={3}
              justifyContent="center"
              width="100%"
              spacing={2}
              bgcolor="#fff"
            >
              <Stack direction="row">
                <Typography className="cruBrand__label">Emai:</Typography>
                <TextField
                  value={email}
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
              <Stack direction="row">
                <Typography className="cruBrand__label">Tên:</Typography>
                <TextField
                  value={firstName}
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
              <Stack direction="row">
                <Typography className="cruBrand__label">Họ:</Typography>
                <TextField
                  value={lastName}
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
              <Stack direction="row">
                <Typography className="cruBrand__label">
                  Số điện thoại:
                </Typography>
                <TextField
                  value={phone}
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
              <Stack direction="row">
                <Typography className="cruBrand__label">Trạng thái:</Typography>
                <TextField
                  value={status === 0 ? "Hoạt động" : "Không hoạt động"}
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              className="cruBrand"
              p={3}
              justifyContent="center"
              width="100%"
              spacing={2}
              bgcolor="#fff"
            >
              <Stack direction="row">
                <Typography className="cruBrand__label">
                  Địa chỉ chi tiết:
                </Typography>
                <TextField
                  value={detailLocation}
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
              <Stack direction="row">
                <Typography className="cruBrand__label">
                  Thành phố / Tỉnh:
                </Typography>
                <TextField
                  value={
                    listCity.find((item) => (item.id = selectedCity))?.name
                  }
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
              <Stack direction="row">
                <Typography className="cruBrand__label">
                  Quận / Huyện:
                </Typography>
                <TextField
                  value={
                    listDistrict.find((item) => (item.id = selectedDistrict))
                      ?.name
                  }
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
              <Stack direction="row">
                <Typography className="cruBrand__label">
                  Phường / Xã:
                </Typography>
                <TextField
                  value={
                    listWard.find((item) => (item.id = selectedWard))?.name
                  }
                  disabled
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ flex: "1", color: "black" }}
                />
              </Stack>
            </Stack>
          </Grid>
          {/* <Stack
            direction="row"
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Button variant="outlined" onClick={() => navigate("/admin/user")}>
              Quay lại
            </Button>
          </Stack> */}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UserDetailCart />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DetailUser;
