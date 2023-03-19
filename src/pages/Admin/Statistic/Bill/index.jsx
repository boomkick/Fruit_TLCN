import React, { useState } from "react";
import StatisticBillSearchForm from "../../../../forms/StatisticBillSearchForm";
import StatisticBillTable from "../../../../tables/StatisticBillTable";
import {
  Grid,
} from "@mui/material";
export default function StatisticBill() {
    const [data, setData] = useState([])
  const handleSetData = React.useCallback((value) => {
    setData(value)
  }, [])
  
  return (
    <>
      <Grid container style={{padding: "24px", backgroundColor: "#fff"}}>
        <StatisticBillSearchForm handleSetData={handleSetData}/>
        <StatisticBillTable data={data}/>
      </Grid>
    </>
  );
}