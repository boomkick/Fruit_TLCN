import { useEffect, useState,useMemo,memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Addresses.scss";
import { Typography, Button, Stack, Box, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import apiAddress from "../../../apis/apiAddress";
// import EmptyNotify from '../../../components/EmptyNotify';

import { toast } from "react-toastify";

function Addresses() {
  const user = useSelector(state => state.auth.user);

  // Xử lí nhận địa chỉ user
  const [userAddress, setUserAddress] = useState({});

  useEffect(() => {
    // Gán userAddress
    console.log(user)
    if (user){
      setUserAddress({
        cityId: user.cityId,
        districtId: user.districtId,
        wardId: user.wardId,
        detailLocation: user.detailLocation,
      })
    }
  }, []);

  // Check có địa chỉ
  const isAddress = (address) => {
    if (address.cityId !== "" || address.districtId !== "" || address.wardId !== "" || address.detailLocation !== ""){
      return false
    }
    return true
  }
  
  return (
    <Stack spacing={2} className="addresses">
      <Typography className="heading">Địa chỉ của bạn</Typography>
      {isAddress(userAddress) ? (
        <Link to="/my-account/address/create">
          <Button className="new" variant="outlined" startIcon={<AddIcon />}>
            Thêm địa chỉ mới
          </Button>
        </Link>
      ) : (
        <Stack direction="row" className="action">
          <Link to={`edit`}>
            <Button className="Modify" variant="text">
              Chỉnh sửa
            </Button>
          </Link>
          <Link to={`add`}>
          <Button className="Modify" variant="text">
            Thêm địa chỉ nhận hàng mới
          </Button>
        </Link>
        </Stack>
      )}

      <Stack spacing={5}>
        {isAddress(userAddress) ? (
          // <EmptyNotify title="Bạn chưa có địa chỉ" />
          <Typography>Bạn chưa có địa chỉ</Typography>
        ) : (
          <Stack
            key={userAddress.id}
            direction="row"
            width="100%"
            className="items"
          >
            <Stack className="info">
              <Typography className="name">{user.firstName + " " + user.lastName}</Typography>
              <Typography className="address">
                Địa chỉ:
              </Typography>
              <Typography className="address">
                Thành phố:{userAddress.cityId ? ` ${userAddress.cityId}` : " Chưa có thông tin"}
              </Typography>
              <Typography className="address">
                Quận:{userAddress.districtId ? ` ${userAddress.districtId}` : " Chưa có thông tin"}
              </Typography>
              <Typography className="address">
                Phường:{userAddress.wardId ? ` ${userAddress.wardId}` : " Chưa có thông tin"}
              </Typography>
              <Typography className="address">
                Địa chỉ chi tiết:{userAddress.detailLocation ? ` ${userAddress.detailLocation}` : " Chưa có thông tin"}
              </Typography>
              <Typography className="number" style={{marginTop: "5px"}}>
                Điện thoại: {user.phone}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default memo(Addresses);
