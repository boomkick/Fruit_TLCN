import { useState, useEffect, Fragment } from "react";
import React from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import "./FilterProduct.scss";
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import apiCategory from "../../apis/apiCategory";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { Pagination as MuiPagination } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import juicyFruitBanner50 from "../../assets/fruit_banner/juicy_fruit_50.jpg";
import AlertNotFound from "../../components/AlertNotFound";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import apiModelImageSearching from "../../apis/apiModelImageSearching";
import LoadingAPI from "../../components/LoadingAPI";

const tabs = [
  {
    id: 1,
    name: "Mặc định",
  },
  {
    id: 2,
    name: "Hàng mới",
  },
  {
    id: 3,
    name: "Giá thấp",
  },
  {
    id: 4,
    name: "Giá cao",
  },
];

const ProductList = [
  {
    id: 1,
    name: "Mặc định",
  },
  {
    id: 2,
    name: "Chuối",
  },
  {
    id: 3,
    name: "Táo",
  },
  {
    id: 4,
    name: "Cam",
  },
  {
    id: 5,
    name: "Ổi",
  },
  {
    id: 6,
    name: "Thăng long",
  },
  {
    id: 7,
    name: "Xoài",
  },
  {
    id: 8,
    name: "Thơm",
  },
  {
    id: 9,
    name: "Mẵng cầu",
  },
];

