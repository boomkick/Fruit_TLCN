import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import AppleIcon from '@mui/icons-material/Apple';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AddchartIcon from '@mui/icons-material/Addchart';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

export const sidebar = [
    {
        id: 1,
        text: 'Trang chủ',
        icon: LeaderboardOutlinedIcon,
        link: '/admin'
    },
    {
        id: 2,
        text: 'Đơn hàng',
        icon: ShoppingCartOutlinedIcon,
        link: '/admin/order'
    },
    {
        id: 3,
        text: 'Sản phẩm',
        icon: AppleIcon,
        link: '/admin/product'
    },
    {
        id: 4,
        text: 'Danh mục sản phẩm',
        icon: CategoryOutlinedIcon,
        link: '/admin/category'
    },
    {
        id: 5,
        text: 'Cập nhật quyền',
        icon: GroupOutlinedIcon,
        link: '/admin/user'
    },
    {
        id: 6,
        text: 'Quản lý đánh giá',
        icon: RateReviewOutlinedIcon,
        link: '/admin/review'
    },
    {
        id: 7,
        text: 'Thanh toán',
        icon: CalculateOutlinedIcon,
        link: '/admin/payment'
    },
    {
        id: 8,
        text: 'Kho và hàng tồn',
        icon: WarehouseOutlinedIcon,
        link: '/admin/inventory'
    },
    {
        id: 9,
        text: 'Thống kê',
        icon: TroubleshootIcon,
        link: null,
        childs: [
            {
                id: 10,
                text: 'Đơn hàng',
                icon: SignalCellularAltIcon,
                link: '/admin/statistic/cart'
            },
            {
                id: 11,
                text: 'Lợi nhuận',
                icon: BubbleChartIcon,
                link: '/admin/statistic/profit'
            },
            {
                id: 12,
                text: 'Sản phẩm',
                icon: AddchartIcon,
                link: '/admin/statistic/product'
            },
            {
                id: 13,
                text: 'Thanh toán',
                icon: DonutSmallIcon,
                link: '/admin/statistic/bill'
            },
        ]
    },
    

]