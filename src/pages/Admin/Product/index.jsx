import React from 'react'
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
    Modal
} from '@mui/material';
import "./Product.scss"
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import apiProduct from '../../../apis/apiProduct';

function Product() {
    const [modalDelete, setModalDelete] = React.useState(false);
    const [category, setCategory] = React.useState(1);
    const [price, setPrice] = React.useState(1);
    const [quantity, setQuantity] = React.useState(1);
    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);

    const openModalDelete = () => setModalDelete(true);
    const closeModalDelete = () => setModalDelete(false);

    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }
    const handleChangePrice = (event) => {
        setPrice(event.target.value)
    }
    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value)
    }

    React.useEffect(() => {
        const getData = async () => {
            apiProduct.getProducts(page)
                .then(response=>{
                setProducts(response.data.products);
                setTotalPage(response.data.maxPage);     
                })
                .catch(setProducts([]))
        };
        getData();
      }, [page]);

    const handleChangePage = (event, newValue) => {
        setPage(newValue);
      };
    return (
        <>
            <Box className="productAdmin">
                <Stack direction="row" mb={1} justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#FFF", height: "80px" }} px={2}>
                    <Typography >Quản lý sản phẩm</Typography>
                    <Link to='/admin/product/create'>
                        <Button variant="outlined" pr={2}>Tạo sản phẩm</Button>
                    </Link>
                </Stack>
                

                <Box sx={{ backgroundColor: "#fff" }} p={2}>
                    <Stack direction="column" sx={{}}>
                        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Danh mục sản phẩm:</Typography>
                            <Select
                                value={category}
                                onChange={handleChangeCategory}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                cursor="pointer"
                                sx={{ minWidth: 400}}
                            >
                                <MenuItem value={""}>
                                    Loại sản phẩm
                                </MenuItem>
                                <MenuItem value={1}>Trái cây ta</MenuItem>
                                <MenuItem value={2}>Trái cây nhập khẩu</MenuItem>
                                <MenuItem value={3}>Giỏ Quà Lễ Hội</MenuItem>
                                <MenuItem value={4}>Giỏ Quà Sinh Nhật</MenuItem>
                                <MenuItem value={5} disabled>Giỏ Trái Cây + Hoa Tươi</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Sắp xếp giá bán:</Typography>
                            <Select
                                value={price}
                                onChange={handleChangePrice}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                cursor="pointer"
                                sx={{ minWidth: 400}}
                            >
                                <MenuItem value={""}>
                                    Giá bán
                                </MenuItem>
                                <MenuItem value={1}>Thấp lên cao</MenuItem>
                                <MenuItem value={2}>Cao xuống thấp</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2} pb={2}>
                        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, width: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Sắp xếp số lượng:</Typography>
                            <Select
                                value={quantity}
                                onChange={handleChangeQuantity}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                cursor="pointer"
                                sx={{ minWidth: 400}}
                            >
                                <MenuItem value={""}>
                                    Số lượng
                                </MenuItem>
                                <MenuItem value={1}>Thấp lên cao</MenuItem>
                                <MenuItem value={2}>Cao xuống thấp</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack direction="row" sx={{ width: "500px", position: "relative" }}>
                            <TextField
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                sx={{ width: "100%" }}
                                size="small"
                            />
                            <span className="order__iconSearch">
                                <SearchIcon sx={{ fontSize: "28px" }} />
                            </span>
                        </Stack>
                    </Stack>
                    <Table className="productTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                            {products.length >= 1 ? products.map(row => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Stack>
                                            <Typography>{row.id}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack>
                                            <Typography sx={{ color: "#1890ff" }}>{row.name}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" justifyContent="center">
                                            <Typography sx={{ margin: "auto 0" }}>{row.price}</Typography>
                                            <EditIcon sx={{ width: "12px" }} />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography>{row.category.name}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography>{row.quantity}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography>{row.status}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Stack spacing={1} justifyContent="center" py={1}>
                                            <Button variant="contained">Sửa</Button>
                                            <Button onClick={openModalDelete} variant="outlined" color="error">
                                                Xóa
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )) : <></>}
                        </TableBody>
                    </Table>
                    {totalPage >= 1 ? <Stack spacing={2} mt="10px">
                        <Pagination count={totalPage} page={page} onChange={handleChangePage} color="primary"/>
                    </Stack > : <></>}
                    <Modal
                        sx={{ overflowY: "scroll" }}
                        open={modalDelete}
                        onClose={closeModalDelete}
                    >
                        <Stack className="modal-info" direction="row" spacing={2} justifyContent='center' width='26rem' >
                            <Stack>
                                <InfoOutlinedIcon color="primary" />
                            </Stack>

                            <Stack spacing={3}>
                                <Stack>
                                    <Typography fontWeight="bold">
                                        Bạn có chắc muốn xoá sản phẩm?
                                    </Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                    <Button onClick={closeModalDelete} variant="outlined">Hủy</Button>
                                    <Button variant="contained">Xóa bỏ</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Modal>
                </Box>
            </Box>


        </>
    )
}

export default Product