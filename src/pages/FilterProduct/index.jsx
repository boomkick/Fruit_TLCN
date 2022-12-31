import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { Pagination as MuiPagination } from "@mui/material";
import SearchBar from "../../components/SearchBar";

function FilterProduct(props) {
  const idParam = useParams().id
  const [idCategory, setIdCategory] = useState(idParam || "");
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderBy, setOrderBy] = useState(1);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [filter, setFilter] = useState(false);
  const [maxPage, setMaxPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getData = async () => {
      let param = {
        page: currentPage,
        pageSize: 8,
      };
      if (keyWord != null && keyWord !== "") {
        param["keyword"] = keyWord
      }
      if (idCategory !== "") {
        param["categoryId"] = idCategory
      }

      if (minValue ) {
        param["minPrice"] = minValue
      }

      if (maxValue ) {
        param["maxPrice"] = maxValue
      }

      switch (orderBy) {
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
  }, [idCategory, filter, orderBy, currentPage, keyWord]);

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

  // Tìm kiếm theo keyword
  const handleChangeKeyWord = (value) => {
    console.log("key", value);
    setKeyWord(value)
  }

  // Sắp xếp
  const handleChangeOrderBy = (event) => {
    setOrderBy(Number(event.target.value));
  };

  // Lọc sản phẩm theo khoảng giá
  const handleMinMaxPrice = () => {
    if (!filter && parseInt(maxValue) < parseInt(minValue)) {
      toast.error("Nhập giá trị sau lớn hơn")
    } else {
      setFilter(filter ? false : true);
    }
  };

  // Xử lí phân trang
  
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  }

  // Lọc sản phẩm theo category
  const handleChangeCategory = (event) => {
    setIdCategory(event.target.value)
  }

  // Lọc sản phẩm theo khoảng giá
  function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
  const handleChangeMinValue = (event) => {
    if (isNumber(event.target.value) || event.target.value === "" || !event.target.value){
      setMinValue(event.target.value)
    }else {
      setMinValue("")
      toast.info("Vui lòng nhập chữ số nguyên")
    }
  }

  const handleChangeMaxValue = (event) => {
    if (isNumber(event.target.value) || event.target.value === "" || !event.target.value){
      setMaxValue(event.target.value)
    }else {
      setMaxValue("")
      toast.info("Vui lòng nhập chữ số nguyên")
    }
  }
  
  
  return (
    <Stack className="filterProduct container" direction="row" spacing={1}>
      <Stack className="filterProduct__sidebar" direction="column">
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title" style={{textTransform: "uppercase"}}>TÌM KIẾM</Typography>
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
            <SearchBar onChangeKeyWord={handleChangeKeyWord}/>
          </Box>
        </Box>
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">
            Danh mục sản phẩm
          </Typography>
          <FormControl sx={{ minWidth: 120 , width: "100%"}}>
            <Select
              value={idCategory}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={handleChangeCategory}
            >
              <MenuItem value={""}>
                <em>Mặc định</em>
              </MenuItem>
              {categories ? categories.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>) : <></>}
            </Select>
          </FormControl>
        </Box>
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">
            Sắp xếp theo
          </Typography>
          <FormControl sx={{ minWidth: 120 , width: "100%"}}>
            <Select
              value={orderBy}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={handleChangeOrderBy}
            >
              {tabs ? tabs.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>) : <></>}
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
                disabled={filter ? true : false}
              />
            <TextField
                value={maxValue}
                label="Đến"
                variant="standard"
                sx={{ flex: 1 }}
                disabled={filter ? true : false}
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
                {filter ? "Huỷ" : "Lọc sản phẩm"}
              </Button>
            </Box>
          </Box>
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
              {category?.name ? category?.name : "Toàn bộ sản phẩm đã lọc"}
            </Typography>
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
