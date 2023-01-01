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
     FormControl,
 } from "@mui/material";
 import apiCart from "../../../apis/apiCart";
 import apiLocation from "../../../apis/apiLocation";
 import SearchIcon from "@mui/icons-material/Search";
 import Checkbox from '@mui/material/Checkbox';
 import MenuItem from '@mui/material/MenuItem';
 import Select from '@mui/material/Select';
 import { styled } from '@mui/material/styles';
 import DetailOrder from "./DetailOrder";
 import { cartStatus } from "../../../constraints/Cart";
import MaterialUIPickers from "../../../components/DatePicker";
import BasicDateRangePicker from "../../../components/BasicDateRangePicker";
import { toast } from "react-toastify";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
 
 const items = [
     { id: 0, label: 'Đang xử lý'},
     { id: 1, label: 'Đã vận chuyển'},
     { id: 2, label: 'Đã hủy'},
     { id: 3, label: 'Tất cả'},
 ]

 const keyWordTypeItems = [
    {id: 0, label: 'NONE', name: 'Mặc định'},
    {id: 1, label: 'PHONE', name: 'Số điện thoại'},
    {id: 2, label: 'NAME', name: 'Tên người nhận'},
 ]

 const paymentMethods = [
    {id: 0, label: 'NONE', name: 'Mặc định'},
    {id: 2, label: 'MOMO', name: 'Dịch vụ thanh toán momo'},
    {id: 1, label: 'CASH', name: 'Tiền mặt'},
 ]

 
const sortByItems = [
    {id: 0, label: 'NONE', name: 'Mặc định'},
    {id: 1, label: 'CREATEDDATE ', name: 'Ngày khởi tạo'},
    {id: 2, label: 'TOTAL', name: 'Tổng hóa đơn'},
 ]

