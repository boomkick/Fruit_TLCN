import * as React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { sidebar } from "../../constraints/Admin";
import { Notifies } from "../../constraints/AdminNotify";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import "./Admin.scss";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  Stack,
  ClickAwayListener,
  Button,
  Badge,
  SwipeableDrawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
  Collapse,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Category from "./Category";
import CreateCategory from "./Category/CruCategory/index";
import Order from "./Order";
import Product from "./Product";
import User from "./User";
import UpdateRoleUser from "./User/UpdateRoleUser";
import CreateDetailProduct from "./Product/CreateDetailProduct";
import logo_shop from "../../assets/img/logo.png";

import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../slices/authSlice";
import UpdateDetailProduct from "./Product/UpdateDetailProduct";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import StatisticCart from "./Statistic/Cart";
import StatisticProfit from "./Statistic/Profit";
import StatisticProduct from "./Statistic/Product";
import StatisticBill from "./Statistic/Bill";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import CreateUpdateInventory from "./Inventory/CreateUpdateInventory";
import CreateUpdatePromotion from "./Promotion";
import StatisticInventory from "./Inventory/StatisticInventory";
import Review from "./Review";
import ReviewsByProduct from "./Review/ReviewsByProduct";
import Employee from "./Employee";
import UpdateRoleEmployee from "./Employee/UpdateRoleEmployee";
import DetailUser from "./User/DetailUser";
import InputDataTraining from "./InputDataTraining";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Admin() {
  const [openAccount, setOpenAccount] = React.useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleClickAccount = () => {
    setOpenAccount((prev) => !prev);
  };

  const handleClickAwayAccount = () => {
    setOpenAccount(false);
  };

  const [openNotify, setOpenNotify] = React.useState(false);

  const CloseNotify = () => {
    setOpenNotify(false);
  };

  const formNotify = () => {
    return (
      <Box sx={{ zIndex: "10", width: "400px", mt: "5rem" }}>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack sx={{ padding: "12px" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Cập nhật thông tin
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  size="medium"
                  sx={{ fontWeight: "400" }}
                  startIcon={<FormatListBulletedIcon fontSize="small" />}
                >
                  Xem tất cả
                </Button>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: "0.9rem",
                    marginRight: "6px",
                    marginLeft: "6px",
                  }}
                />
                <Button
                  size="medium"
                  sx={{ fontWeight: "400" }}
                  startIcon={<CheckCircleOutlineIcon fontSize="small" />}
                >
                  Đã đọc tất cả
                </Button>
              </Stack>
            </Stack>
            <IconButton onClick={CloseNotify}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Divider light />
          <Stack sx={{ padding: "12px" }}>
            {Notifies.map((item) => (
              <Stack>
                <Stack direction="row" spacing={2} sx={{ padding: "12px" }}>
                  <Stack width="56px" height="56px">
                    <img
                      style={{ borderRadius: "8px" }}
                      src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
                      alt=""
                    />
                  </Stack>
                  <Stack sx={{ overflow: "auto" }}>
                    <Stack>
                      <a href={item.link}>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {item.title}
                        </Typography>
                        {item.info.map((itemI) => (
                          <Typography sx={{ fontSize: "14px" }}>
                            {itemI.text}
                          </Typography>
                        ))}
                      </a>
                    </Stack>
                    <Typography sx={{ fontSize: "12px" }}>
                      {item.datetime}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider light />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    );
  };

  const stylesAccount = {
    position: "absolute",
    top: 48,
    right: 0,
    zIndex: 1,
    border: "1px solid #333",
    bgcolor: "background.paper",
    width: "16rem",
    paddingTop: "4px",
  };

  const [selectedTabId, setSelectedTabId] = React.useState(0);

  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Xử lí đăng xuất
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/");
  };

  // Sidebar: statistic component
  const [openStatistic, setOpenStatistic] = React.useState(false);

  const handleClickOpenStatistic = (item) => {
    setOpenStatistic(!openStatistic);
    setSelectedTabId(item?.childs.id);
  };

  return (
    <Stack direction="row">
      <CssBaseline />

      <AppBar
        sx={{ backgroundColor: "white", color: "black" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{
                marginRight: 5,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Stack direction="row" spacing={3} alignItems="center">
              <IconButton sx={{ border: "1px solid silver" }}>
                <TextsmsOutlinedIcon sx={{ borderRadius: "50%" }} />
              </IconButton>

              <IconButton
                onClick={() => setOpenNotify(true)}
                sx={{ border: "1px solid silver" }}
              >
                <Badge
                  color="info"
                  // badgeContent={6}
                >
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>

              <SwipeableDrawer
                anchor="right"
                open={openNotify}
                onClose={() => setOpenNotify(false)}
                onOpen={() => setOpenNotify(true)}
              >
                {formNotify()}
              </SwipeableDrawer>

              <ClickAwayListener onClickAway={handleClickAwayAccount}>
                <Stack
                  sx={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "16px",
                    position: "relative",
                    height: "32px",
                    padding: "4px",
                    cursor: "pointer",
                  }}
                  className="admin__dropdown"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={handleClickAccount}
                >
                  <Box
                    borderRadius="50%"
                    alt=""
                    component="img"
                    src={logo_shop}
                    onClick={handleClickAccount}
                    sx={{ width: "24px", height: "24px" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "14px",
                      paddingLeft: "6px",
                      fontWeight: "Light",
                    }}
                  >
                    {user.firstName + " " + user.lastName}
                  </Typography>
                  <ExpandMoreOutlinedIcon />
                  {openAccount ? (
                    <Stack sx={stylesAccount}>
                      <Stack px={2} py={1} direction="row">
                        <Box
                          borderRadius="50%"
                          component="img"
                          src={logo_shop}
                          sx={{ width: "40px", height: "40px" }}
                        />
                        <Stack sx={{ paddingLeft: "10px" }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {user.firstName + " " + user.lastName}
                          </Typography>
                        </Stack>
                      </Stack>

                      <ListItem
                        disablePadding
                        sx={{
                          display: "block",
                          paddingX: "16px",
                          alignItems: "left",
                        }}
                      >
                        <Button
                          variant="text"
                          startIcon={<HomeOutlinedIcon />}
                          onClick={() => navigate("/")}
                          sx={{ color: "#333" }}
                        >
                          Trang bán hàng
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<PersonOutlineIcon />}
                          sx={{ color: "#333" }}
                        >
                          Thông tin các nhân
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<DriveFileRenameOutlineOutlinedIcon />}
                          sx={{ color: "#333" }}
                        >
                          Đổi mật khẩu
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<LogoutIcon />}
                          sx={{ color: "#333" }}
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </Button>
                      </ListItem>
                    </Stack>
                  ) : null}
                </Stack>
              </ClickAwayListener>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Link className="admin__logo" to={"/"}>
            <p className="admin__logo-title">FRUITs</p>
          </Link>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebar.map((item) => (
            <Link to={item.link}>
              <ListItem
                key={item.id}
                disablePadding
                sx={{ display: "block" }}
                selected={selectedTabId === item.id}
                onClick={() =>
                  item?.childs ? null : setSelectedTabId(item.id)
                }
              >
                {item?.childs ? (
                  <>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={() => handleClickOpenStatistic(item)}
                      selected={selectedTabId === item?.childs.id}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon ? <item.icon /> : null}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      {openStatistic ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openStatistic} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item?.childs.map((element) => {
                          return (
                            <Link to={element.link}>
                              <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                  }}
                                >
                                  {element.icon ? <element.icon /> : null}
                                </ListItemIcon>
                                <ListItemText
                                  primary={element.text}
                                  sx={{ opacity: open ? 1 : 0 }}
                                />
                              </ListItemButton>
                            </Link>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon ? <item.icon /> : null}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                )}
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        flexGrow={1}
        p={0}
        bgcolor="#f5f5fa"
        minHeight="40rem"
      >
        <DrawerHeader />
        <Routes>
          <Route index element={<Dashboard />} />
          {/* <Route path="login" element={<AdminLogin />} /> */}
          <Route path="order/*" element={<Order />} />
          <Route
            path="product/*"
            element={
              <Routes>
                <Route index element={<Product />} />
                <Route path="create" element={<CreateDetailProduct />} />
                <Route path="detail/:id" element={<UpdateDetailProduct />} />
              </Routes>
            }
          />
          <Route
            path="promotion/*"
            element={
              <Routes>
                <Route
                  path="create"
                  element={<CreateUpdatePromotion edit={false} />}
                />
                <Route
                  path=":id"
                  element={<CreateUpdatePromotion edit={true} />}
                />
              </Routes>
            }
          />

          <Route
            path="category/*"
            element={
              <Routes>
                <Route index element={<Category />} />
                <Route path="create" element={<CreateCategory />} />
                <Route
                  path="edit/:id"
                  element={<CreateCategory edit={true} />}
                />
              </Routes>
            }
          />

          <Route
            path="user/*"
            element={
              <Routes>
                <Route index element={<User />} />
                <Route path="update-role/:id" element={<UpdateRoleUser />} />
                <Route path=":id" element={<DetailUser />} />
              </Routes>
            }
          />
          <Route
            path="employee/*"
            element={
              <Routes>
                <Route index element={<Employee />} />
                <Route
                  path="update-role/:id"
                  element={<UpdateRoleEmployee />}
                />
                <Route path="update-role/" element={<UpdateRoleEmployee />} />
              </Routes>
            }
          />
          <Route
            path="review/*"
            element={
              <Routes>
                <Route index element={<Review />} />
                <Route path="product/:id" element={<ReviewsByProduct />} />
              </Routes>
            }
          />
          <Route
            path="input-data-training/*"
            element={
              <Routes>
                <Route index element={<InputDataTraining />} />
              </Routes>
            }
          />
          <Route
            path="inventory/*"
            element={
              <Routes>
                <Route index element={<Inventory />} />
                <Route path="statistic" element={<StatisticInventory />} />
                <Route
                  path="create"
                  element={<CreateUpdateInventory edit={false} />}
                />
                <Route
                  path="detail/:id"
                  element={<CreateUpdateInventory edit={true} />}
                />
              </Routes>
            }
          />

          <Route
            path="statistic/*"
            element={
              <Routes>
                <Route path="cart/" element={<StatisticCart />} />
                <Route path="profit/" element={<StatisticProfit />} />
                <Route path="product/" element={<StatisticProduct />} />
                <Route path="bill/" element={<StatisticBill />} />
              </Routes>
            }
          />
        </Routes>
      </Box>
    </Stack>
  );
}

export default Admin;
