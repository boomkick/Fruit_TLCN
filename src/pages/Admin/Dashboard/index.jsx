import * as React from "react";
import "./Dashboard.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import GroupsIcon from "@mui/icons-material/Groups";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import PaidIcon from "@mui/icons-material/Paid";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {numWithCommas} from "../../../constraints/Util"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Biểu đồ doanh thu",
    },
  },
};
export const data = {
  labels,
  datasets: [
    {
      label: "Khách hàng",
      data: [35, 65, 95, 35, 67, 70, 40],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Doanh thu",
      data: [350, 450, 750, 650, 470, 769, 570],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function Dashboard() {
  return (
    <Box>
      <Stack spacing={3} pl="5rem" mt="2rem">
        <Stack direction="row" spacing={4}>
          {
            items.map(item => {
              let iconColor = item.iconColor
              return (
                <Stack className="dashboard__item" key={item.id} direction="row" >
                  <Stack className="dashboard__icon" bgcolor={item.bgcolor}>
                    <GroupsIcon sx={{ fontSize: 40, color: iconColor }} />
                  </Stack>
                  <Stack alignItems="center" justifyContent="center">
                    <Typography className="dashboard__title">
                      {item.title}
                    </Typography>
                    <Typography color="#2a2a2a" fontWeight={500}>
                      {`${numWithCommas(item.value)} ${item.unit}`}
                    </Typography>
                  </Stack>
                </Stack>
              )
            })
          }
        </Stack>
        <Box width="65%" height="65%">
          <Stack alignItems="center" justifyContent="center">
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>Thống kê doanh thu</Typography>
          </Stack>
          <Bar options={options} data={data} />
        </Box>
      </Stack>
    </Box>
  );
}

const items = [
  {
    id: 1,
    title: "Tổng khách hàng",
    value: "256",
    unit: "Khách hàng",
    icon: GroupsIcon,
    iconColor: "#22ad56",
    bgcolor: "#b9ffd3"
  },
  {
    id: 2,
    title: "Tổng sản phẩm",
    value: "256",
    unit: "Sản phẩm",
    icon: InventoryIcon,
    iconColor: "#1d5aab",
    bgcolor: "#adcbf3"
  },
  {
    id: 1,
    title: "Tổng đơn hàng",
    value: "256",
    unit: "Đơn hàng",
    icon: DescriptionIcon,
    iconColor: "#ff8b07",
    bgcolor: "#fde1c3"
  },
  {
    id: 1,
    title: "Tổng doanh thu",
    value: "256000000",
    unit: "đ",
    icon: PaidIcon,
    iconColor: "#de2222",
    bgcolor: "#f9baba"
  },
]

export default Dashboard;
