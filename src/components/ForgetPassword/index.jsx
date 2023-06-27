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

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { toast } from "react-toastify";
import apiProfile from "../../apis/apiProfile";

function ForgetPassword(props) {
  const [showPass, setShowPass] = React.useState(false);
  const [showPassConf, setShowPassConf] = React.useState(false);

  const [isDiffPass, setIsDiffPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleCheckPass = () => {
    if (watch("password") !== watch("passConf")) {
      setIsDiffPass(true);
    } else {
      setIsDiffPass(false);
      return true;
    }
  };

  const onSubmit = async () => {
    if (loading) {
      toast.warning(
        "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    setLoading(true);
    if (handleCheckPass()) {
      if (isDiffPass === false) {
        let param = {
          password: watch("password"),
          email: watch("email"),
        };
        apiProfile
          .postChangePassword(param)
          .then((res) => {
            if (res.status === 200) {
              setIsSuccess(true);
              toast.success("Vui lòng xác nhận mật khẩu qua email");
            } else if (res.status === 400) {
              setIsSuccess(false);
              toast.error(res.message);
            }
          })
          .catch((res) => {
            setIsSuccess(false);
            toast.error(res.message);
          })
          .finally(() => setLoading(false));
      }
    }
  };

  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ flex: 5 }} spacing={3}>
        <Typography variant="h5">Quên mật khẩu</Typography>

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

              {errors.email && <ErrorInput message={errors.email.message} />}
            </Stack>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập mật khẩu
              </InputLabel>
              <Input
                {...register("password", {
                  required: "Hãy nhập mật khẩu",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i,
                    message:
                      "Mật khẩu phải có ít nhất 8 kí tự. Chứa kí tự thường, kí tự hoa và số",
                  },
                })}
                // id="password"
                // variant="standard"
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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i,
                    message:
                      "Mật khẩu phải có ít nhất 8 kí tự. Chứa kí tự thường, kí tự hoa và số",
                  },
                })}
                // id="password-config"
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

            {isSuccess ? props.handleOpenLogin() : <></>}
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}

export default ForgetPassword;
