import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";
import { loginSuccess } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import apiAuth from "../../apis/apiAuth";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import { Stack, IconButton, Button, TextField, Input } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../Loading";
import { toast } from "react-toastify";
import LoginGoogle from "./LoginByGoogle/LoginByGoogle";

function Login(props) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPass, setIsShowPass] = React.useState(false);

  const [isNoAccount, setIsNoAccount] = useState(false);

  const [wrongPass, setWrongPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const submitType = {
    NORMAL: 1,
    GOOGLE: 2,
  };

  const onSubmit = React.useCallback((data, type) => {
    if (loading) {
      toast.warning(
        "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    setLoading(true);

    let params =
      type === submitType.NORMAL
        ? {
            password: data.pass,
            email: data.email,
          }
        : {
            token: data.token,
          };

    if (type === submitType.NORMAL) {
      apiAuth
        .postLogin(params)
        .then((res) => {
          if (res?.status == 200) {
            let { accessToken, user } = res.data;
            Object.assign(user, {
              fullName: user.firstName + " " + user.lastName,
            });
            let refreshToken = "";
            dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
            toast.success(
              `Xin chào ${user.fullName || ""}, mời bạn tiếp tục mua sắm`
            );
            props.closeModalLogin();
          } else {
            toast.error(res.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          if (error.response.data.message === "Không tìm thấy tài khoản") {
            setIsNoAccount(true);
            setWrongPass(false);
          } else {
            setIsNoAccount(false);
            setWrongPass(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      apiAuth
        .postGoogleLogin(params)
        .then((res) => {
          if (res?.status !== 200) {
            toast.success(`Đăng nhập không thành công !`);
          } else {
            let { accessToken, user } = res.data;
            Object.assign(user, {
              fullName: user.firstName + " " + user.lastName,
            });
            let refreshToken = "";
            dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
            toast.success(
              `Xin chào ${user.fullName || ""}, mời bạn tiếp tục mua sắm`
            );
            props.closeModalLogin();
          }
        })
        .catch((error) => {
          if (error.response.data.message === "Không tìm thấy tài khoản") {
            setIsNoAccount(true);
            setWrongPass(false);
          } else {
            setIsNoAccount(false);
            setWrongPass(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ flex: 5 }} spacing={2}>
        <h4 style={{ fontSize: "24px" }}>Xin chào,</h4>
        <p style={{ fontSize: "15px" }}>Đăng nhập hoặc tạo tài khoản</p>

        <form>
          <Stack spacing={2}>
            <Stack>
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
              />
              {errors.email && <ErrorInput message={errors.email.message} />}
            </Stack>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel>Mật khẩu</InputLabel>

              <Input
                {...register("pass", {
                  required: "Hãy nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                variant="standard"
                type={isShowPass ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsShowPass(!isShowPass)}
                      edge="end"
                    >
                      {isShowPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.pass && <ErrorInput message={errors.pass.message} />}
            </FormControl>

            {isNoAccount && (
              <ErrorAfterSubmit message="Email chưa được đăng ký" />
            )}

            {wrongPass && (
              <ErrorAfterSubmit message="Mật khẩu đăng nhập không chính xác" />
            )}

            <Button
              variant="contained"
              color="error"
              onClick={handleSubmit((data) =>
                onSubmit(data, submitType.NORMAL)
              )}
            >
              {loading && <Loading color="#fff" />}
              Đăng nhập
            </Button>
          </Stack>
        </form>

        <p style={{ textAlign: "center" }}>Đăng nhập bằng mail</p>
        <Stack alignItems="center">
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenForgetPassword}
          >
            {" "}
            Quên mật khẩu
          </span>
        </Stack>
        <p style={{ textAlign: "center" }}>
          Nếu bạn chưa có tài khoản?
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenSignup}
          >
            {" "}
            Đăng ký
          </span>
        </p>
        <p style={{ textAlign: "center", marginTop: "3rem" }}>Tiếp tục bằng</p>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <LoginGoogle onSubmit={onSubmit} />
        </Stack>
        <p style={{ textAlign: "center" }}>
          Bằng việc tiếp tục, bạn đã chấp nhận{" "}
          <a href="/">điều khoản sử dụng</a>
        </p>
      </Stack>

      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.closeModalLogin}>
          <CloseIcon />
        </IconButton>
      </span>
    </Stack>
  );
}

export default Login;
