import { Grid } from "@mui/material";
import React, { useState } from "react";
import StatisticCartSearchForm from "../../../../forms/StatisticCartSearchForm";
import StatisticCartTable from "../../../../tables/StatisticCartTable";

export default function StatisticCart() {
  const [data, setData] = useState({})
  const handleSetData = React.useCallback((value) => {
    setData(value)
  }, [])
  
  return (
    <>
      <Grid container style={{padding: "24px", backgroundColor: "#fff"}}>
        <StatisticCartSearchForm handleSetData={handleSetData}/>
        <StatisticCartTable data={data}/>
      </Grid>
    </>
  );
}
