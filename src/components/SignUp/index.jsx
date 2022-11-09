import React from "react";
import { useForm } from "react-hook-form";

import apiAuth from "../../apis/apiAuth";

import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";

import {
  Stack,
  IconButton,
  Button,
  TextField,
  Input,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {toast} from 'react-toastify'

function SignUp(props) {
  const [showPass, setShowPass] = React.useState(false);
  const [showPassConf, setShowPassConf] = React.useState(false);

  const [invalidPhone, setInvalidPhone] = React.useState(false);
  const [isDiffPass, setIsDiffPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const client_url = "https://tiki-web.vercel.app/"

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleCheckPass = () => {
    if (watch("pass") !== watch("passConf")) {
      setIsDiffPass(true);
    } else {
      setIsDiffPass(false);
      return true;
    }
  };

  const handleCheckPhone = async () => {
    let param = {
      phone: watch("email"),
    };
    await apiAuth
      .postCheckPhone(param)
      .then((res) => {
        setInvalidPhone(false);
      })
      .catch((error) => {
        setInvalidPhone(true);
      });
  };

  const onSubmit = async () => {
    if(loading){
      toast.warning("Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh")
      return
    }
    setLoading(true)
    if (handleCheckPhone() && handleCheckPass()) {
      if (invalidPhone === false && isDiffPass === false) {
        let param = {
          password: watch("pass"),
          phone: watch("email"),
        };
        apiAuth.postRegister(param).then(setIsSuccess(true))
        .finally(()=>setLoading(false));
      }
    }
  };

  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ flex: 5 }} spacing={3}>
        <Typography variant="h5">Đăng ký</Typography>

        <form>
          <Stack spacing={2}>
            <Stack width="100%">
              <TextField
                {...register("email", {
                  required: "Hãy nhập email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email không hợp lệ",
                  },
                })}
                label="Email"
                variant="standard"
                sx={{ flex: 1 }}
              />

              {errors.email && (
                <ErrorInput message={errors.email.message} />
              )}
            </Stack>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập mật khẩu
              </InputLabel>
              <Input
                {...register("pass", {
                  required: "Hãy nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                variant="standard"
                type={showPass ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {errors.pass && <ErrorInput message={errors.pass.message} />}
            </FormControl>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập lại mật khẩu
              </InputLabel>
              <Input
                {...register("passConf", {
                  required: "Hãy nhập lại mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                id="password-config"
                type={showPassConf ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassConf(!showPassConf)}
                      edge="end"
                    >
                      {showPassConf ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {errors.passConf && (
                <ErrorInput message={errors.passConf.message} />
              )}
            </FormControl>

            <Stack sx={{ marginTop: "5rem" }}>
              {invalidPhone && (
                <ErrorAfterSubmit message="Email đã được đăng ký" />
              )}
              {isDiffPass ? (
                <ErrorAfterSubmit message="Nhập mật khẩu trùng nhau" />
              ) : null}
            </Stack>

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="error"
            >
              Hoàn Tất
            </Button>

            {isSuccess && <SuccessRegister handleOpenLogin={props.handleOpenLogin} />}
          </Stack>
        </form>

        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Đăng nhập bằng mail
        </Typography>

        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Hoặc tiếp tục bằng
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          
          <a href={`https://nhom3-tiki.herokuapp.com/oauth2/authorization/facebook?redirect_uri=${client_url}oauth2/redirect`} className="hre">
            <FacebookRoundedIcon
              sx={{
                cursor: 'pointer',
                color: "#4267b2",
                fontSize: "3rem"
              }} />
          </a>

          <a href={`https://nhom3-tiki.herokuapp.com/oauth2/authorization/google?redirect_uri=${client_url}oauth2/redirect`} className="hre">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="48" height="48"
              viewBox="0 0 48 48"
              style={{fill:"#000000"}}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
          </a>
        </Stack>

        <p style={{ textAlign: "center" }}>
          Bằng việc tiếp tục, bạn đã chấp nhận{" "}
          <a href="/">điều khoản sử dụng</a>
        </p>
      </Stack>
    </Stack>
  );
}

export default SignUp;

function SuccessRegister(props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <CheckCircleOutlineIcon color="success" />
      <Typography sx={{ textAlign: "center" }}>Đăng ký thành công</Typography>

      <Button variant="text" onClick={props.handleOpenLogin}>
        Đăng nhập
      </Button>
    </Stack>
  );
}
