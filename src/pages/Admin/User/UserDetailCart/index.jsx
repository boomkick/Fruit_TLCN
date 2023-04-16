import { Grid } from "@mui/material";
import React, { useState } from "react";
import UserDetailCartSearchForm from "../../../../forms/UserDetailCartSearchForm";
import UserDetailCartTable from "../../../../tables/UserDetailCartTable";

export default function UserDetailCart() {
  const [data, setData] = useState({})
  const handleSetData = React.useCallback((value) => {
    setData(value)
  }, [])

  const [page, setPage] = useState(1);
  const handleSetPage = React.useCallback((event, value) => {
    setPage(value);
  }, []);
  
  return (
    <>
      <Grid container style={{padding: "24px", backgroundColor: "#fff"}}>
        <UserDetailCartSearchForm handleSetData={handleSetData} page={page} />
        <UserDetailCartTable data={data} handleSetPage={handleSetPage}/>
      </Grid>
    </>
  );
}