function FilterProduct(props) {
  const idParam = useParams().id;
  const [idCategory, setIdCategory] = useState(idParam || "");
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState(1);
  const [categories, setCategories] = useState([]);
  const [orderBy, setOrderBy] = useState(1);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [maxPage, setMaxPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Re-render when change id
  const { id } = useParams();
  const location = useLocation();
  const [, setRenderCount] = useState(0);

  useEffect(() => {
    setIdCategory(id || "");
    setRenderCount((count) => count + 1);
  }, [location.pathname, id]);

  useEffect(() => {
    setTimeout(() => {
      setKeyWord(new URLSearchParams(location.search).get("productName"));
      setRenderCount((count) => count + 1);
    }, 200);
  }, [location]);

  // Tìm kiếm bằng hình ảnh
  const [imageSearching, setImageSearching] = useState(null);
  const [imageSearchingLoading, setImageSearchingLoading] = useState(false);

  useEffect(() => {
    const getImageSearching = async () => {
      if (imageSearching) {
        setImageSearchingLoading(true);
        let params = new FormData();
        params.append("images", imageSearching);
        await apiModelImageSearching
          .postGetForm(params)
          .then((res) => {
            setKeyWord(res?.fruit);
          })
          .catch((err) => {
            toast.error(err);
          });
        setImageSearchingLoading(false);
      }
    };
    getImageSearching();
  }, [imageSearching]);

  useEffect(() => {
    handleGetData();
  }, [idCategory, orderBy, currentPage, keyWord, idParam, id]);

  const handleGetData = async () => {
    let param = {
      page: currentPage,
      pageSize: 8,
    };
    param["isDeleted"] = false;
    if (keyWord != null && keyWord !== "") {
      param["keyword"] = keyWord;
    }
    if (idCategory !== "") {
      param["categoryId"] = idCategory;
    }

    if (minValue) {
      param["minPrice"] = minValue;
    }

    if (maxValue) {
      param["maxPrice"] = maxValue;
    }

    switch (orderBy) {
      case 1: {
        break;
      }
      case 2: {
        // Hàng mới
        param["orderBy"] = "ID";
        break;
      }
      case 3: {
        // Giá từ thấp lên cao
        param["orderBy"] = "PRICE";
        param["order"] = "ASC";
        break;
      }
      case 4: {
        // Giá từ cao xuống thấp
        param["orderBy"] = "PRICE";
        param["order"] = "DESC";
        break;
      }
      default: {
        break;
      }
    }

    await apiProduct
      .getProductsByCategory(param)
      .then((res) => {
        setProducts(res.data.products);
        setMaxPage(res.data.maxPage);
      })
      .catch((error) => {
        setProducts(null);
      });
  };

  // Lấy dữ liệu category
  useEffect(() => {
    const getCategories = async () => {
      await apiCategory
        .showAllCategory()
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          setCategories([]);
        });

      if (categories) {
        setCategory(categories.find((item) => item.id == idCategory));
      }
    };

    getCategories();
  }, []);

  // Tìm kiếm theo keyword
  const handleChangeKeyWord = (value) => {
    setKeyWord(value);
  };

  // Sắp xếp
  const handleChangeOrderBy = (event) => {
    setOrderBy(Number(event.target.value));
  };

  // Lọc sản phẩm theo khoảng giá
  const handleMinMaxPrice = () => {
    if (parseInt(maxValue) < parseInt(minValue)) {
      toast.error("Nhập giá trị sau lớn hơn");
    } else {
      handleGetData();
    }
  };

  // Xử lí phân trang

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Lọc sản phẩm theo category
  const handleChangeProduct = (event) => {
    let product = ProductList.find(
      (item) => item.id === Number(event.target.value)
    );
    setProductFilter(product.id);
    setKeyWord(product.id !== 1 ? product.name : "");
  };

  // Lọc sản phẩm theo category
  const handleChangeCategory = (event) => {
    setIdCategory(event.target.value);
  };

  // Lọc sản phẩm theo khoảng giá
  function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }
  const handleChangeMinValue = (event) => {
    if (
      isNumber(event.target.value) ||
      event.target.value === "" ||
      !event.target.value
    ) {
      setMinValue(event.target.value);
    } else {
      setMinValue("");
      toast.info("Vui lòng nhập chữ số nguyên");
    }
  };

  const handleChangeMaxValue = (event) => {
    if (
      isNumber(event.target.value) ||
      event.target.value === "" ||
      !event.target.value
    ) {
      setMaxValue(event.target.value);
    } else {
      setMaxValue("");
      toast.info("Vui lòng nhập chữ số nguyên");
    }
  };

  return (
    <>
      <Stack
        className="banner container"
        style={{ marginBottom: "10px", marginTop: "10px" }}
      >
        <img src={juicyFruitBanner50} alt="banner" style={{ width: "100%" }} />
      </Stack>
      <Stack className="filterProduct container" direction="row" spacing={1}>
        <Stack className="filterProduct__sidebar" direction="column">
          <Box className="filterProduct__form">
            <Stack className="filterProduct__search">
              <Typography
                className="filterProduct__title"
                style={{ textTransform: "uppercase" }}
              >
                TÌM KIẾM
              </Typography>
              {/* <CameraAltOutlinedIcon className="filterProduct__icon-camera"/> */}
            </Stack>

            <Box
              sx={{
                backgroundColor: "#3D8B91",
                border: 0,
                height: "3px",
                margin: "7px 0",
                maxWidth: "30px",
                width: "100%",
              }}
            />
            <Box>
              <SearchBar
                onChangeKeyWord={handleChangeKeyWord}
                value={keyWord}
              />
            </Box>
          </Box>
          <Box className="filterProduct__form">
            <Typography className="filterProduct__title">
              Tìm kiếm bằng hình ảnh
            </Typography>
            <Stack
              display={"flex"}
              flexDirection={"column"}
              flex={"1"}
              justifyContent={"center"}
              alignItem={"center"}
            >
              <LoadingAPI loading={imageSearchingLoading}>
                {imageSearching ? (
                  <img
                    src={
                      imageSearching
                        ? URL.createObjectURL(imageSearching)
                        : null
                    }
                    width="100%"
                    height="180px"
                    style={{ marginRight: "10px", borderRadius: "5px" }}
                    alt=""
                  />
                ) : null}

                <FormControl
                  sx={{ minWidth: 120, width: "100%", marginTop: "10px" }}
                >
                  <Fragment>
                    <input
                      color="primary"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        setImageSearching(e.target.files[0]);
                      }}
                      id="icon-button-file"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="icon-button-file">
                      <Button
                        variant="outlined"
                        startIcon={<CameraAltOutlinedIcon />}
                        color="success"
                        component={"span"}
                        sx={{ marginTop: "0px !important", width: "100%" }}
                      >
                        Thêm ảnh
                      </Button>
                    </label>
                  </Fragment>
                </FormControl>
              </LoadingAPI>
            </Stack>
          </Box>
          <Box className="filterProduct__form">
            <Typography className="filterProduct__title">Trái cây</Typography>
            <FormControl sx={{ minWidth: 120, width: "100%" }}>
              <Select
                value={productFilter}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={handleChangeProduct}
              >
                {ProductList ? (
                  ProductList.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
          </Box>
          <Box className="filterProduct__form">
            <Typography className="filterProduct__title">
              Danh mục sản phẩm
            </Typography>
            <FormControl sx={{ minWidth: 120, width: "100%" }}>
              <Select
                value={idCategory}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={handleChangeCategory}
              >
                <MenuItem value={""}>Mặc định</MenuItem>
                {categories ? (
                  categories.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
          </Box>
          <Box className="filterProduct__form">
            <Typography className="filterProduct__title">
              Sắp xếp theo
            </Typography>
            <FormControl sx={{ minWidth: 120, width: "100%" }}>
              <Select
                value={orderBy}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={handleChangeOrderBy}
              >
                {tabs ? (
                  tabs.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </FormControl>
          </Box>
          <Box className="filterProduct__form">
            <Typography className="filterProduct__title">
              Tùy chọn khoảng giá mong muốn
            </Typography>
            <TextField
              value={minValue}
              label="Giá từ"
              variant="standard"
              sx={{ flex: 1 }}
              onChange={handleChangeMinValue}
            />
            <TextField
              value={maxValue}
              label="Đến"
              variant="standard"
              sx={{ flex: 1 }}
              onChange={handleChangeMaxValue}
            />
          </Box>
          <Box className="filterProduct__form">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: "#666",
                    color: "white",
                  }}
                  onClick={handleMinMaxPrice}
                >
                  {"Lọc sản phẩm"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
        <Box sx={{ flex: 1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  padding: "14px 0",
                  fontWeight: "500 !important",
                  textTransform: "uppercase",
                }}
              >
                {category?.name ? category?.name : "Toàn bộ sản phẩm đã lọc"}
              </Typography>
            </Box>
          </Stack>
          <Box>
            <Grid container spacing={2}>
              {products.length > 0 ? (
                products?.map((item) => (
                  <Grid key={item.id} item xs={3}>
                    <CardProduct data={item} />
                  </Grid>
                ))
              ) : (
                <Grid xs={12}>
                  <AlertNotFound
                    value={"Không có dòng sản phẩm bạn muốn tìm kiếm"}
                  />
                </Grid>
              )}
            </Grid>
            {maxPage < 2 ? (
              <></>
            ) : (
              <Box className="products-pagination">
                <MuiPagination
                  count={maxPage}
                  onChange={handleChangePage}
                  page={currentPage}
                  shape="rounded"
                  sx={{ alignItems: "center" }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default FilterProduct;
