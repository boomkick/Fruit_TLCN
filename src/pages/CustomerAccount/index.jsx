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
} from "react-router-dom";

import OverView from "./OverView/index";
import Info from "./Info";
import Addresses from "./Addresses";
import CreateAddress from "./Addresses/CreateAddress";
import AddRecieveAddress from "./Addresses/AddRecieveAddress";
import Password from "./Info/Password";
import Orders from "./Orders"
import DetailOrder from "./Orders/DetailOrder";

function CustomerAccount() {
  // const navigate = useNavigate();
  const location = useLocation();
  const tab = sidebarTab.find((item) => location.pathname === item.link);
  console.log("location.pathname: ", location.pathname);

  console.log("tab: ", tab);

  const user = useSelector((state) => state.auth.user);

  const [value, setValue] = useState(0);
  const [selectedTab, setSelectedTab] = useState(tab?.id || 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleChangePath = () => {
      const tab = sidebarTab.find((item) => location.pathname === item.link);
      console.log(tab);
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
              flex: 1,
              ":last-child": { border: "none" },
            }}
          >
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
                    value={value}
                    sx={{
                      width: "100%",
                      fontSize: "12px",
                      textTransform: "none",
                      fontWeight: "500",
                      borderBottom: 1,
                      borderColor: "divider",
                      alignItems: "flex-start",
                    }}
                  />
                </Link>
              );
            })}
          </Tabs>

          <Box flex={4} mt="16px" pl="20px">
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
                path="orders/*"
                element={
                  <Routes>
                    <Route index element={<Orders />} />
                    <Route path="detail/:id" element={<DetailOrder />} />
                  </Routes>
                }
              />

              <Route
                path="address/*"
                element={
                  <Routes>
                    <Route index element={<Addresses />} />
                    <Route path="create" element={<CreateAddress />} />
                    <Route path="add" element={<AddRecieveAddress />} />
                    <Route
                      path="edit"
                      element={<CreateAddress edit={true} />}
                    ></Route>
                  </Routes>
                }
              />

              <Route
                path="edit-account/*"
                element={
                  <Routes>
                    <Route index element={<Info />} />
                    <Route path="password" element={<Password />} />
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
