import './ChooseAddress.scss'
import { Modal, Box, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import AddRecieveAddressInputForm from '../AddRecieveAddressInputForm';

ChooseAddress.propsTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    chooseAddressShip: PropTypes.func
}

function ChooseAddress(props) {

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box className='choose-address'>
                <Stack direction='row' className="choose-coupon__heading">
                    <h3>Vui lòng chọn thông tin giao hàng</h3>
                    <CloseIcon onClick={props.handleClose} height="24px" />
                </Stack>
                <Stack spacing={5}>
                    <AddRecieveAddressInputForm handleClose={props.handleClose}/>
                </Stack>

            </Box>
        </Modal>
    )
}


export default ChooseAddress