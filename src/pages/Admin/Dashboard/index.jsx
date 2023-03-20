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
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { numWithCommas } from "../../../constraints/Util";
import { Grid } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// Data test Pie Chart
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

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

export default function Dashboard() {
  return (
    <Grid container rowSpacing={2} columnSpacing={2} p={6}>
      {/* Thống kê số liệu tổng quan */}
      <Grid
        container
        sx={{ display: "flex", justifyContent: "space-between" }}
        m={2}
        mb={5}
      >
        {items.map((item) => {
          let iconColor = item.iconColor;
          return (
            <Stack className="dashboard__item" key={item.id} direction="row">
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
          );
        })}
      </Grid>

      {/* Thống kê số liệu biểu đồ */}
      <Grid container columnSpacing={2}>
        <Grid
          item
          xs={8}
          backgroundColor={"#fff"}
          p={2}
          borderRadius={"0.375rem"}
        >
          <Stack alignItems="start" justifyContent="center">
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Thống kê doanh thu
            </Typography>
          </Stack>
          <Bar options={options} data={data} />
        </Grid>
        <Grid item
          xs={4 }
          backgroundColor={"#fff"}
          p={2}
          borderRadius={"0.375rem"}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data01}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      {/* Thống kê số liệu biểu đồ */}
      <Grid container columnSpacing={2}>
        <Grid
          item
          xs={8}
          backgroundColor={"#fff"}
          p={2}
          borderRadius={"0.375rem"}
        >
          <Stack alignItems="start" justifyContent="center">
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Thống kê doanh thu
            </Typography>
          </Stack>
          <Bar options={options} data={data} />
        </Grid>
        <Grid item
          xs={4 }
          backgroundColor={"#fff"}
          p={2}
          borderRadius={"0.375rem"}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data01}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Grid>
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
    bgcolor: "#b9ffd3",
  },
  {
    id: 2,
    title: "Tổng sản phẩm",
    value: "256",
    unit: "Sản phẩm",
    icon: InventoryIcon,
    iconColor: "#1d5aab",
    bgcolor: "#adcbf3",
  },
  {
    id: 1,
    title: "Tổng đơn hàng",
    value: "256",
    unit: "Đơn hàng",
    icon: DescriptionIcon,
    iconColor: "#ff8b07",
    bgcolor: "#fde1c3",
  },
  {
    id: 1,
    title: "Tổng doanh thu",
    value: "256000000",
    unit: "đ",
    icon: PaidIcon,
    iconColor: "#de2222",
    bgcolor: "#f9baba",
  },
];
