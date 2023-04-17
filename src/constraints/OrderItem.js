import AutoModeIcon from '@mui/icons-material/AutoMode';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CancelIcon from '@mui/icons-material/Cancel';



export const orderTabs = [
    {
        id: 0,
        type: "Đang xử lý",
        icon: AutoModeIcon
    },
    {
        id: 1,
        type: "Đã giao hàng",
        icon: RocketLaunchIcon
    },
    {
        id: 2,
        type: "Đã huỷ",
        icon: CancelIcon
    },
    {
        id: 3,
        type: "Tất cả",
        icon:""
    },
]