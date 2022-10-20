import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Avatar,
  Stack,
  Box,
  Button,
  Typography,
  FormGroup,
  Grid,
  Rating,
  Tab,
  Tabs,
  ClickAwayListener,
  Badge,
  MenuItem,
  Modal,
  Divider,
  IconButton,
} from "@mui/material";

import { useSelector } from "react-redux";

import "./CustomerAccount.scss";
import { sidebarTab } from "../../constraints/Profile";

import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ImageUploading from "react-images-uploading";
import CloseIcon from "@mui/icons-material/Close";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import OverView from "./OverView/index";
import Info from "./Info/index";



function CustomerAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const tab = sidebarTab.find((item) => location.pathname === (item.link));

  const user = useSelector((state) => state.auth.user);

  const [value, setValue] = useState(0);
  const [selectedTab, setSelectedTab] = useState(tab?.id || 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleChangePath = () => {
      const tab = sidebarTab.find((item) =>
        location.pathname === (item.link)
      );
      console.log(tab)
      if (tab) setSelectedTab(tab?.id || 1);
    };

    handleChangePath();
  }, [location.pathname]);

  return (
    <div id="main">
      <div className="my-account">
        <div className="my-account-title">
          <div>
            <h1
              style={{
                textTransform: "uppercase",
                letterSpacing: ".05em",
                fontSize: "20px",
                fontWeight: "400",
              }}
            >
              Trang Quản Lý Tài Khoản
            </h1>
            <small
              style={{
                textTransform: "uppercase",
                letterSpacing: ".06em",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              {sidebarTab.find((item) => item.id === selectedTab)?.name || ""}
              
            </small>
          </div>
        </div>
      </div>
      <div className="my-account-content">
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
          }}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              width: "25%",
              paddingLeft: "15px",
              paddingBottom: "30px",
              ":last-child": { border: "none" },
            }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                }}
                src={
                  "https://secure.gravatar.com/avatar/fc7eaee039cecde3a379319bd183c433?s=70&d=mm&r=g"
                }
              />
              <Typography>ex</Typography>
            </Stack>
            {sidebarTab.map((item) => {
              return (
                <Link key={item.id} to={item.link}>
                  <Tab
                    onClick={() => 
                      // navigate(item.link);
                      setSelectedTab(item.id)
                    }
                    key={item.id}
                    label={item.name}
                    sx={{
                      fontSize: "12px",
                      textTransform: "none",
                      fontWeight: "500",
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  />
                </Link>
              );
            })}
          </Tabs>

          <Box flex={1} mt="16px">
            {/* <Outlet /> */}
            <Routes>
              <Route
                path=""
                element={
                  <Routes>
                    <Route index element={<OverView />} />
                  </Routes>
                }
              />

              <Route
                path="orders"
                element={
                  <Routes>
                    <Route index element={<OverView />} />
                  </Routes>
                }
              />

              <Route
                path="edit-address/*"
                element={
                  <Routes>
                    <Route index element={<OverView />} />
                  </Routes>
                }
              />

              <Route
                path="edit-account"
                element={
                  <Routes>
                    <Route index element={<Info />} />
                  </Routes>
                }
              />

              <Route
                path="logout"
                element={
                  <Routes>
                    <Route index element={<OverView />} />
                  </Routes>
                }
              />
            </Routes>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default CustomerAccount;
