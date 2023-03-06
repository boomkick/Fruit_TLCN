import "./Home.scss";
import { Stack, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Pagination as MuiPagination } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import StarIcon from "@mui/icons-material/Star";
import DoneIcon from "@mui/icons-material/Done";
import CardProduct from "../../components/CardProduct";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import apiProduct from "../../apis/apiProduct";
import { useDispatch, useSelector } from "react-redux";
import apiAddress from "../../apis/apiAddress";
import { setAddress } from "../../slices/addressSlice";
import GetTop8ProductProvider from "../../providers/GetTop8ProductProvider";
import GetAllProductProvider from "../../providers/GetAllProductProvider";
import GetTop8ProductConsumer from "../../consumers/GetTop8ProductConsumer";
import GetAllProductConsumer from "../../consumers/GetAllProductConsumer";

function Home() {
  const address = useSelector((state) => {
    return state.address.locations;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (address === null) {
      apiAddress.getVietNamLocations().then((res) => {
        dispatch(setAddress(res.data));
        console.log("address: ", address);
      });
    }
  }, []);

  return (
    <Stack spacing={2} className="home">
      <Box id="section1">
        <SlideBackGround />
      </Box>
      <Box id="section2" style={{ backgroundColor: "red" }}>
        <SlideHome />
      </Box>
    </Stack>
  );
}

