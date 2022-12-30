 /* eslint-disable */
import React, { useState } from "react";
import { useEffect } from "react";
import { Link,Routes,Route } from "react-router-dom";
import "./Order.scss";
import {
    Stack,
    Button,
    Typography,
    TextField,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    InputBase,
    Pagination,
} from "@mui/material";
import apiCart from "../../../apis/apiCart";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import DetailOrder from "./DetailOrder";
import { cartStatus } from "../../../constraints/Cart";

const items = [
    { id: 0, label: 'Đang xử lý'},
    { id: 1, label: 'Đã vận chuyển'},
    { id: 2, label: 'Đã hủy'},
    { id: 3, label: 'Tất cả'},
]

function OrderList() {
    const [selected, setSelected] = React.useState(0)
    const [orders, setOrders] = useState([]);
    const [maxPage, setMaxPage] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    
    const size =6;

    useEffect(() => {
        const getData = async () => {
            let param = {
                page: currentPage,
                pageSize: 8,
              };
            if (selected != 3 ) {
                param["CartStatus"]=selected;
            }
            setOrders([])
            apiCart.getAllOrders(param)
                .then(response=>{
                setOrders(response.data.carts);
                setMaxPage(response.data.maxPage);
                })
                .catch(setOrders([]))
        };
        getData();
      }, [currentPage, selected]);

    const handleDate = (stringDate) => {
        let date = stringDate ? stringDate.slice(0, 10) : "Không tồn tại"
        return date ;
    }

    const handleClickTab = (i) => {
        if (i !== selected)
            setSelected(i)
    }
    const [status, setStatus] = useState(0);
    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    const [orderDate, setOrderDate] = useState(0);
    const onChangeOrderDate = (e) => {
        setOrderDate(e.target.value)
    }
    const handleChangeCurrentPage = (event, newValue) => {
        setCurrentPage(newValue);
      };
    return (<>
    
        <Stack p={3} bgcolor="#fff">
            <Typography fontSize="26px">Danh sách đơn hàng</Typography>
            <Stack direction="row" spacing="2rem" p={2} alignItems="center">
                <Typography>Xem hướng dẫn xử lí đơn hàng theo đúng quy trình ở đây:</Typography>
                <a href="https://www.sapo.vn/blog/quy-trinh-xu-ly-don-hang-toi-uu-nhat">
                    <Typography color= "#1890FF" fontSize="14px">Hướng dẫn xử lý đơn hàng</Typography></a>
            </Stack>
            <Stack direction="row" spacing={0.5} p={2}>
                {
                    items?.map((item, i) =>
                        <Stack onClick={() => { handleClickTab(item.id)}} key={item.id || i}
                        alignItems="center" justifyContent="center"
                        className={`orderTab__item ${item.id === selected ? "selected" : ""}`}>
                            <Typography fontWeight="500 !important">{item.label}</Typography>
                        </Stack>)
                }
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Stack width="130px">
                    <Button variant="contained" style={{padding: "7px 10px"}}>Bộ lọc</Button>
                </Stack>
              
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

            <Table
                className="tableCategory"
                sx={{ minWidth: "650px" }}
                stickyHeader
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell sx={{ width: "22%", top: "64px" }}>Mã đơn hàng/Ngày đặt hàng</TableCell>
                        <TableCell sx={{ width: "15%", top: "64px" }}>Trạng thái&nbsp;</TableCell>
                        <TableCell align="center" sx={{ width: "20%", top: "64px" }}>Ngày xác nhận&nbsp;</TableCell>
                        <TableCell align="center" sx={{ width: "18%", top: "64px" }}>Giá trị đơn hàng&nbsp;</TableCell>
                        <TableCell sx={{ width: "15%", top: "64px" }}>Tên người nhận&nbsp;</TableCell>
                        <TableCell sx={{ width: "10%", top: "64px" }}>Thao tác&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell><Checkbox /></TableCell>
                            <TableCell component="th" scope="row">{item.id} / {handleDate(item.createdDate)}</TableCell>
                            <TableCell align="left">{cartStatus.find((e) => e.id == item.status)?.text}</TableCell>
                            <TableCell align="center">{item?.bill?.purchaseDate ? item?.bill?.purchaseDate : "Chưa xác nhận"}</TableCell>
                            <TableCell align="center">{item?.bill?.total}</TableCell>
                            <TableCell align="left">{item?.name}</TableCell>
                            <TableCell align="center">
                                <Stack spacing={1} justifyContent="center" py={1}>
                                    <Link to={`detail/${item.id}`}>
                                        <Button sx={{ width: "100px" }} variant="outlined" >
                                            {selected != 0 ? "Xem chi tiết" : "Xử lí đơn hàng"}
                                        </Button>
                                    </Link>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {maxPage > 1 ? <Stack spacing={2} mt="10px">
                <Pagination count={maxPage} page={currentPage} onChange={handleChangeCurrentPage} color="primary"/>
            </Stack > : <></>}
        </Stack>
        <Routes>
            <Route path='detail' element={<DetailOrder />} />
        </Routes>
    </>
    )
}
const BootstrapInput = styled(InputBase)(({ theme }) => ({

    '& .MuiInputBase-input': {
        boxSizing: "border-box",
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #888',
        fontSize: 14,
        display: 'flex',
        alignItems: "center",
        height: '40px !important',
        padding: '4px 10px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            borderRadius: 4,
            borderColor: '#1890ff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default OrderList