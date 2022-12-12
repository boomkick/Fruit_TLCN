import { Box, Stack, InputBase, Typography, Button } from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import * as React from "react";
import apiProfile from "../../../../apis/apiProfile";
import { useDispatch, useSelector } from "react-redux";
import {loginSuccess} from '../../../../slices/authSlice'


function PhoneNumber() {
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [fcolor, setColor] = React.useState("#ee0033");
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const onChangePhone = (event) => {
    setPhone(event.target.value);
    const regex =
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    if (regex.test(event.target.value)) {
      setMessage("");
    } else {
      setMessage("*Số điện thoại không hợp lệ");
    }
  };

  const handleChange = () => {
    const params = {
      phone: phone
    };
    apiProfile
      .putChangePhone(params)
      .then((response) => {
        setColor("#2196f3")
        setMessage("Thay đổi thành công");
        getUserProfile();
      })
      .catch((error) => {
        setColor("#ee0033")
        setMessage("Thay đổi không thành công!");
      });
  };

  const getUserProfile = () => {
    apiProfile.getUserProfile()
      .then((res) => {
        let newUser = res.data.user
        dispatch(loginSuccess({ ...user, ...newUser }))
      })
  }
  return (
    <Box sx={{ mt: "1rem" }}>
      <Typography variant="h6" >Cập nhật số điện thoại</Typography>

      <Stack
        className="input-container__size"
        alignItems="center"
        justifyContent="center"
      >
        <Stack className="customer-info__input-container">
          <Typography>Số điện thoại</Typography>

          <Stack spacing={4}>
            <Stack
              sx={{ border: "1px solid darkgrey", borderRadius: "4px" }}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <LocalPhoneOutlinedIcon sx={{ ml: "6px" }} color="disabled" />
              <InputBase placeholder="Nhập số điện thoại"
                value={phone}
                onChange={onChangePhone} />
            </Stack>
            <Box height="25px">
              <Typography color={fcolor} fontSize="14px" >{message}</Typography>
            </Box>
            <Button variant="contained"
              onClick={(event) => {
                handleChange(event);
              }}>Lưu thay đổi</Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default PhoneNumber;
