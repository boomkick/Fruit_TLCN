import "./Header.scss";
import { Link } from "react-router-dom";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";

import { Stack, Button, Typography, Badge, Box, Modal } from "@mui/material";

function Header() {
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
            style={{ width: "70px", height: "70px" }}
            src="https://guitar.station.vn/wp-content/uploads/2018/11/Logo-White-500x500.png"
          />
        </Link>

        {/* Left Element */}
        <div className="element header__leftElement">
          <ul className="navbar">
            <li>
              <Link to={"/"}>
                Đàn Guitar<span className="child"></span>
                {/* <FontAwesomeIcon icon="fa-light fa-chevron-down" /> */}
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Đàn Guitar Acoustic</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                Nhạc Cụ Khác<span className="child"></span>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Đàn Guitar Acoustic</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                Phụ Kiện Guitar<span className="child"></span>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Đàn Guitar Acoustic</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                Tự Học Guitar<span className="child"></span>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"/"}>Đàn Guitar Acoustic</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/"}>
                Hỗ Trợ Khách Hàng<span className="child"></span>
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
            <li>
              <Button
                // onClick={openModalLogin}
                sx={{ color: "white", }}
              >
                <Typography
                  sx={{ fontSize: "13px", textTransform: "uppercase" }}
                >
                  Đăng nhập / Đăng ký
                </Typography>
              </Button>
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
    </header>
  );
}

export default Header;
