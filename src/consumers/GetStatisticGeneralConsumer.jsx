import React from "react";
import {
  GetStatisticGeneral,
  GetStatisticGeneralLoading,
} from "../providers/GetStatisticGeneralProvider";
import LoadingAPI from "../components/LoadingAPI";
import GroupsIcon from "@mui/icons-material/Groups";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import PaidIcon from "@mui/icons-material/Paid";
import Card from "../components/Card";

const GetStatisticGeneralConsumer = (props) => {
  const StatisticGeneralData = React.useContext(GetStatisticGeneral);
  const StatisticGeneralDataLoading = React.useContext(
    GetStatisticGeneralLoading
  );

  let items = [
    {
      id: 1,
      title: "Tổng khách hàng",
      value: StatisticGeneralData["users"] || 0,
      unit: "Khách hàng",
      icon: GroupsIcon,
      iconColor: "#5F5ABF",
      bgcolor: "#A7A5ED",
    },
    {
      id: 2,
      title: "Tổng sản phẩm",
      value: StatisticGeneralData["products"] || 0,
      unit: "Sản phẩm",
      icon: InventoryIcon,
      iconColor: "#1d5aab",
      bgcolor: "#adcbf3",
    },
    {
      id: 3,
      title: "Tổng đơn hàng",
      value: StatisticGeneralData["orders"] || 0,
      unit: "Đơn hàng",
      icon: DescriptionIcon,
      iconColor: "#ff8b07",
      bgcolor: "#fde1c3",
    },
    {
      id: 4,
      title: "Tổng doanh thu",
      value: StatisticGeneralData["profit"] || 0,
      unit: "đ",
      icon: PaidIcon,
      iconColor: "#de2222",
      bgcolor: "#f9baba",
    },
  ];
  return (
    <LoadingAPI loading={StatisticGeneralDataLoading}>
      {items.map((item) => (
        <Card item={item} />
      ))}
    </LoadingAPI>
  );
};

export default GetStatisticGeneralConsumer;