function SlideBackGround() {
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        id="slider-home"
        className="mySwiper "
      >
        <SwiperSlide>
          <div className="bg bg1"></div>
          <div className="text-content">
            <h3 className="text-heading" style={{ textTransform: "uppercase" }}>
              QUÀ TẶNG TRÁI CÂY – TRAO LỜI MUỐN NÓI
            </h3>
            <h4 className="text-description">Giá chỉ từ 1.000.000đ</h4>
            <p style={{ margin: "25px 0" }}>
              <Box
                sx={{
                  margin: "0 40%",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{
                    border: "2px solid currentColor",
                    width: "100%",
                    color: "#ffffff",
                    // textTransform:"uppercase",
                    fontSize: "20px",
                    "&:hover": {
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      color: "#666",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  Mua ngay
                </Button>
              </Box>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg bg2"></div>
          <div className="text-content">
            <h2
              className="text-heading"
              style={{ lineHeight: "60px", textTransform: "uppercase" }}
            >
              Vị ngon bùng nổ vị giác
            </h2>
            <p>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <Button
                  sx={{
                    border: "2px solid currentColor",
                    color: "#fff",
                    fontSize: "20px",
                    // textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      color: "#666",
                    },
                  }}
                >
                  Tư vấn trái cây
                </Button>
                <Button
                  sx={{
                    border: "2px solid currentColor",
                    color: "#fff",
                    fontSize: "20px",
                    // textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      color: "#666",
                    },
                  }}
                >
                  Mua sản phẩm ngay
                </Button>
              </Stack>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

function SlideHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = React.useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);
  return (
    <>
      <GetAllProductProvider page={currentPage}>
        <GetTop8ProductProvider>
          <section className="section" id="section_1">
            <div className="section-content">
              {/* introduce */}
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
                sx={{
                  maxWidth: "1170px",
                  width: "100%",
                  margin: "0 175px",
                }}
              >
                {/* Box1 */}
                <Box
                  sx={{
                    position: "relative",
                    margin: "0",
                    padding: "0 15px 30px",
                    width: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={0}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "44px",
                        position: "relative",
                        marginBottom: "0",
                        maxWidth: "200px",
                      }}
                    >
                      <div className="icon-box">
                        <LocalShippingIcon
                          sx={{
                            position: "absolute",
                            left: "0",
                            objectFit: "cover",
                            padding: "0",
                            top: "20%",
                            left: "20%",
                            margin: "0",
                          }}
                        ></LocalShippingIcon>
                      </div>
                    </div>
                    <div className="icon-text">
                      <p
                        style={{
                          lineHeight: "22px",
                          fontSize: "16px",
                        }}
                      >
                        {
                          "Giao hàng hỏa tốc trong vòng 4h và miễn phí vận chuyển khi có hóa đơn trên "
                        }
                        <strong>400,000đ</strong>
                      </p>
                    </div>
                  </Stack>
                </Box>

                {/* Box2 */}

                <Box
                  sx={{
                    position: "relative",
                    margin: "0",
                    padding: "0 15px 30px",
                    width: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={0}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "44px",
                        position: "relative",
                        marginBottom: "0",
                        maxWidth: "200px",
                      }}
                    >
                      <div className="icon-box">
                        <CardGiftcardIcon
                          sx={{
                            position: "absolute",
                            left: "0",
                            objectFit: "cover",
                            padding: "0",
                            top: "20%",
                            left: "20%",
                            margin: "0",
                          }}
                        ></CardGiftcardIcon>
                      </div>
                    </div>
                    <div className="icon-text">
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: "22px",
                        }}
                      >
                        Trái cây tươi ngon 100%, không ngon không lấy tiền
                      </p>
                    </div>
                  </Stack>
                </Box>

                {/* Box3 */}

                <Box
                  sx={{
                    position: "relative",
                    margin: "0",
                    padding: "0 15px 30px",
                    width: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={0}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "44px",
                        position: "relative",
                        marginBottom: "0",
                        maxWidth: "200px",
                      }}
                    >
                      <div className="icon-box">
                        <PriceCheckIcon
                          sx={{
                            position: "absolute",
                            left: "0",
                            objectFit: "cover",
                            padding: "0",
                            top: "20%",
                            left: "20%",
                            margin: "0",
                          }}
                        ></PriceCheckIcon>
                      </div>
                    </div>
                    <div className="icon-text">
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: "22px",
                        }}
                      >
                        Đặt hàng online nhanh chóng, tiện lợi, thanh toán sau
                        khi nhận hàng
                      </p>
                    </div>
                  </Stack>
                </Box>
              </Stack>

              {/* top product */}
              <Box
                sx={{
                  maxWidth: "1170px",
                  width: "100%",
                  margin: "0 175px",
                  padding: "0px 15px 30px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    marginBottom: "20px",
                  }}
                >
                  <h2 className="section-title">
                    <b></b>
                    <span className="section-title-main">
                      <StarIcon sx={{ marginRight: "12px" }}></StarIcon>
                      {"Trái cây được mua nhiều nhất"}
                    </span>
                    <b></b>
                  </h2>
                </Stack>
                <GetTop8ProductConsumer />
              </Box>

              {/* saleProduct */}

              <Box
                sx={{
                  maxWidth: "1170px",
                  width: "100%",
                  margin: "0 175px",
                  padding: "0px 15px 30px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    marginBottom: "20px",
                  }}
                >
                  <h2 className="section-title">
                    <b></b>
                    <span className="section-title-main">
                      <CardGiftcardIcon
                        sx={{ marginRight: "12px" }}
                      ></CardGiftcardIcon>
                      {"Khuyến mãi bùng nổ"}
                    </span>
                    <b></b>
                  </h2>
                </Stack>
                <GetTop8ProductConsumer />
              </Box>

              {/* Category */}
              <Box
                sx={{
                  maxWidth: "1170px",
                  width: "100%",
                  margin: "0 175px",
                  padding: "0px 15px 30px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    marginBottom: "20px",
                  }}
                >
                  <h2 className="section-title">
                    <b></b>
                    <span className="section-title-main">
                      <DoneIcon sx={{ marginRight: "12px" }}></DoneIcon>
                      {"Toàn bộ sản phẩm"}
                    </span>
                    <b></b>
                  </h2>
                </Stack>
                  <GetAllProductConsumer
                    handleChangePage={handleChangePage}
                    currentPage={currentPage}
                  />
              </Box>
            </div>
          </section>
        </GetTop8ProductProvider>
      </GetAllProductProvider>
    </>
  );
}

export default Home;
