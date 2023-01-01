import { useEffect, useState } from 'react'
import './ChooseAddress.scss'
import { Button, Modal, Box, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../slices/paymentSlice';

function ChooseAddress(props) {
    const [addresses, setAddresses] = useState([]);
    const dispatch = useDispatch()
    const paymentAddress = useSelector((state) => state.payment.address)
    
    useEffect(() => {
        const getAddresses = () => {
            let data  = []
            data.push(paymentAddress)
            setAddresses(data)
        }
        getAddresses()
    }, [])

    const chooseAddressShip = (address)=>{
        props.handleClose()
        dispatch(setAddress(address))
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box className='choose-address'>
                <Stack direction='row' className="choose-coupon__heading">
                    <h3>Chọn địa chỉ</h3>
                    <CloseIcon onClick={props.handleClose} height="24px" />
                </Stack>
                <Stack spacing={5}>
                    {/* Chỉ hiện thông tin địa chỉ giao hàng START */}
                    {
                    addresses.map((item) => {
                        return (
                            <Stack
                                direction="row"
                                width="100%"
                                className="items"
                                key={item.name}
                            >
                                <Stack className="info">
                                    <Typography className="name">Người nhận: {item.name}</Typography>
                                    <Typography className="address">Địa chỉ: {`${item.addressDetail}, ${item.city}, ${item.district}, ${item.ward}`}</Typography>
                                    <Typography className="number">Điện thoại: {item.phone}</Typography>
                                </Stack>

                                <Stack direction="row" className="action">
                                    <Button className="Modify" variant="text">
                                        Chỉnh sửa
                                    </Button>
                                    <Button onClick={()=>chooseAddressShip(item)} className="Delete" variant="text">
                                        Chọn
                                    </Button>
                                </Stack>
                            </Stack>
                        );
                    })
                    }
                    {/* END */}
                </Stack>

            </Box>
        </Modal>
    )
}

ChooseAddress.propsTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    chooseAddressShip: PropTypes.func
}
export default ChooseAddress