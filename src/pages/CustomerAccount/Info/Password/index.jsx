import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import apiProfile from "../../../../apis/apiProfile"; 

function Password() {
  const [showPass, setShowPass] = React.useState(false);
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [newPassword, setnewPassword] = React.useState("");
  const [oldPassword, setoldPassword] = React.useState("");
  const [message, setMessage] = React.useState("*");
  const [newMessage, setNewMessage] = React.useState("*")
  const [fontSizeMessage, setFontSizeMessage] = React.useState("")
  //const [valid, setValid] = React.useState({ new: false, cf: false });
  
  const Rcolor = "#2196f3"
  const Fcolor = "#ee0033"
  const [color, setColor] = React.useState("");
  const [newcolor, setNColor] = React.useState("");
  
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");//regex kiểm tra mật khẩu hợp lệ
  
  const onChangeoldPassword = (event) => {
      setoldPassword(event.target.value)
  }
  
  const onChangenewPassword = (event) => {
    setnewPassword(event.target.value)
    if (strongRegex.test(event.target.value)) {
      setColor(Rcolor)
      setNewMessage("*Mật khẩu hợp lệ")
      //setValid(pre => { return { ...pre, new: true } })
    }
    else {
      setColor(Fcolor)
      setNewMessage("*Mật khẩu phải có ít nhất 8 kí tự. Chứa kí tự thường, kí tự hoa và số")
      //setValid(pre => { return { ...pre, new: false } })
    }
  }
  
  const onChangeconfirmPassword = (event) => {
    setconfirmPassword(event.target.value)
    if (newPassword.localeCompare(event.target.value) === 0) {
      setFontSizeMessage("13px")
      setNColor(Rcolor)
      setMessage("*Trùng khớp")
      //setValid(pre => { return { ...pre, cf: true } })
    }
    else {
      setFontSizeMessage("14px")
      setNColor(Fcolor)
      setMessage("*Mật khẩu không trùng khớp!")
      //setValid(pre => { return { ...pre, cf: false } })
    }
  }
  const handleChangePassword = () => {
    //if (valid.new && valid.cf){
      const params = {
        "confirmPassword": confirmPassword,
        "newPassword": newPassword,
        "oldPassword": oldPassword
      }
      apiProfile.putChangePassword(params)
        .then(response => {
          setFontSizeMessage("16px")
          setNColor(Rcolor)
          setMessage("Thay đổi thành công")
        })
        .catch(error => {
          setFontSizeMessage("16px")
          setNColor(Fcolor)
        setMessage("Thay đổi không thành công!")
      })
    //}   
  }

  const passwordInput = (placeHolder, value, onChange) => {
    return (
      <TextField
     
        value={value}
        onChange = {onChange}
        size="small"
        label={placeHolder }
        type={showPass ? "text" : "password"} autoComplete="new-password"
        name="pass"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" >
              <IconButton onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };

  return (
    <Stack sx={{ mt: "1rem" }} spacing={1}>
      <Typography variant="h6">Đổi mật khẩu</Typography>

      <Stack
        className="input-container__size"
        alignItems="center"
        justifyContent="center"
         sx={{position: 'relative'}}
      >
                <input name="phone" id='phone' type="text" style={{ position:'absolute', top:0, left:0,width:'0',height:'0',opacity:'0'}}/>

        <Stack className="customer-info__input-container" spacing={3}>
          {passwordInput("Nhập mật khẩu hiện tại", oldPassword, onChangeoldPassword)}

          <Stack>
            {passwordInput("Nhập mật khẩu mới", newPassword, onChangenewPassword)}
            <Box height="40px"><Typography fontSize="13px" color={color}>
              {newMessage}
            </Typography></Box>
            
          </Stack>

          {passwordInput("Nhập lại mật khẩu mới", confirmPassword, onChangeconfirmPassword)}
          <Box height="25px">
            <Typography fontSize={fontSizeMessage} color={newcolor}>
              {message}
            </Typography>
          </Box>
          
          <Button onClick={handleChangePassword} variant="contained">Lưu thay đổi</Button>
          
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Password;
