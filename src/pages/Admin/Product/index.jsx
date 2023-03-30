import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  MenuItem,
  FormControl,
  Select,
  Modal,
} from "@mui/material";
import "./Product.scss";
import { Link } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import apiProduct from "../../../apis/apiProduct";
import { toast } from "react-toastify";
import apiCategory from "../../../apis/apiCategory";
import { productStatus } from "../../../constraints/Product";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { green, red } from "@mui/material/colors";

const sortByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "ID ", name: "Ngày tạo" },
  { id: 2, label: "PRICE", name: "Giá sản phẩm" },
];

const orderByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "ASC", name: "Tăng dần" },
  { id: 2, label: "DESC", name: "Giảm dần" },
];

function Product() {
  const [modalDelete, setModalDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemdelete, setItemdelete] = useState(null);

  // Khai báo bộ lọc
  // Theo nội dung keyword
  const [keyWord, setKeyWord] = useState("");
  const handleChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  // Theo danh mục
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
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
    };

    getCategories();
  }, []);

  // Theo giá trị sản phẩm
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
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

  // Sắp xếp loại
  const [sortBy, setSortBy] = useState(0);
  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const [order, setOrder] = useState(0);
  const handleChangeOrder = (event) => {
    if (!sortBy || sortBy == 0) {
      toast.error("Vui lòng chọn sắp xếp theo loại trước");
      return;
    }
    setOrder(event.target.value);
  };

  // Xử lí xóa sản phẩm
  const openModalDelete = (row) => {
    setItemdelete(row);
    setModalDelete(true);
  };
  const closeModalDelete = () => setModalDelete(false);
  const handleDelete = () => {
    closeModalDelete();
    console.log("itemdelete: ", itemdelete);
    apiProduct
      .deleteProduct({ id: itemdelete.id })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Xóa sản phẩm thành công");
          const newProducts = products.filter((item) => {
            return itemdelete.id !== item.id;
          });
          setProducts(newProducts);
        } else {
          toast.error("Xóa sản phẩm không thành công");
        }
      })
      .catch((error) => {
        toast.error("Xóa sản phẩm không thành công!");
      });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

  React.useEffect(() => {
    const getData = async () => {
      let param = {
        page: page,
        pageSize: 8,
      };
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      if (minValue) {
        param["minPrice"] = minValue;
      }
      if (maxValue) {
        param["maxPrice"] = maxValue;
      }
      if (sortBy !== 0) {
        param["OrderBy"] = sortBy == 1 ? "ID" : "PRICE";
      }
      if (order !== 0) {
        param["order"] = order == 1 ? "ASC" : "DESC";
      }
      if (category !== "") {
        param["categoryId"] = category;
      }
      setProducts([]);
      apiProduct
        .getProductsByCategory(param)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPage(res.data.maxPage);
        })
        .catch((error) => {
          setProducts([]);
        });
    };
    getData();
  }, [page]);

  // Thực hiện lọc
  const handleFilter = () => {
    const getData = async () => {
      let param = {
        page: page,
        pageSize: 8,
      };
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      if (minValue) {
        param["minPrice"] = minValue;
      }
      if (maxValue) {
        param["maxPrice"] = maxValue;
      }
      if (sortBy !== 0) {
        param["OrderBy"] = sortBy == 1 ? "ID" : "PRICE";
      }
      if (order !== 0) {
        param["order"] = order == 1 ? "ASC" : "DESC";
      }
      if (category !== "") {
        param["categoryId"] = category;
      }
      setProducts([]);
      apiProduct
        .getProductsByCategory(param)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPage(res.data.maxPage);
        })
        .catch((error) => {
          setProducts([]);
        });
    };
    getData();
  };

  // Xử lí reset bộ lọc
  const handleReset = () => {
    setKeyWord("");
    setMinValue("");
    setMaxValue("");
    setCategory("");
    setSortBy(0);
    setOrder(0);
  };

  return (
    <>
      <Box className="productAdmin">
        <Stack
          direction="row"
          mb={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: "#FFF", height: "80px" }}
          px={2}
        >
          <Typography fontSize="26px">Quản lý sản phẩm</Typography>
          <Link to="/admin/product/create">
            <Button variant="outlined" pr={2}>
              Tạo sản phẩm
            </Button>
          </Link>
        </Stack>

        <Box style={{ backgroundColor: "#fff", p: 2, m: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            style={{ flexWrap: "wrap", justifyContent: "space-between" }}
          >
            <Stack direction="column" sx={{ width: "45%", marginLeft: "8px" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Nội dung tìm kiếm:
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Nội dung"
                  value={keyWord}
                  onChange={handleChangeKeyWord}
                  variant="outlined"
                  sx={{ width: "70%" }}
                  size="small"
                />
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%", marginLeft: "8px" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Danh mục:
                </Typography>
                <Select
                  value={category}
                  onChange={handleChangeCategory}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  sx={{ minWidth: 300, width: "70%" }}
                >
                  <MenuItem value={""}>
                    <em>Mặc định</em>
                  </MenuItem>
                  {categories ? (
                    categories.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Giá sản phẩm:
                </Typography>
                <Stack direction="row" width="70%" style={{ display: "flex" }}>
                  <TextField
                    id="outlined-basic"
                    label="Giá từ"
                    value={minValue}
                    onChange={handleChangeMinValue}
                    variant="outlined"
                    sx={{ width: "40%" }}
                    size="small"
                  />
                  <Typography
                    sx={{ fontSize: "16px", padding: "7px 10px 0px 10px" }}
                  >
                    Đến:
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Đến"
                    value={maxValue}
                    onChange={handleChangeMaxValue}
                    variant="outlined"
                    sx={{ width: "40%" }}
                    size="small"
                  />
                </Stack>
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Sắp xếp loại:
                </Typography>
                <Select
                  value={sortBy}
                  onChange={handleChangeSortBy}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  sx={{ minWidth: 300, width: "70%" }}
                >
                  {sortByItems ? (
                    sortByItems.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="column" sx={{ width: "45%" }}>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 600,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Sắp xếp theo:
                </Typography>
                <Select
                  value={order}
                  onChange={handleChangeOrder}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  sx={{ minWidth: 300, width: "70%" }}
                >
                  {orderByItems ? (
                    orderByItems.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            style={{
              flexWrap: "wrap",
              justifyContent: "space-between",
              margin: "0px 10px 10px 10px",
            }}
          >
            <Stack width="130px">
              <Button
                variant="contained"
                startIcon={<FilterAltIcon />}
                style={{ padding: "7px 10px" }}
                onClick={handleFilter}
              >
                Bộ lọc
              </Button>
            </Stack>
            <Stack width="130px">
              <Button
                variant="contained"
                endIcon={<RotateLeftIcon />}
                style={{ padding: "7px 10px" }}
                onClick={handleReset}
              >
                Làm mới
              </Button>
            </Stack>
          </Stack>

          <Table
            className="productTable"
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Giá bán</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length >= 1 ? (
                products.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Stack>
                        <Typography>{row.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <Typography sx={{ color: "#1890ff" }}>
                          {row.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" justifyContent="center">
                        <Typography sx={{ margin: "auto 0" }}>
                          {row.price}
                        </Typography>
                        <AttachMoneyIcon sx={{ width: "12px" }} />
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{row.category.name}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{row.quantity}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        {
                          productStatus.find((item) => item.id == row.status)
                            ?.text
                        }
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Stack
                        display="flex"
                        flexDirection={"row"}
                        justifyContent="center"
                        alignItems={"center"}
                      >
                        <Stack p={1}>
                          <Link
                            to={`/admin/product/detail/${row.id}`}
                            height={"0px"}
                          >
                            <EditOutlinedIcon
                              variant="Outlined"
                              sx={{ color: green[600], "& :hover": green[800] }}
                            />
                          </Link>
                        </Stack>
                        <Stack p={1} pb={"13px"}>
                          <DeleteOutlinedIcon
                            variant="Outlined"
                            onClick={() => openModalDelete(row)}
                            sx={{ color: red[500], "& :hover": red[700] }}
                            cursor="pointer"
                          />
                        </Stack>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
          {totalPage >= 1 ? (
            <Stack spacing={2} mt="10px" display={"flex"} alignItems={"center"} m={2} pb={2}>
              <Pagination
                count={totalPage}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Stack>
          ) : (
            <></>
          )}
          <Modal
            sx={{ overflowY: "scroll" }}
            open={modalDelete}
            onClose={closeModalDelete}
          >
            <Stack
              className="modal-info"
              direction="row"
              spacing={2}
              justifyContent="center"
              width="28rem"
            >
              <Stack>
                <InfoOutlinedIcon color="primary" />
              </Stack>

              <Stack spacing={3}>
                <Stack>
                  <Typography fontWeight="bold">
                    {`Bạn có chắc muốn xoá sản phẩm ${itemdelete?.name}?`}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <Button onClick={closeModalDelete} variant="outlined">
                    Hủy
                  </Button>
                  <Button variant="contained" onClick={handleDelete}>
                    Xóa bỏ
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Modal>
        </Box>
      </Box>
    </>
  );
}

export default Product;
