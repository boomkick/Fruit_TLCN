import React from "react";
import {
  GetProfitIn7Days,
  GetProfitIn7DaysLoading,
} from "../providers/GetProfit7InDaysProvider";
import LoadingAPI from "../components/LoadingAPI";
import SimpleLineChart from "../components/Chart/SimpleLineChart";

const GetProfitIn7DaysConsumer = (props) => {
  const ProfitIn7DaysData = React.useContext(GetProfitIn7Days);
  const ProfitIn7DaysDataLoading = React.useContext(
    GetProfitIn7DaysLoading
  );

  let data = ProfitIn7DaysData.data ? ProfitIn7DaysData.data.reverse().map((item) => ({
    name: dateToYMD(new Date(item.date)),
    profit: item.profit,
    amt: item.profit
  })) : []
  
  return (
    <LoadingAPI loading={ProfitIn7DaysDataLoading}>
      <SimpleLineChart data={data}/>
    </LoadingAPI>
  );
};

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

export default GetProfitIn7DaysConsumer;
