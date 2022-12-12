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
import apiCategory from "../../apis/apiCategory";

const privatePath = ["/my-account/", "/admin/", "/payment"];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  const [categories, setCategories] = useState([]);

  const cart = useSelector((state) => state.cart.items); // get cart from store
  const user = useSelector((state) => state.auth.user); //get user from store

  console.log("cart", cart);
  console.log("user", user);
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

  useEffect(() => {
    const getData = async () => {
      apiCategory
        .showAllCategoryHeader()
        .then((res) => {
          console.log("a", res.data.category);
          setCategories(res.data.category);
        })
        .catch((error) => {
          setCategories([]);
        });
    };
    getData();
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
            style={{ width: "100%", height: "100%",objectFit:"cover" }}
            src="https://res.cloudinary.com/dddmdgm0w/image/upload/v1670075080/senki_avatar/senki_avatar/senki-high-resolution-logo-white-on-transparent-background_ouktxc.png"
          />
        </Link>

        {/* Left Element */}
        <div className="element header__leftElement">
          <ul className="navbar">
            <li>
              <Link
                to={"/"}
              >
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }}>
                  Đàn Guitar
                  <ArrowDropDownOutlinedIcon />
                </Typography>
                {/* <FontAwesomeIcon icon="fa-light fa-chevron-down" /> */}
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Đàn Guitar Acoustic</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"#"}>
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }}>
                  Nhạc Cụ Khác
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link
                    to={"product-category/0b4020de-ef99-4fca-83ee-92fc62e0b6d9"}
                  >
                    Đàn Ukulele
                  </Link>
                </li>
                <li>
                  <Link
                    to={"product-category/9b1e2a20-c19c-44e2-abab-9412343b4e1f"}
                  >
                    Kèn harmonica
                  </Link>
                </li>
                <li>
                  <Link
                    to={"product-category/ccefc41e-1e12-45f7-a8e5-98c8db8227f5"}
                  >
                    Rollup Piano
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }}>
                  Phụ Kiện Guitar
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Đàn Guitar Acoustic</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }}>
                  Tự Học Guitar
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Đàn Guitar Acoustic</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }}>
                  Hỗ Trợ Khách Hàng
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Đàn Guitar Acoustic</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Right Element */}
        <div className="element header_rightElement">
          <ul className="navbar">
            <li className="header__account">
              {user ? (
                <>
                  <Stack>
                    <Button
                      sx={{ color: "white", padding: "6px 0" }}
                      endIcon={<ArrowDropDownOutlinedIcon />}
                    >
                      <Typography
                        className="text-overflow-1-lines"
                        sx={{
                          fontSize: "14px",
                          textAlign: "start",
                          color: "white",
                        }}
                      >
                        {user.fullName}
                      </Typography>
                    </Button>
                  </Stack>

                  <Box className="header__dropdown">
                    <Link
                      to={"/my-account/orders"}
                      style={{ padding: "8px 20px" }}
                    >
                      Đơn hàng của tôi
                    </Link>

                    <Link
                      to={"/my-account/wishlist"}
                      style={{ padding: "8px 20px" }}
                    >
                      Sản phẩm yêu thích
                    </Link>


                    <Link
                      to={"/my-account"}
                      style={{ padding: "8px 20px" }}
                    >
                      Tài khoản của tôi
                    </Link>

                    <Box onClick={handleLogout} style={{ fontSize: "14px" }}>
                      Thoát tài khoản
                    </Box>
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
              <Link to="/cart">
                <Badge color="warning" badgeContent={cart.length} invisible={cart.length===0} showZero>
                  <ShoppingBagIcon sx={{ fontSize: "25px" }} />
                </Badge>
              </Link>
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
