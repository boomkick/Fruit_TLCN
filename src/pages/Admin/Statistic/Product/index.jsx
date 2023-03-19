import { Grid } from "@mui/material";
import React, { useState } from "react";
import StatisticProductSearchForm from "../../../../forms/StatisticProductSearchForm";
import StatisticProductTable from "../../../../tables/StatisticProductTable";

export default function StatisticProduct() {
    const [data, setData] = useState([])
  const handleSetData = React.useCallback((value) => {
    setData(value)
  }, [])
  
  return (
    <>
      <Grid container style={{padding: "24px", backgroundColor: "#fff"}}>
        <StatisticProductSearchForm handleSetData={handleSetData}/>
        <StatisticProductTable data={data}/>
      </Grid>
    </>
  );
}