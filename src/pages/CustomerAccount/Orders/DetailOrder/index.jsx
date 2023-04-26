import React, { useEffect, useState } from 'react'
import "./DetailOrder.scss"
import {
    Box,
    Stack,
    Typography,
    Button
} from "@mui/material"
import { Link, useNavigate, useParams } from "react-router-dom"
import apiCart from '../../../../apis/apiCart'
import { toast } from 'react-toastify'
import { numWithCommas } from '../../../../constraints/Util'
import { paymentMethod } from '../../../../constraints/PaymentMethod'
import apiLocation from '../../../../apis/apiLocation'


function DetailOrder() {
    const id = useParams().id
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [billWithoutDiscount, SetBillWithoutDiscount] = useState(0)
    const [discount, SetDiscount] = useState(0)

    useEffect(() => {
        const getData = async () => {
            await apiCart.getCartHistoryById({id: id})
                .then(res => {
                    setOrder(res.data)
                    if(res.data?.cartDetails){
                        let realBill = 0
                        let sumaryBill = 0
                        res.data?.cartDetails.forEach((item) => {
                            realBill += (item?.product?.price * item?.quantity)
                            sumaryBill += (item?.price * item?.quantity)
                        })
                        SetBillWithoutDiscount(realBill)
                        SetDiscount(realBill-sumaryBill)
                    }
                })
                .catch(error => {
                    setOrder(null)
                    toast.warning("Không tìm thấy đơn hàng")
                })
        }
        getData()
    }, [id])

    // Chuyển trang về sản phẩm để thêm nhận xét
    const handleWriteReview = (event, idProduct) => {
        navigate(`/product-detail/${idProduct}`);
    }

    // Lấy dữ liệu dịa chỉ
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [ward, setWard] = useState("")

    useEffect(() => {
        const getLocation = () => {
            const params = {
                cityId: order?.cityId,
                districtId: order?.districtId,
                wardId: order?.wardId
            }
            apiLocation.getCityById(params)
            .then(res => {
                setCity(res.data);
            })
            apiLocation.getDistrictByCityIdDistrictId(params)
            .then(res => {
                setDistrict(res.data);
            })
            apiLocation.getWardByIdCityIdDistrictIdWardId(params)
            .then(res => {
                setWard(res.data);
            })
        }
        if (order?.cityId && order?.districtId && order?.wardId){
            getLocation()
        }
    }, [order])
    
    return (
        <>
            <Box>
                <Typography mt={2.5} fontSize="19px" fontWeight={300}>Chi tiết đơn hàng #{order?.id} 
                </Typography>
                <Typography fontSize="13px" textAlign="end">Ngày đặt hàng: {order?.createdDate}</Typography>
                <Stack direction="row" mt={1.25} mb={2.5} className="detailOrder" justifyContent="space-between">
                    <Box className="detailOrder__boxInfo">
                        <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
                        <Box p={1.25} className="detailOrder__content">
                            <Typography style={{ color: "#000", fontWeight: 500 }}>{order?.name}</Typography>
                            <Typography>
                                Địa chỉ: {`${order?.detailLocation}, ${city.name},
                                  ${district.name},
                                  ${ward.name}`
                                }
                            </Typography>
                            <Typography>Điện thoại: {order?.phone}</Typography>
                        </Box>
                    </Box>

                    <Box className="detailOrder__boxInfo">
                        <Typography>HÌNH THỨC GIAO HÀNG</Typography>
                        <Box p={1.25} className="detailOrder__content">
                            <Typography>
                                <img width="56px" height="16px" src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-VN.png" alt="" />
                                 Giao hàng nhanh</Typography>
                            <Typography>Phí vận chuyển: {order?.feeShip ? order?.feeShip : 15000 } đ</Typography>
                        </Box>
                    </Box>
                    <Box className="detailOrder__boxInfo">
                        <Typography >HÌNH THỨC THANH TOÁN</Typography>
                        <Box p={1.25} className="detailOrder__content">
                            <Typography>{paymentMethod.find( item => item.id == order?.bill?.paymentMethod)?.text}</Typography>
                        </Box>
                    </Box>
                </Stack>

                <Stack className="detailOrder-Table" >
                    <Stack direction="row" className="detailOrder-Table__heading">
                        <Box>Sản phẩm</Box>
                        <Box>Giá</Box>
                        <Box>Số lượng</Box>
                        <Box>Giảm giá</Box>
                        <Box>Tạm tính</Box>
                    </Stack>
                    {
                        order?.cartDetails?.map(item =>
                            <Stack key={item} direction="row" className="detailOrder-Table__row">
                                <Stack direction="row" className="orderDetail__item">
                                    <Box mr={1.875}>
                                        <img height="60px" width="60px" src={item?.product?.image?.url} alt="" />
                                    </Box>
                                    <Stack spacing={1.5}>
                                        <Link to={item?.product?.id ? `/product-detail/${item?.product?.id}`:''}>
                                            <Typography fontSize="14px" >{item?.product?.name}</Typography>
                                        </Link>
                                        <Typography fontSize="13px">ID product in bill: {item?.id}</Typography>
                                        <Stack direction="row" spacing={1}>
                                            <Button variant="outlined" sx={{ fontSize: "12px", width: "102px", height: "30px", padding: 0 }} onClick={event => {handleWriteReview(event, item?.product?.id)}}>Viết nhận xét</Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Box>{numWithCommas(item.product.price || 0)}₫</Box>
                                <Box>{numWithCommas(item.quantity || 0)}</Box>
                                <Box>{numWithCommas(((item.product.price - item.price) * item.quantity) || 0)} ₫</Box>
                                <Box>{numWithCommas((item.price * item.quantity) || 0)} ₫</Box>
                            </Stack>
                        )
                    }


                </Stack>
                {
                    order && <Stack direction="column"
                        justifyContent="center"
                        alignItems="flex-end"
                        mt={3.5}>

                        <Stack py={0.625} direction="row">
                            <Typography className="detailOrder__summary-label">Tạm tính</Typography>
                            <Typography className="detailOrder__summary-value">{numWithCommas(billWithoutDiscount || 0)} ₫</Typography> 
                        </Stack>
                        <Stack py={0.625} direction="row">
                            <Typography className="detailOrder__summary-label">Giảm giá</Typography>
                            <Typography className="detailOrder__summary-value">{numWithCommas(discount || 0)} ₫</Typography>
                        </Stack>
                        <Stack py={0.625} direction="row">
                            <Typography className="detailOrder__summary-label">Phí vận chuyển</Typography>
                            <Typography className="detailOrder__summary-value">{0} ₫</Typography>
                        </Stack>
                        <Stack py={0.625} direction="row">
                            <Typography className="detailOrder__summary-label">Tổng cộng</Typography>
                            <Typography className="detailOrder__summary-value detailOrder__summary-value--final">
                                {numWithCommas(order?.bill?.total || 0)} ₫</Typography>
                        </Stack>
                    </Stack>
                }
                
            </Box>
        </>
    )
}

export default DetailOrder