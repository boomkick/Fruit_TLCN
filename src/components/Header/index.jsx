import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Button,
  Typography,
  Badge,
  Box,
  Modal,
  Divider,
} from "@mui/material";

import { logoutSuccess } from "../../slices/authSlice";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Login from "../Login";
import SignUp from "../SignUp";
import apiCategory from "../../apis/apiCategory";
import img from "../../assets/img/logo.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import imgCategorySalad from "../../assets/img/category_salad.jfif";
import { deleteAll } from "../../slices/cartSlice";
import {
  clearAddress,
  clearCoupon,
  clearPaymentMethod,
} from "../../slices/paymentSlice";
import apiNotification from "../../apis/apiNotification";
import LoadingAPI from "../LoadingAPI";

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

  // Hanlde notification
  const [countNotifications, setCountNotifications] = useState(0);
  const [remainNotifications, setRemainNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  const handleGetMoreNotifications = React.useCallback(() => {
    setLoadingNotifications(true);
    const params = {
      offset: notifications.length,
      size: 5,
    };
    const getData = async () => {
      await apiNotification.getNotification(params).then((res) => {
        setNotifications((notifications) => [
          ...notifications,
          ...res.data.notifications,
        ]);
        setRemainNotifications(res.data.remainingNotification);
        setLoadingNotifications(false);
      });
    };
    getData();
  }, [notifications]);

  const handleResetNotification = React.useCallback(() => {
    if (countNotifications !== 0 && notifications.length > 0) {
      apiNotification
        .getResetNewNotification()
        .then((res) => setCountNotifications(0));
    }
  }, [countNotifications, notifications]);

  const handleShowNotifications = React.useCallback(() => {
    const handleClick = (item) => {
      apiNotification.putNotification({ id: item.id });
      // setNotifications(notifications.filter((noti) => noti.id !== item.id));
      navigate("/" + item.url);
    };

    if (notifications.length > 0) {
      return notifications.map((item) => {
        return (
          <>
            <Stack
              onClick={() => handleClick(item)}
              style={{ cursor: "pointer" }}
              paddingTop={"3px"}
            >
              <Typography lineHeight={"1.3"} fontSize={"15px"} fontWeight={500}>
                {item.content}
              </Typography>
              <Typography
                fontSize={"10px"}
                color={"#ccc"}
                paddingBottom={"3px"}
              >
                {item.createdDate}
              </Typography>
            </Stack>
            <Divider light />
          </>
        );
      });
    } else {
      return (
        <>
          <Stack style={{ padding: "8px 20px", cursor: "pointer" }}>
            <Typography>Bạn không có thông báo mới</Typography>
          </Stack>
        </>
      );
    }
  }, [notifications]);

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
  };

  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
  }, []);

  const handleOpenSignup = useCallback(() => {
    setIsRegister(true);
    setIsLoginForm(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
  }, []);

  useEffect(() => {
    setLoadingNotifications(true);
    const getData = async () => {
      await apiCategory
        .showAllCategory()
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          setCategories([]);
        });
      await apiNotification.getCountNewNotification().then((res) => {
        setCountNotifications(res.data);
      });
      await apiNotification.getNotification().then((res) => {
        setNotifications(res.data.notifications);
        setRemainNotifications(res.data.remainingNotification);
        setLoadingNotifications(false);
      });
    };
    getData();
  }, []);

  useEffect(() => {
    setLoadingNotifications(true);
    const getData = async () => {
      await apiNotification.getCountNewNotification().then((res) => {
        setCountNotifications(res.data);
      });
      await apiNotification.getNotification().then((res) => {
        setNotifications(res.data.notifications);
        setRemainNotifications(res.data.remainingNotification);
        setLoadingNotifications(false);
      });
    };
    getData();
  }, [user]);

  if (
    location.pathname.includes("employee") ||
    location.pathname.includes("admin")
  ) {
    return null;
  }

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
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={img}
          />
        </Link>

        {/* Left Element */}
        <div className="element header__leftElement">
          <ul className="navbar">
            <li className="header__leftElement-item">
              <Link to={"/"}>
                <Typography
                  className="header__leftElement-main"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    position: "relative",
                    paddingBottom: "5px",
                    borderBottom: "3px solid transparent",
                  }}
                >
                  Danh mục trái cây
                </Typography>
              </Link>
              <div className="subnav subnav__dropdown">
                <ul>
                  {categories.map((item) => {
                    return (
                      <li>
                        <Link to={`/product-category/${item?.id}`}>
                          {item?.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <img
                  className="subnav__dropdown-img"
                  src={imgCategorySalad}
                  alt=""
                />
              </div>
            </li>
            <li className="header__leftElement-item">
              <Link to={"/"}>
                <Typography
                  className="header__leftElement-main"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    position: "relative",
                    paddingBottom: "5px",
                    borderBottom: "3px solid transparent",
                  }}
                >
                  Hỗ Trợ Khách Hàng
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
                      sx={{ color: "#3D8B91", padding: "6px 0" }}
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

                    <Link to={"/my-account"} style={{ padding: "8px 20px" }}>
                      Tài khoản của tôi
                    </Link>

                    {user?.role == 1 ? (
                      <>
                        <Link to={"/employee"} style={{ padding: "8px 20px" }}>
                          Trang nhân viên
                        </Link>
                      </>
                    ) : user.role == 2 ? (
                      <>
                        <Link to={"/admin"} style={{ padding: "8px 20px" }}>
                          Trang quản trị viên
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                    <Box onClick={handleLogout} style={{ fontSize: "14px" }}>
                      Thoát tài khoản
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Button onClick={openModalLogin} sx={{ color: "#3D8B91" }}>
                    <Typography sx={{ fontSize: "14px" }}>Đăng nhập</Typography>
                  </Button>
                </>
              )}
            </li>

            {user ? (
              <>
                <li className="divider"></li>
                <li className="header__notification">
                  <div onMouseLeave={handleResetNotification}>
                    <Stack>
                      <Badge
                        color="warning"
                        badgeContent={countNotifications}
                        invisible={countNotifications === 0}
                        showZero
                      >
                        <NotificationsActiveIcon sx={{ fontSize: "25px" }} />
                      </Badge>
                    </Stack>
                  </div>

                  <Box className="header__notification__dropdown">
                    <Stack className="header__notification__dropdown__top">
                      <Typography sx={{ fontWeight: "700" }}>
                        Thông báo này bạn ơi !
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        maxHeight: "500px",
                        overflowY: "scroll",
                      }}
                    >
                      <LoadingAPI loading={loadingNotifications}>
                        {notifications ? (
                          handleShowNotifications()
                        ) : (
                          <>
                            <Stack
                              style={{ padding: "8px 20px", cursor: "pointer" }}
                            >
                              <Typography>
                                Bạn không có thông báo mới
                              </Typography>
                            </Stack>
                          </>
                        )}
                      </LoadingAPI>
                      {remainNotifications > 0 ? (
                        <Stack
                          display={"flex"}
                          alignItems={"center"}
                          paddingTop={"10px"}
                        >
                          <Button
                            startIcon={<AddBoxOutlinedIcon />}
                            variant="outlined"
                            color="success"
                            onClick={() => handleGetMoreNotifications()}
                          >
                            {" "}
                            Xem thêm
                          </Button>
                        </Stack>
                      ) : null}
                    </Stack>
                  </Box>
                </li>
              </>
            ) : null}
            {user ? (
              <>
                <li className="divider"></li>
                <li>
                  <Link to="/cart">
                    <Badge
                      color="warning"
                      badgeContent={cart?.length}
                      invisible={cart?.length === 0}
                      showZero
                    >
                      <ShoppingBagIcon sx={{ fontSize: "25px" }} />
                    </Badge>
                  </Link>
                </li>
              </>
            ) : null}

            <li className="divider"></li>

            <li>
              <div className="buttonSearch">
                <Link
                  to={`/product-category/`}
                  className="icon"
                  aria-label="Tìm Kiếm"
                  data-open="#search-lightbox"
                  data-focus="input.search-field"
                >
                  <SearchIcon sx={{ fontSize: "25px" }} />
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
            />
          )}

          {isRegister && (
            <SignUp
              handleOpenLogin={handleOpenLogin}
              closeModalLogin={closeModalLogin}
            />
          )}
        </Box>
      </Modal>
    </header>
  );
}

export default Header;
