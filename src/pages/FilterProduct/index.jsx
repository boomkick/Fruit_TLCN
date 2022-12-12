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

import SearchBar from "../../components/SearchBar";
import { fontSize } from "@mui/system";

function FilterProduct(props) {
  const idCategory = useParams().id;
  // const slugCategory = useParams().slug;
  // const [category, setCategory] = useState(null);

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

  //Filter change price
  const [valueFilterPrice, setValueFilterPrice] = React.useState([
    295000, 7500000,
  ]);
  // const [page, setPage] = useState(0);
  // const [test, setTest] = useState([1,2,3]);
  // const [filter, setFilter] = useState({});

  const [productFilter, setProductFilter] = useState([]);

  // const navigate = useNavigate();
  // const size = 30;
  // const sort = "product_id";

  useEffect(() => {
    const getData = async () => {
      let param = {
        page: 0,
        size: 6,
        min_price: 0,
        max_price: 10000000,
      };

      if (filterPrice.apply) {
        param = {
          ...param,
          min_price: filterPrice.minPrice,
          max_price: filterPrice.maxPrice,
        };
      }
      switch (value) {
        case 1: {
          break;
        }
        case 3: {
          param = { ...param, sort: "product_id" };
          break;
        }
        case 4: {
          param = { ...param, sort: "price_asc" };
          break;
        }
        case 5: {
          param = { ...param, sort: "price_desc" };
          break;
        }
        default: {
          break;
        }
      }

      apiProduct
        .getProductsByCateId(param, idCategory)
        .then((res) => {
          setProducts(res.data.list);
        })
        .catch((error) => {
          setProducts(null);
        });

      console.log("111", param);
    };
    getData();
  }, [idCategory, filter, filterPrice.apply, value]);

  useEffect(() => {
    const getData = async () => {
      apiCategory
        .showAllCategoryHeader()
        .then((res) => {
          setCategories(res.data.category);
        })
        .catch((error) => {
          setCategories([]);
        });
    };
    getData();
  }, []);

  const handleChangeFilterPrice = (event, newValue) => {
    setValueFilterPrice(newValue);
    setFilterPrice({
      ...filterPrice,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  // const onSetFilterPrice = (value, index) => {
  //   setFilterPrice((pre) => {
  //     return {
  //       ...pre,
  //       option: index,
  //       value: value,
  //     };
  //   });
  // };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   console.log(newValue)
  // };
  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  const handleApplyFilterPrice = () => {
    setFilterPrice((pre) => {
      return { ...pre, apply: !pre.apply };
    });
  };

  console.log("33",products)

  return (
    <Stack className="filterProduct container" direction="row" spacing={1}>
      <Stack className="filterProduct__sidebar" direction="column">
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">TÌM KIẾM</Typography>
          <Box
            sx={{
              backgroundColor: "#F4BA36",
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
              backgroundColor: "#F4BA36",
              border: 0,
              height: "3px",
              margin: "7px 0",
              maxWidth: "30px",
              width: "100%",
            }}
          />
          <FormGroup>
            {categories.map((item) => (
              <Box
                key={item.id}
                onClick={() => refreshPage()}
                sx={{ padding: "6px" }}
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
                min={295000}
                max={7500000}
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
              backgroundColor: "#F4BA36",
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
              Category
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
          {/* <Grid container spacing={2}>
            {productFilter.map((item) => (
              <Grid key={item.id} item xs={3}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid> */}
          <Grid container spacing={2}>
            {(value===2 ? products?.sort((a,b) => b.sellAmount - a.sellAmount) : products)?.map((item) => (
              <Grid key={item.id} item xs={3}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
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
    name: "Bán chạy",
  },
  {
    id: 3,
    name: "Hàng mới",
  },
  {
    id: 4,
    name: "Giá thấp",
  },
  {
    id: 5,
    name: "Giá cao",
  },
];
export default FilterProduct;
