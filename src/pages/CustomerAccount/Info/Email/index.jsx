import * as React from "react";
import { Box, Stack, InputBase, Typography, Button } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import apiProfile from "../../../../apis/apiProfile";
import { useDispatch, useSelector } from "react-redux";
import {loginSuccess} from '../../../../slices/authSlice'

function Email() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [fcolor, setColor] = React.useState("#ee0033");
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex.test(event.target.value)) {
      setMessage("");
    } else {
      setMessage("*Email không hợp lệ");
    }
  };

  const handleChange = () => {
    const params = {
      email: email
    };
    apiProfile
      .putChangeEmail(params)
      .then((response) => {
        setColor("#2196f3")
        setMessage("Thay đổi thành công");
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
      <Typography variant="h6">Cập nhật email</Typography>

      <Stack
        className="input-container__size"
        alignItems="center"
        justifyContent="center"
      >
        <Stack className="customer-info__input-container">
          <Typography>Địa chỉ email</Typography>

          <Stack spacing={2} mt ="10px">
            <Stack
              sx={{ border: "1px solid darkgrey", borderRadius: "4px" }}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <EmailOutlinedIcon sx={{ ml: "6px" }} color="disabled" />
              <InputBase
                placeholder="Nhập email"
                value={email}
                onChange={onChangeEmail}
              />
            </Stack>
            <Box height="25px">
              <Typography color={fcolor} fontSize="14px" >{message}</Typography>
            </Box>

            <Button
              onClick={(event) => {
                handleChange(event);
              }}
              variant="contained"
            >
              Lưu thay đổi
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Email;
