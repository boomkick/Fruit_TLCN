import React, { useEffect, useState } from 'react'
import "./DetailOrder.scss"
import {
    Box,
    Stack,
    Typography,
    Button
} from "@mui/material"
import { Link, useParams } from "react-router-dom"
import apiCart from '../../../../apis/apiCart'
import { toast } from 'react-toastify'
import { numWithCommas } from '../../../../constraints/Util'

function DetailOrder() {
    const id = useParams().id
    const [order, setOrder] = useState(null)
    useEffect(() => {
        const getData = () => {
            let params = {
                id
            }
            apiCart.getOrders(params)
                .then(res => {
                    setOrder(res[0])
                })
                .catch(error => {
                    setOrder(null)
                    toast.warning("Không tìm thấy đơn hàng")
                })
        }
        getData()
    }, [id])

    
    return (
        <>
            <Box>
                <Typography mt={2.5} fontSize="19px" fontWeight={300}>Chi tiết đơn hàng #{order?.id} - <span style={{ fontWeight: 500 }}>Huỷ</span></Typography>
                <Typography fontSize="13px" textAlign="end">Ngày đặt hàng: {order?.createdAt}</Typography>
                <Stack direction="row" mt={1.25} mb={2.5} className="detailOrder" justifyContent="space-between">
                    <Box className="detailOrder__boxInfo">
                        <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
                        <Box p={1.25} className="detailOrder__content">
                            <Typography style={{ color: "#000", fontWeight: 500 }}>{order?.address?.fullName}</Typography>
                            <Typography>
                                Địa chỉ: {order?.address?`${order?.address?.addressDetail}, ${order?.address?.commune?.name},
                                  ${order?.address?.district?.name},
                                  ${order?.address?.province?.name}`:'Trống'
                                }
                            </Typography>
                            <Typography>Điện thoại: {order?.address?.phoneNumber}</Typography>
                        </Box>
                    </Box>

                    <Box className="detailOrder__boxInfo">
                        <Typography>HÌNH THỨC GIAO HÀNG</Typography>
                        <Box p={1.25} className="detailOrder__content">
                            <Typography>
                                <img width="56px" height="16px" src="https://salt.tikicdn.com/ts/upload/2a/47/46/0e038f5927f3af308b4500e5b243bcf6.png" alt="" />
                                {order?.shipping?.display}</Typography>
                            <Typography>Phí vận chuyển: {order?.feeShip}đ</Typography>
                        </Box>
                    </Box>
                    <Box className="detailOrder__boxInfo">
                        <Typography >HÌNH THỨC THANH TOÁN</Typography>
                        <Box p={1.25} className="detailOrder__content">
                            <Typography>{order?.payment?.display}</Typography>
                            <Typography style={{ color: "#fda223" }}>{order?.statusPayment && `Thanh toán ${order?.statusPayment || ""}`}</Typography>
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
                        order?.products?.map(item =>
                            <Stack key={item} direction="row" className="detailOrder-Table__row">
                                <Stack direction="row" className="orderDetail__item">
                                    <Box mr={1.875}>
                                        <img height="60px" width="60px" src={item.image} alt="" />
                                    </Box>
                                    <Stack spacing={1.5}>
                                        <Link to={item.slug?`/product/${item.slug}`:''}>
                                            <Typography fontSize="14px" >{item.name}</Typography>
                                        </Link>
                                        <Typography fontSize="13px">Sku: 4816587252819</Typography>
                                        <Stack direction="row" spacing={1}>
                                            <Button variant="outlined" sx={{ fontSize: "12px", width: "102px", height: "30px", padding: 0 }}>Viết nhận xét</Button>
                                            <Button variant="outlined" sx={{ fontSize: "12px", width: "71px", height: "30px", padding: 0 }}>Mua lại</Button>

                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Box>{numWithCommas(item.price || 0)}₫</Box>
                                <Box>{numWithCommas(item.quantity || 0)}</Box>
                                <Box>{numWithCommas(item.discount || 0)} ₫</Box>
                                <Box>{numWithCommas(item.price * item.quantity - item.discount || 0)} ₫</Box>
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
                            <Typography className="detailOrder__summary-value">{numWithCommas(order?.totalPrice || 0)} ₫</Typography>
                        </Stack>
                        <Stack py={0.625} direction="row">
                            <Typography className="detailOrder__summary-label">Giảm giá</Typography>
                            <Typography className="detailOrder__summary-value">{numWithCommas(order?.discount || 0)} ₫</Typography>
                        </Stack>
                        <Stack py={0.625} direction="row">
                            <Typography className="detailOrder__summary-label">Phí vận chuyển</Typography>
                            <Typography className="detailOrder__summary-value">{numWithCommas(order?.feeShip || 0)} ₫</Typography>
                        </Stack>
                        <Stack py={0.625} direction="row">
                            <Typography className="detailOrder__summary-label">Tổng cộng</Typography>
                            <Typography className="detailOrder__summary-value detailOrder__summary-value--final">
                                {numWithCommas(order.totalPrice + order.feeShip - order.discount || 0)} ₫</Typography>
                        </Stack>
                    </Stack>
                }
                
            </Box>
        </>
    )
}

export default DetailOrder