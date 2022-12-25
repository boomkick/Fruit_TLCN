import { useState, useEffect, useCallback } from "react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Box,
  Button,
  Typography,
  Checkbox,
  FormGroup,
  Grid,
  Rating,
  Tab,
  RadioGroup,
  Tabs,
  Radio,
  Slider,
  FormControl,
  NativeSelect,
} from "@mui/material";
import "./FilterProduct.scss";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { numWithCommas } from "../../constraints/Util";
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import apiCategory from "../../apis/apiCategory";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Pagination as MuiPagination } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { fontSize } from "@mui/system";

function FilterProduct(props) {
  const idCategory = useParams().id;
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterPrice, setFilterPrice] = useState({
    minPrice: "",
    maxPrice: "",
    apply: false,
    value: "",
  });
  const [maxPage, setMaxPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  //Filter change price
  const [valueFilterPrice, setValueFilterPrice] = React.useState([
    0, 1000000,
  ]);

  useEffect(() => {
    const getData = async () => {
      let param = {
        categoryId: idCategory,
        page: currentPage,
        pageSize: 8,
      };

      if (filterPrice.apply) {
        param["minPrice"] = filterPrice.minPrice
        param["maxPrice"] = filterPrice.maxPrice
      }

      switch (value) {
        case 1: {
          break;
        }
        case 2: {
          // Hàng mới
          param["orderBy"] = "ID"
          break;
        }
        case 3: {
          // Giá từ thấp lên cao
          param["orderBy"] = "PRICE"
          param["order"] = "ASC"
          break;
        }
        case 4: {
          // Giá từ cao xuống thấp
          param["orderBy"] = "PRICE"
          param["order"] = "DESC"
          break;
        }
        default: {
          break;
        }
      }

      apiProduct
        .getProductsByCategory(param)
        .then((res) => {
          setProducts(res.data.products);
          setMaxPage(res.data.maxPage);
        })
        .catch((error) => {
          setProducts(null);
        });

    };
    getData();
  }, [idCategory, filter, filterPrice.apply, value, currentPage]);

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
      
      if(categories) {
        setCategory(categories.find((item) => item.id == idCategory))
      }
    };

    getCategories();
  }, []);
  
  useEffect(() => {
    setCategory(category)
  }, [idCategory])

  const handleChangeFilterPrice = (event, newValue) => {
    setValueFilterPrice(newValue);
    setFilterPrice({
      ...filterPrice,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  const handleApplyFilterPrice = () => {
    setFilterPrice((pre) => {
      return { ...pre, apply: !pre.apply };
    });
  };

  // Xử lí phân trang
  
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  }
  
  return (
    <Stack className="filterProduct container" direction="row" spacing={1}>
      <Stack className="filterProduct__sidebar" direction="column">
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">TÌM KIẾM</Typography>
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
            <SearchBar />
          </Box>
        </Box>
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">
            DANH MỤC SẢN PHẨM
          </Typography>
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
          <FormGroup sx={{textOverflow: "ellipsis", overflow: "hidden" }}>
            {categories.map((item) => (
              <Box
                key={item.id}
                onClick={() => refreshPage()}
                sx={{ padding: "6px"}}
              >
                <Link to={`/product-category/${item.id}`}>
                  <Box fontSize="14px">{item.name}</Box>
                </Link>
              </Box>
            ))}
          </FormGroup>
        </Box>
        <Box className="filterProduct__form">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Slider
                value={valueFilterPrice}
                onChange={handleChangeFilterPrice}
                // valueLabelDisplay="auto"
                min={0}
                max={1000000}
                sx={{ color: "#666" }}
                disabled={filterPrice.apply}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="info"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#666",
                  color: "white",
                }}
                onClick={handleApplyFilterPrice}
              >
                {filterPrice.apply ? "Huỷ" : "Lọc sản phẩm"}
              </Button>
              <Typography sx={{ fontSize: "12px" }}>
                Giá: {numWithCommas(valueFilterPrice[0])} đ -{" "}
                {numWithCommas(valueFilterPrice[1])} đ
              </Typography>
            </Box>
          </Box>
        </Box>
          <Box className="filterProduct__form">
            <Typography className="filterProduct__title">THƯƠNG HIỆU</Typography>
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
          <FormGroup>
            {/* {categories.map((item) => (
              <Box
                key={item.id}
                onClick={() => refreshPage()}
                sx={{ padding: "6px" }}
              >
                <Link to={`/product-category/${item.id}`}>
                  <Box fontSize="14px">{item.name}</Box>
                </Link>
              </Box>
            ))} */}
          </FormGroup>
        </Box>
      </Stack>
      <Box sx={{ flex: 1 }}>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="basic tabs example"
          >
            {tabs.map((item) => (
              <Tab
                key={item.id}
                label={item.name}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
            ))}
          </Tabs>
        </Box> */}
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
              {category?.name ? category?.name : "Category"}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <NativeSelect
                value={value}
                onChange={handleChange}
                inputProps={{
                  name: "tabs",
                }}
              >
                {tabs.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Box>
        </Stack>
        <Box>
          <Grid container spacing={2}>
            {(products)?.map((item) => (
              <Grid key={item.id} item xs={3}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
          {maxPage < 2 ? <></> : (
            <Box className="products-pagination">
            <MuiPagination count={maxPage} onChange={handleChangePage} page={currentPage} shape="rounded" sx={{ alignItems: "center" }}/>
          </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
}

const refreshPage = () => {
  window.location.reload();
};
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
export default FilterProduct;
