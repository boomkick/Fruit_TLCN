import "./Home.scss";
import {
  Stack,
  Button,
  Box,
  Grid,
  styled,
  Paper,
  createTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Navigation, Autoplay, EffectCreative } from "swiper";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import StarIcon from "@mui/icons-material/Star";
import DoneIcon from "@mui/icons-material/Done";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import apiAddress from "../../apis/apiAddress";
import { setAddress } from "../../slices/addressSlice";
import GetTop8ProductProvider from "../../providers/GetTop8ProductProvider";
import GetAllProductProvider from "../../providers/GetAllProductProvider";
import GetTop8ProductConsumer from "../../consumers/GetTop8ProductConsumer";
import GetAllProductConsumer from "../../consumers/GetAllProductConsumer";
import GetBestProductProvider from "../../providers/GetBestProductProvider";
import GetBestProductConsumer from "../../consumers/GetBestProductConsumer";
import waterMelonPNG from "../../assets/fruit_icon/watermelon.png";
import bananaPNG from "../../assets/fruit_icon/banana.png";
import blueberriesPNG from "../../assets/fruit_icon/blueberries.png";
import applePNG from "../../assets/fruit_icon/apple.png";
import mangoPNG from "../../assets/fruit_icon/mango.png";
import cherriesPNG from "../../assets/fruit_icon/cherries.png";
import naturalFruitsBanner from "../../assets/fruit_banner/natural_fruits.jpg";
import GetNewProductsProvider from "../../providers/GetNewProductsProvider";
import GetNewProductsConsumer from "../../consumers/GetNewProductsConsumer";

const theme = createTheme({
  typography: {
    fontFamily: `"Pathway Extreme", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundImage:
    "url(https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png)",
  height: "136px",
  transition: "ease 0.5s",
  cursor: "pointer",
  ":hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
  },
}));

const fruitList = [
  {
    name: "Dưa hấu",
    link: `/product-category/?productName=Dưa hấu`,
    image: waterMelonPNG,
  },
  {
    name: "Chuối",
    link: `/product-category/?productName=Chuối`,
    image: bananaPNG,
  },
  {
    name: "Việt quất",
    link: `/product-category/?productName=Việt quất`,
    image: blueberriesPNG,
  },
  {
    name: "Táo",
    link: `/product-category/?productName=Táo`,
    image: applePNG,
  },
  {
    name: "Xoài",
    link: `/product-category/?productName=Xoài`,
    image: mangoPNG,
  },
  {
    name: "Cherry",
    link: `/product-category/?productName=Cherry`,
    image: cherriesPNG,
  },
];

function Home() {
  const address = useSelector((state) => {
    return state.address.locations;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (address === null) {
      apiAddress.getVietNamLocations().then((res) => {
        dispatch(setAddress(res.data));
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
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        id="slider-home"
        className="mySwiper "
      >
        <SwiperSlide>
          <div className="bg bg1"></div>
          <div className="text-content">
            <h3 className="text-heading" style={{ textTransform: "uppercase", opacity: "0.7" }}>
            Khám phá sự đa dạng của trái cây tươi
            </h3>
            <h4 className="text-description">Hãy cùng chúng tôi khám phá sự đa dạng tuyệt vời của trái cây tươi.</h4>
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
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    color: "#2AC5B3",
                    fontSize: "20px",
                    "&:hover": {
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  Xem ngay
                </Button>
              </Box>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg bg2"></div>
          <div className="text-content content-2">
            <h2
              className="text-heading"
              style={{ lineHeight: "60px", textTransform: "uppercase", color: "#2ac5b3" }}
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
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    color: "#2AC5B3",
                    fontSize: "20px",
                    "&:hover": {
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    },
                  }}
                >
                  Tư vấn trái cây
                </Button>
                <Button
                  sx={{
                    border: "2px solid currentColor",
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    color: "#2AC5B3",
                    fontSize: "20px",
                    "&:hover": {
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
          <GetNewProductsProvider>
            <GetBestProductProvider>
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
                            Đặt hàng online nhanh chóng, tiện lợi, thanh toán
                            sau khi nhận hàng
                          </p>
                        </div>
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                    sx={{
                      maxWidth: "1170px",
                      width: "100%",
                      margin: "20px 175px",
                    }}
                  >
                    <Grid container spacing={2}>
                      {fruitList.map((item) => (
                        <Grid item xs={6} md={2}>
                          <Link to={item.link}>
                            <Item>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "60%" }}
                              />
                            </Item>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>

                  {/* newProducts */}
                  <Box className="section-box">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        marginBottom: "30px",
                      }}
                    >
                      <h2 className="section-title">
                        <b></b>
                        <span className="section-title-main">
                          <NewReleasesIcon
                            sx={{ marginRight: "16px", fontSize: "35px" }}
                          ></NewReleasesIcon>
                          {"Danh sách sản phẩm mới"}
                        </span>
                        <b></b>
                      </h2>
                    </Stack>
                    <GetNewProductsConsumer />
                  </Box>

                  {/* best product */}
                  <Box className="section-box">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        marginBottom: "30px",
                      }}
                    >
                      <h2 className="section-title">
                        <b></b>
                        <span className="section-title-main">
                          <StarIcon
                            sx={{ marginRight: "16px", fontSize: "35px" }}
                          ></StarIcon>
                          {"Trái cây được mua nhiều nhất"}
                        </span>
                        <b></b>
                      </h2>
                    </Stack>
                    <GetBestProductConsumer />
                  </Box>

                  {/* saleProduct */}
                  <Box className="section-box">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        marginBottom: "30px",
                      }}
                    >
                      <h2 className="section-title">
                        <b></b>
                        <span className="section-title-main">
                          <CardGiftcardIcon
                            sx={{ marginRight: "16px", fontSize: "35px" }}
                          ></CardGiftcardIcon>
                          {"Những sản phẩm bán chạy"}
                        </span>
                        <b></b>
                      </h2>
                    </Stack>
                    <GetTop8ProductConsumer />
                  </Box>

                  {/* Category */}
                  <Box className="section-box">
                    <img
                      src={naturalFruitsBanner}
                      alt="banner"
                      style={{ width: "100%" }}
                    />
                  </Box>

                  {/* Category */}
                  <Box className="section-box">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        marginBottom: "30px",
                      }}
                    >
                      <h2 className="section-title">
                        <b></b>
                        <span className="section-title-main">
                          <DoneIcon
                            sx={{ marginRight: "16px", fontSize: "35px" }}
                          ></DoneIcon>
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
            </GetBestProductProvider>
          </GetNewProductsProvider>
        </GetTop8ProductProvider>
      </GetAllProductProvider>
    </>
  );
}

export default Home;
