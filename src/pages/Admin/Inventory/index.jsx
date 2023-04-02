import { Grid } from "@mui/material";
import React, { useState } from "react";
import InventorySearchForm from "../../../forms/InventorySearchForm";
import InventoryTable from "../../../tables/InventoryTable";

export default function Inventory() {
  const [data, setData] = useState([]);
  const handleSetData = React.useCallback((value) => {
    setData(value);
  }, []);

  const [page, setPage] = useState(1);
  const handleSetPage = React.useCallback((event, value) => {
    setPage(value);
  }, []);

  return (
    <>
      <Grid container style={{ padding: "24px", backgroundColor: "#fff" }}>
        <InventorySearchForm handleSetData={handleSetData} page={page}/>
        <InventoryTable data={data} handleSetPage={handleSetPage}/>
      </Grid>
    </>
  );
}