const orderByItems = [
    {id: 0, label: 'NONE', name: 'Mặc định'},
    {id: 1, label: 'ASC', name: 'Tăng dần'},
    {id: 2, label: 'DESC', name: 'Giảm dần'},
 ]
 
 function OrderList() {
     const [selected, setSelected] = React.useState(0)
     const [orders, setOrders] = useState([]);
     const [maxPage, setMaxPage] = useState([])
     const [currentPage, setCurrentPage] = useState(1)
     // Khai báo bộ lọc
     // Theo loại keyword
     const [keyWordType, setKeyWordType] = useState(0)
     const handleChangeKeyWordType = (event) => {
        setKeyWordType(event.target.value);
    };
    // Theo nội dung keyword
    const [keyWord, setKeyWord] = useState("")
    const handleChangeKeyWord = (event) => {
        setKeyWord(event.target.value);
    };
    // Theo địa chỉ
    const [listCity, setListCity] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])

    const [selectedCity, setSelectedCity] = useState("")
    const [selectedDistrict, setSelectedDistrict] = useState("")
    const [selectedWard, setSelectedWard] = useState("")
    
    // Gán danh sách dữ liệu của thành phố -> quận -> phường
    useEffect(() => {
      const setDataCity = async () => {
        apiLocation.getListCity()
          .then((res) => {
            setListCity(res.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      };

      setDataCity();
    }, []);

    // Thay đổi city
    const handleChangeCity = (event) =>{
      setSelectedCity(event.target.value);
    }

    useEffect(() => {
      const setDataDistrict = async () => {
        apiLocation.getListDistrictByCityId({cityId: selectedCity})
          .then((res) => {
            setListDistrict(res.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      };

      setDataDistrict();
    }, [selectedCity])

    // Thay đổi quận
    const handleChangeDistrict = (event) =>{
      setSelectedDistrict(event.target.value);
    }

    useEffect(() => {
      const setDataWard = async () => {
        apiLocation.getListWardByCityIdAndDistrictId({cityId: selectedCity, districtId: selectedDistrict})
          .then((res) => {
            setListWard(res.data)
          })
          .catch((error) => {
            toast.error(error)
          })
      };

      setDataWard();
    }, [selectedDistrict])

    // Thay đổi huyện
    const handleChangeWard = (event) =>{
      setSelectedWard(event.target.value);
    }

    // Theo ngày khởi tại
    const [createdDate, setCreatedDate] = useState([null, null])
    const handleChangeCreatedDate = (value) =>{
        setCreatedDate(value);
      }
    
    // Theo tổng hóa đơn
    const [minValue, setMinValue] = useState(null)
    const [maxValue, setMaxValue] = useState(null)
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

    // Theo phương thức thanh toán
    const [paymentMethod, setPaymentMethod] = useState(0)
    const handleChangePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
    };

    // Sắp xếp loại
    const [sortBy, setSortBy] = useState([0])
    const handleChangeSortBy = (event) => {
        setSortBy(event.target.value);
    };
    const [order, setOrder] = useState([0])
    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };

     const size =6;
    
     // Sau khi chỉnh page thì sẽ giữ nguyên giá trị bộ lọc
     useEffect(() => {
        const getData = async () => {
            let param = {
                page: currentPage,
                pageSize: 8,
              };
            if (selected != 3 ) {
                param["CartStatus"]=selected;
            }
            if (keyWordType !== 0 ) {
                param["KeyWordType"]=keyWordType == 1 ? "PHONE" : "NAME";
            }
            if (keyWord && keyWord!=="") {
                param["keyWord"]=keyWord;
            }
            if (selectedCity && selectedCity !== "" ) {
                param["CityId"]=selectedCity;
            }
            if (selectedDistrict && selectedDistrict !== "" ) {
                param["DistrictId"]=selectedDistrict;
            }

            if (selectedWard && selectedWard !== "" ) {
                param["WardId"]=selectedWard;
            }
            if (createdDate[0] && createdDate[0] !== null) {
                param["FromCreatedDate"]=createdDate[0].format('YYYY-MM-DD');
            }
            if (createdDate[1] && createdDate[1] !== null) {
                param["ToCreatedDate"]=createdDate[1].format('YYYY-MM-DD');
            }
            if (minValue ) {
                param["FromTotal"] = minValue
            }
            if (maxValue ) {
                param["ToTotal"] = maxValue
            }
            if (paymentMethod !== 0) {
                // Nếu pttt là 1 trên FE -> CASH, còn 2 thì là MOMO
                // Ở dưới BE 0 -> CASH, 1 -> MOMO
                param["PaymentMethod"] = paymentMethod == 1 ? 0 : 1
            }
            if (sortBy !== 0) {
                param["SortBy"] = sortBy == 1 ? "CREATEDDATE" : "TOTAL"
            }
            if (order !== 0) {
                param["order"] = order == 1 ? "ASC" : "DESC"
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
    }, [currentPage]);

    // Sau khi chuyển trạng thái đơn hàng thì reset bộ lọc, get all orders theo trạng thái mới, chuyển trang hiện tại về 1
    useEffect(() => {
        handleReset()
        setCurrentPage(1)
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
    }, [selected]);
 
     const handleDate = (stringDate) => {
         let date = stringDate ? stringDate.slice(0, 10) : "Không tồn tại"
         return date ;
     }
     
     // Chọn tình trạng đơn hàng
     const handleClickTab = (i) => {
         if (i !== selected)
             setSelected(i)
     }

     const handleChangeCurrentPage = (event, newValue) => {
         setCurrentPage(newValue);
       };
    
    const handleFilter = () => {
        if (parseInt(maxValue) < parseInt(minValue)) {
            toast.error("Nhập giá trị sau lớn hơn")
            return
        }
        const getData = async () => {
            let param = {
                page: currentPage,
                pageSize: 8,
              };
            if (selected != 3 ) {
                param["CartStatus"]=selected;
            }
            if (keyWordType !== 0 ) {
                param["KeyWordType"]=keyWordType == 1 ? "PHONE" : "NAME";
            }
            if (keyWord && keyWord!=="") {
                param["keyWord"]=keyWord;
            }
            if (selectedCity && selectedCity !== "" ) {
                param["CityId"]=selectedCity;
            }
            if (selectedDistrict && selectedDistrict !== "" ) {
                param["DistrictId"]=selectedDistrict;
            }

            if (selectedWard && selectedWard !== "" ) {
                param["WardId"]=selectedWard;
            }
            if (createdDate[0] && createdDate[0] !== null) {
                param["FromCreatedDate"]=createdDate[0].format('YYYY-MM-DD');
            }
            if (createdDate[1] && createdDate[1] !== null) {
                param["ToCreatedDate"]=createdDate[1].format('YYYY-MM-DD');
            }
            if (minValue ) {
                param["FromTotal"] = minValue
            }
            if (maxValue ) {
                param["ToTotal"] = maxValue
            }
            if (paymentMethod !== 0) {
                // Nếu pttt là 1 trên FE -> CASH, còn 2 thì là MOMO
                // Ở dưới BE 0 -> CASH, 1 -> MOMO
                param["PaymentMethod"] = paymentMethod == 1 ? 0 : 1
            }
            if (sortBy !== 0) {
                param["SortBy"] = sortBy == 1 ? "CREATEDDATE" : "TOTAL"
            }
            if (order !== 0) {
                param["order"] = order == 1 ? "ASC" : "DESC"
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
    }

    const handleReset = () => {
        setKeyWordType(0)
        setKeyWord("")
        setSelectedCity("")
        setSelectedDistrict("")
        setSelectedWard("")
        setCreatedDate([null, null])
        setMinValue("")
        setMaxValue("")
        setPaymentMethod(0)
        setSortBy(0)
        setOrder(0)
    }

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
             <Stack direction="row" alignItems="center" spacing={1} style={{flexWrap: "wrap", justifyContent: "space-between"}}>
                <Stack direction="column" sx={{width: "45%", marginLeft:"8px"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Tìm kiếm theo:</Typography>
                        <Select
                            value={keyWordType}
                            onChange={handleChangeKeyWordType}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            cursor="pointer"
                            sx={{ minWidth: 300, width: "70%"}}
                        >
                            {keyWordTypeItems ? keyWordTypeItems.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>) : <></>}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Nội dung tìm kiếm:</Typography>
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
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Tỉnh/Thành phố:</Typography>
                        <Select
                            value={selectedCity}
                            onChange={handleChangeCity}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            cursor="pointer"
                            sx={{ minWidth: 300, width: "70%"}}
                        >
                            {listCity ? listCity.map(item => <MenuItem value={item.level1_id}>{item.name}</MenuItem>) : <></>}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Quận/Huyện:</Typography>
                        <Select
                            value={selectedDistrict}
                            onChange={handleChangeDistrict}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            cursor="pointer"
                            sx={{ minWidth: 300, width: "70%"}}
                        >
                            {listDistrict ? listDistrict.map(item => <MenuItem value={item.level2_id}>{item.name}</MenuItem>) : <></>}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Phường/Xã:</Typography>
                        <Select
                            value={selectedWard}
                            onChange={handleChangeWard}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            cursor="pointer"
                            sx={{ minWidth: 300, width: "70%"}}
                        >
                            {listWard ? listWard.map(item => <MenuItem value={item.level3_id}>{item.name}</MenuItem>) : <></>}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Ngày tạo:</Typography>
                        <BasicDateRangePicker onChangeCreatedDate={handleChangeCreatedDate} value={createdDate}/>
                    </FormControl>
                </Stack>
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Tổng hóa đơn:</Typography>
                        <Stack direction="row" width="70%" style={{display: "flex", }}>
                            <TextField
                            id="outlined-basic"
                            label="Giá từ"
                            value={minValue}
                            onChange={handleChangeMinValue}
                            variant="outlined"
                            sx={{ width: "40%" }}
                            size="small"
                            />
                            <Typography sx={{ fontSize: "16px", padding: "7px 10px 0px 10px" }}>Đến:</Typography>
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
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Thanh toán bằng:</Typography>
                        <Select
                            value={paymentMethod}
                            onChange={handleChangePaymentMethod}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            cursor="pointer"
                            sx={{ minWidth: 300, width: "70%"}}
                        >
                            {paymentMethods ? paymentMethods.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>) : <></>}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Sắp xếp loại:</Typography>
                        <Select
                            value={sortBy}
                            onChange={handleChangeSortBy}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            cursor="pointer"
                            sx={{ minWidth: 300, width: "70%"}}
                        >
                            {sortByItems ? sortByItems.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>) : <></>}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="column" sx={{width: "45%"}}>
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 600, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Sắp xếp theo:</Typography>
                        <Select
                            value={order}
                            onChange={handleChangeOrder}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            cursor="pointer"
                            sx={{ minWidth: 300, width: "70%"}}
                        >
                            {orderByItems ? orderByItems.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>) : <></>}
                        </Select>
                    </FormControl>
                </Stack>
             </Stack>
             <Stack direction="row" alignItems="center" spacing={1} style={{flexWrap: "wrap", justifyContent: "space-between"}}>
                <Stack width="130px">
                     <Button variant="contained" startIcon={<FilterAltIcon/>} style={{padding: "7px 10px"}} onClick={handleFilter}>Bộ lọc</Button>
                 </Stack>
                 <Stack width="130px">
                     <Button variant="contained" endIcon={<RotateLeftIcon/>} style={{padding: "7px 10px"}} onClick={handleReset}>Làm mới</Button>
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
             {/* {maxPage > 1 ? <Stack spacing={2} mt="10px"> */}
            <Pagination count={maxPage} page={currentPage} onChange={handleChangeCurrentPage} color="primary"/>
             {/* </Stack > : <></>} */}
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