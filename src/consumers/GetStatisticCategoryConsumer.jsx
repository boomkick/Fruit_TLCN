import React from "react";
import {
  GetStatisticCategory,
  GetStatisticCategoryLoading,
} from "../providers/GetStatisticCategoryProvider";
import LoadingAPI from "../components/LoadingAPI";
import CustomActiveShapePieChart from "../components/Chart/CustomActiveShapePieChart";

const GetStatisticCategoryConsumer = (props) => {
  const StatisticCategoryData = React.useContext(GetStatisticCategory);
  const StatisticCategoryDataLoading = React.useContext(
    GetStatisticCategoryLoading
  );

  let data = StatisticCategoryData.data ? StatisticCategoryData.data.map((item) => ({
    name: item.name,
    value: item.profit,
  })) : []
  
  return (
    <LoadingAPI loading={StatisticCategoryDataLoading}>
      <CustomActiveShapePieChart data={data}/>
    </LoadingAPI>
  );
};

export default GetStatisticCategoryConsumer;
