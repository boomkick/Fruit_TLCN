import "./Footer.scss";
import { Link } from "react-router-dom";

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

const { Stack } = require("@mui/system");

function Header() {
  return (
    <header id="footer" className="footer">
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="flex-start"
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "1170px",
          margin: "0 175px",
          paddingTop: "30px",
        }}
      >
        <div style={{ padding: "0px 15px" }}>
          <span className="footer_title">Hỗ trợ khách hàng</span>
          <div className="footer_divier"></div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <Link className="footer_content" to={"/"}>
                  Hướng dẫn đặt hàng trực tuyến
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  FAQ - Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  Hướng dẫn mua đàn guitar cho người mới tập
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: "0px 15px" }}>
          <span className="footer_title">Danh mục sản phẩm</span>
          <div className="footer_divier"></div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <Link className="footer_content" to={"/"}>
                  Đàn Guitar Acoustic
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  Đàn Guitar Epiphone DR-100
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  Capo Guitar Giá Rẻ
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  Dây Đàn Guitar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: "0px 15px" }}>
          <span className="footer_title">Kết Nối Với Guitar Station</span>
          <div className="footer_divier"></div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
              <a href="https://www.facebook.com/guitarstation.vn/">
                <FacebookOutlinedIcon sx={{color:"#fff"}}></FacebookOutlinedIcon>
              </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: "0px 15px" }}>
          <span className="footer_title">Địa Chỉ Liên Hệ</span>
          <div className="footer_divier"></div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
              D35 KQH Ngô Quyền, phường 7 Tp Đà Lạt, Lâm Đồng
              </li>
              <li>
              Làm việc kể cả Thứ 7 - Chủ Nhật
              </li>
              <li>
                Hotline: 093 471 0592
              </li>
            </ul>
          </div>
        </div>
      </Stack>
    </header>
  );
}

export default Header;
