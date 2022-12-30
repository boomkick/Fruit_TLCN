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
import img from "../../assets/img/logo.png"
import { deleteAll } from "../../slices/cartSlice";
import { clearAddress, clearCoupon, clearPaymentMethod } from "../../slices/paymentSlice";

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

  const handleLogout = () => {
    dispatch(deleteAll());
    dispatch(clearAddress());
    dispatch(clearCoupon());
    dispatch(clearPaymentMethod());
    dispatch(logoutSuccess());
    navigate("/");
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
        .showAllCategory()
        .then((res) => {
          setCategories(res.data);
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
            src={img}
          />
        </Link>

        {/* Left Element */}
        <div className="element header__leftElement">
          <ul className="navbar">
            <li className="header__leftElement-item">
              <Link
                to={"/"}
              >
                <Typography className="header__leftElement-main" sx={{ fontSize: "14px", fontWeight: "700", position: "relative", padding: "5px 30px 5px 10px"  }} >
                  Danh mục trái cây
                  <ArrowDropDownOutlinedIcon sx={{position: "absolute", top: "2px"}}/>
                </Typography>
                {/* <FontAwesomeIcon icon="fa-light fa-chevron-down" /> */}
              </Link>
              <ul className="subnav subnav__dropdown">
                {categories.map((item) => {
                  return (
                    <li>
                      <Link to={`/product-category/${item?.id}`}>{item?.name}</Link>
                    </li>    
                  )
                })}
              </ul>
            </li>
            <li className="header__leftElement-item">
              <Link to={"/"}>
                <Typography className="header__leftElement-main" sx={{ fontSize: "14px", fontWeight: "700", position: "relative", padding: "5px 30px 5px 10px" }} >
                  Hỗ Trợ Khách Hàng
                  <ArrowDropDownOutlinedIcon sx={{ position: "absolute", top: "2px" }}/>
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Hướng dẫn sử dụng</Link>
                  <Link to={"/"}>Hướng dẫn đăng kí tài khoản</Link>
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
                      sx={{ color: "#3D8B91", padding: "6px 0"}}
                      endIcon={<ArrowDropDownOutlinedIcon />}
                    >
                      <Typography
                        className="text-overflow-1-lines"
                        sx={{
                          fontSize: "14px",
                          textAlign: "start",
                          color: "#3D8B91",
                          fontWeight: "700",
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

                    {user?.role == 1 ? (<>
                      <Link
                      to={"/employee"}
                      onClick={() => replacePage("/employee")}
                      style={{ padding: "8px 20px" }}
                    >
                      Trang nhân viên
                    </Link>
                    </>) : user.role == 2 ?  (<>
                      <Link
                      to={"/admin"}
                      onClick={() => replacePage("/admin")}
                      style={{ padding: "8px 20px" }}
                    >
                      Trang quản trị viên
                    </Link>
                    </>) : <></>}

                    <Box onClick={handleLogout} style={{ fontSize: "14px" }}>
                      Thoát tài khoản
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Button onClick={openModalLogin} sx={{color: "#3D8B91"}}>
                    <Typography sx={{ fontSize: "14px" }}>
                      Đăng nhập
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
                  to={`/product-category/${categories[0]?.id}`}
                  className="icon"
                  aria-label="Tìm Kiếm"
                  data-open="#search-lightbox"
                  data-focus="input.search-field"
                >
                  <SearchIcon
                    sx={{ fontSize: "25px", margin: "1px", color: "#3D8B91" }}
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
const replacePage = (param) => {
  window.location.replace(param);
};

export default Header;
