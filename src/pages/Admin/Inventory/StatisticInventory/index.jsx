import React, { useState } from "react";
import StatisticInventorySearchForm from "../../../../forms/StatisticInventorySearchForm";
import StatisticInventoryTable from "../../../../tables/StatisticInventoryTable";
import {
  Grid,
} from "@mui/material";
export default function StatisticInventory() {
    const [data, setData] = useState([])
  const handleSetData = React.useCallback((value) => {
    setData(value)
  }, [])
  
  return (
    <>
      <Grid container style={{padding: "24px", backgroundColor: "#fff"}}>
        <StatisticInventorySearchForm handleSetData={handleSetData}/>
        <StatisticInventoryTable data={data}/>
      </Grid>
    </>
  );
}