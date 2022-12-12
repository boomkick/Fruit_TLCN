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

  const [addresses, setAddresses] = useState(user.address);

  // useEffect(() => {
  //   const getData = async () => {
  //     apiAddress.getProfileUser().then((res) => {
  //       setAddresses(res.data.user.address);
  //       console.log(res.data.user.address);
  //     });
  //   };
  //   getData();
  // }, []);


  return (
    <Stack spacing={2} className="addresses">
      <Typography className="heading">Địa chỉ nhận hàng</Typography>
      {addresses.length === 0 ? (
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
        </Stack>
      )}

      <Stack spacing={5}>
        {addresses.length === 0 ? (
          // <EmptyNotify title="Bạn chưa có địa chỉ" />
          <Typography>Bạn chưa có địa chỉ</Typography>
        ) : (
          <Stack
            key={addresses.id}
            direction="row"
            width="100%"
            className="items"
          >
            <Stack className="info">
              <Typography className="name">{addresses.fullName}</Typography>
              {/* <Typography className="name">{addresses.companyName}</Typography> */}
              <Typography className="address">
                Địa chỉ:{" "}
                {`${addresses.addressDetail}, ${addresses.commune.name}, ${addresses.district.name}, ${addresses.province.name}`}
              </Typography>
              <Typography className="number">
                Điện thoại: {addresses.phoneNumber}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default memo(Addresses);
