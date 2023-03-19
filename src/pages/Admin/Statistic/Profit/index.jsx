import { Grid } from "@mui/material";
import React, { useState } from "react";
import StatisticProfitSearchForm from "../../../../forms/StatisticProfitSearchForm";
import StatisticProfitTable from "../../../../tables/StatisticProfitTable";

export default function StatisticProfit() {
    const [data, setData] = useState(0)
  const handleSetData = React.useCallback((value) => {
    setData(value)
  }, [])
  
  return (
    <>
      <Grid container style={{padding: "24px", backgroundColor: "#fff"}}>
        <StatisticProfitSearchForm handleSetData={handleSetData}/>
        <StatisticProfitTable data={data}/>
      </Grid>
    </>
  );
}