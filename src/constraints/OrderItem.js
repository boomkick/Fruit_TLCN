import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CancelIcon from '@mui/icons-material/Cancel';



export const orderTabs = [
    {
        id: 0,
        type: "Tất cả",
        icon:""
    },
    {
        id: 1,
        type: "Chờ thanh toán",
        icon: HourglassBottomIcon
    },
    {
        id: 2,
        type: "Đang xử lý",
        icon: AutoModeIcon
    },
    {
        id: 3,
        type: "Đang vận chuyển",
        icon: RocketLaunchIcon
    },
    {
        id: 4,
        type: "Đã giao",
        icon: LocalShippingIcon
    },
    {
        id: 5,
        type: "Đã huỷ",
        icon: CancelIcon
    },
]