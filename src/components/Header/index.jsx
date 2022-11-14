import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Button, Typography, Badge, Box, Modal } from "@mui/material";

import { logoutSuccess } from "../../slices/authSlice";

import Login from "../Login";
import SignUp from "../SignUp";
import { VerticalAlignCenter } from "@mui/icons-material";
import imgLogo from "../../assets/img/fruity.png"

const privatePath = ["/customer/", "/admin/", "/payment"];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  const user = useSelector((state) => state.auth.user); //lấy user từ store

  const handleLogout = () => {
    dispatch(logoutSuccess());
    const isPrivate =
      privatePath.findIndex((e) => location.pathname.includes(e)) >= 0
        ? true
        : false;
    if (isPrivate) {
      navigate("/");
    }
  };

  const closeModalLogin = () => {
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
    // setIsForgetPwd(false);
  };


  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    // setIsForgetPwd(false);
    setIsRegister(false);
  }, []);

  const handleOpenSignup = useCallback(() => {
    setIsRegister(true);
    // setIsForgetPwd(false);
    setIsLoginForm(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
    // setIsForgetPwd(false);
  }, []);

  return (
    <header id="header" className="header">
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "1170px",
          margin: "0 175px",
        }}
      >
        {/* logo */}
        <Link className="header__logo" to={"/"}>
          <img
            alt=""
            style={{ width: "50px", height: "50px" }}
            src={imgLogo}
          />
        </Link>

        {/* Left Element */}
        <div className="element header__leftElement">
          <ul className="navbar">
            <li>
              <Link to={"/"}>
                <Typography sx={{ fontSize: "14px",paddingBottom:"6px" }}>
                  Trang chủ
                </Typography>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <Typography sx={{ fontSize: "14px",paddingBottom:"6px" }}>
                  Sản phẩm
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Trái cây ta</Link>
                </li>
                <li>
                  <Link to={"/"}>Trái cây nhập khẩu</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                <Typography sx={{ fontSize: "14px",paddingBottom:"6px" }}>
                  Giỏ Quà
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Giỏ Quà Lễ Hội</Link>
                </li>
                <li>
                  <Link to={"/"}>Giỏ Quà Sinh Nhật</Link>
                </li>
                <li>
                  <Link to={"/"}>Giỏ Trái Cây + Hoa Tươi</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                <Typography sx={{ fontSize: "14px",paddingBottom:"6px" }}>
                  Giới Thiệu
                </Typography>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <Typography sx={{ fontSize: "14px",paddingBottom:"6px" }}>
                  Hỗ Trợ Khách Hàng
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Liên hệ shop</Link>
                </li>
                <li>
                  <Link to={"/"}>Hướng Dẫn Sử Dụng</Link>
                </li>
                <li>
                  <Link to={"/"}>Yêu cầu khẩn cấp</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Right Element */}
        <div className="element header_rightElement">
          <ul className="navbar">
            <li>
              {user ? (
                <>
                  <img alt="" src={user.img} />

                  <Stack>
                    <Typography sx={{ fontSize: "11px" }}>Tài khoản</Typography>

                    <Button
                      sx={{ color: "white", padding: "6px 0" }}
                      endIcon={<ArrowDropDownOutlinedIcon />}
                    >
                      <Typography
                        className="text-overflow-1-lines"
                        sx={{ fontSize: "13px", textAlign: "start" }}
                      >
                        {user.fullName}
                      </Typography>
                    </Button>
                  </Stack>

                  <Box className="header__dropdown">
                    <Link to={"/customer/order/history"}>Đơn hàng của tôi</Link>

                    <Link to={"/customer/wishlist"}>Sản phẩm yêu thích</Link>

                    <Link to={"/customer/notification"}>Thông báo của tôi</Link>

                    <Link to={"/customer/account/edit"}>Tài khoản của tôi</Link>

                    <Box onClick={handleLogout}>Thoát tài khoản</Box>
                  </Box>
                </>
              ) : (
                <>
                  <Button onClick={openModalLogin} sx={{ color: "white" }}>
                    <Typography sx={{ fontSize: "14px", color: "white" }}>
                      Đăng nhập / Đăng ký
                    </Typography>
                  </Button>
                </>
              )}
            </li>

            <li className="divider"></li>

            <li>
              <div className="buttonCart">
                <Link to={"/"} title="Giỏ hàng" className="icon">
                  {/* <FontAwesomeIcon icon={faShoppingBag }></FontAwesomeIcon> */}
                  <ShoppingBagIcon
                    sx={{ fontSize: "20px", color: "#ffffff", margin: "1px" }}
                  />
                </Link>
              </div>
            </li>

            <li className="divider"></li>

            <li>
              <div className="buttonSearch">
                <Link
                  to={"/"}
                  className="icon"
                  aria-label="Tìm Kiếm"
                  data-open="#search-lightbox"
                  data-focus="input.search-field"
                >
                  <SearchIcon
                    sx={{ fontSize: "20px", color: "#ffffff", margin: "1px" }}
                  />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </Stack>

      {/* ModelLogin */}
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalLogin}
        onClose={closeModalLogin}
      >
        <Box className="modal-login" sx={{ width: "800px" }}>
          {isLoginForm && (
            <Login
              handleOpenSignup={handleOpenSignup}
              closeModalLogin={closeModalLogin}
              // handleOpenForgetPwd={handleOpenForgetPwd}
            />
          )}

          {isRegister && (
            <SignUp
              handleOpenLogin={handleOpenLogin}
              closeModalLogin={closeModalLogin}
            />
          )}

          {/* {isForgetPwd && (
            <ForgetPassword
              closeModalForgetPWD={closeModalForgetPWD}
              handleReturnLogin={handleReturnLogin}
            />
          )} */}
        </Box>
      </Modal>

    </header>
  );
}

export default Header;
