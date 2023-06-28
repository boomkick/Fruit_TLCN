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
  createTheme,
  ThemeProvider,
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

import { db } from "../../firebase-config";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import bananaImage from "../../assets/fruit_fresh_header/Banana-Bread-Muffin-Tops-–-Oh-She-Glows.jpg";
import appleImage from "../../assets/fruit_fresh_header/Everything-You-Need-to-Know-About-Buying-and-Cooking-with-Apples.jpg";
import mangoImage from "../../assets/fruit_fresh_header/Fresh-Mangos-_Dr_-Sebi-Approved-Alkaline-Food_.jpg";
import watermelonImage from "../../assets/fruit_fresh_header/Good-Food-Princess.jpg";
import greenGrapesImage from "../../assets/fruit_fresh_header/Green-grapes-stock-image_-Image-of-cluster_-fresh_-branch-15408615.jpg";
import HeaderDropdown from "../HeaderDropDown";
import ForgetPassword from "../ForgetPassword";

const theme = createTheme({
  typography: {
    fontFamily: `"Pathway Extreme", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const themeLogo = createTheme({
  typography: {
    fontFamily: `"Fredoka", sans-serif`,
    fontSize: "32px",
    fontWeight: "700",
    lineHeight: "1.5",
  },
});

const fruitList = [
  {
    name: "Dưa hấu",
    link: `/product-category/?productName=Dưa hấu`,
    image: watermelonImage,
  },
  {
    name: "Nho xanh",
    link: `/product-category/?productName=Nho xanh`,
    image: greenGrapesImage,
  },
  {
    name: "Chuối",
    link: `/product-category/?productName=Chuối`,
    image: bananaImage,
  },
  {
    name: "Táo",
    link: `/product-category/?productName=Táo`,
    image: appleImage,
  },
  {
    name: "Xoài",
    link: `/product-category/?productName=Xoài`,
    image: mangoImage,
  },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const [categories, setCategories] = useState([]);

  const cart = useSelector((state) => state.cart.items); // get cart from store
  const user = useSelector((state) => state.auth.user); //get user from store

  // Hanlde notification
  const [countNotifications, setCountNotifications] = useState(0);
  const [remainNotifications, setRemainNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  //Firestore
  const cartNotificationRef = collection(db, "CartNotification");
  const countNotificationRef = collection(db, "CountCartNotificationByUser");
  const [countNotificationDocId, setCountNotificationDocId] = useState(null);

  const handleGetMoreNotifications = React.useCallback(() => {
    setLoadingNotifications(false);
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
    const countNotificationDoc = doc(
      countNotificationRef,
      countNotificationDocId
    );
    setDoc(
      countNotificationDoc,
      {
        Count: 0,
      },
      {
        merge: true,
      }
    ).then();
  }, [countNotifications, notifications]);

  const handleShowNotifications = React.useCallback(() => {
    const handleClick = (item) => {
      const cartNotificationDocRef = doc(db, "CartNotification", item.id);
      setDoc(
        cartNotificationDocRef,
        {
          IsRead: true,
        },
        {
          merge: true,
        }
      );
      navigate("/" + item.Url);
    };

    if (notifications.length > 0) {
      return notifications.map((item) => {
        let isRead = item?.IsRead ? "" : "bold";
        return (
          <>
            <Stack
              direction="row"
              spacing={2}
              sx={{ padding: "5px", cursor: "pointer" }}
              onClick={() => handleClick(item)}
            >
              <Stack width="40px" height="40px">
                <img
                  style={{ borderRadius: "8px" }}
                  src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
                  alt=""
                />
              </Stack>
              <Stack sx={{ overflow: "auto" }}>
                <Stack>
                  <Typography sx={{ fontSize: "13px", fontWeight: isRead }}>
                    {item?.Content}
                  </Typography>
                </Stack>
              </Stack>
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
    setIsForgetPassword(false);
  };

  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
  }, []);

  const handleOpenForgetPassword = useCallback(() => {
    setIsForgetPassword(true);
    setIsLoginForm(false);
    setIsRegister(false);
  }, []);

  const handleOpenSignup = useCallback(() => {
    setIsRegister(true);
    setIsLoginForm(false);
    setIsForgetPassword(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPassword(false);
  }, []);

  useEffect(() => {
    setLoadingNotifications(false);
    const getData = async () => {
      await apiCategory
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

  useEffect(() => {
    setLoadingNotifications(false);
    const getData = () => {
      if (user != null) {
        //Get count notification
        const queryCountNotification = query(
          countNotificationRef,
          where("AccountId", "==", user.id)
        );
        const unsubcribeCountNotification = onSnapshot(
          queryCountNotification,
          async (snapshot) => {
            //If User doesn't have count notification, add new one
            if (snapshot.docs.length == 0) {
              const countNotificationDoc = await addDoc(countNotificationRef, {
                AccountId: user.id,
                Count: 0,
              });
              setCountNotificationDocId(countNotificationDoc.id);
              setCountNotifications(0);
            } else {
              // Get the current count if count notification of user exists
              setCountNotificationDocId(snapshot.docs.at(0).id);
              setCountNotifications(snapshot.docs.at(0).data().Count);
            }
          }
        );

        //Get cart notification
        const queryCartNotification = query(
          cartNotificationRef,
          where("AccountId", "==", user.id),
          orderBy("CreatedDate", "desc")
        );
        const unsubcribeNotification = onSnapshot(
          queryCartNotification,
          (snapshot) => {
            let noti = [];
            snapshot.forEach((doc) => {
              noti.push({ id: doc.id, ...doc.data() });
            });
            console.log(noti);
            setNotifications(noti);
          }
        );
      }
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
    <ThemeProvider theme={theme}>
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
            <p className="header__logo-title">FRUITs</p>
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
                    DANH MỤC
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
              <HeaderDropdown headerName="Trái cây" dropdownItems={fruitList} />
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
                      textTransform: "uppercase",
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
                        sx={{ color: "#2AC5B3", padding: "6px 0" }}
                        endIcon={<ArrowDropDownOutlinedIcon />}
                      >
                        <Typography
                          className="text-overflow-1-lines"
                          sx={{
                            fontSize: "14px",
                            textAlign: "start",
                            color: "#2AC5B3",
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
                          <Link
                            to={"/employee"}
                            style={{ padding: "8px 20px" }}
                          >
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
                    <Button onClick={openModalLogin} sx={{ color: "#2AC5B3" }}>
                      <Typography sx={{ fontSize: "14px" }}>
                        Đăng nhập
                      </Typography>
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
                                style={{
                                  padding: "8px 20px",
                                  cursor: "pointer",
                                }}
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
                handleOpenForgetPassword={handleOpenForgetPassword}
                closeModalLogin={closeModalLogin}
              />
            )}

            {isRegister && (
              <SignUp
                handleOpenLogin={handleOpenLogin}
                closeModalLogin={closeModalLogin}
              />
            )}

            {isForgetPassword && (
              <ForgetPassword
                handleOpenLogin={handleOpenLogin}
                closeModalLogin={closeModalLogin}
              />
            )}
          </Box>
        </Modal>
      </header>
    </ThemeProvider>
  );
}

export default Header;
