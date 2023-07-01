import React, { useState } from "react";
import EmployeeSearchForm from "../../../forms/EmployeeSearchForm";
import EmployeeTable from "../../../tables/EmployeeTable";
import { Grid } from "@mui/material";
export default function Employee() {
  const [data, setData] = useState({});
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
        <EmployeeSearchForm handleSetData={handleSetData} page={page} />
        <EmployeeTable
          data={data}
          handleSetPage={handleSetPage}
        />
      </Grid>
    </>
  )
}