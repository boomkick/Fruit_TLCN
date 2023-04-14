import React, { useState } from "react";
import UserSearchForm from "../../../forms/UserSearchForm";
import UserTable from "../../../tables/UserTable";
import { Grid } from "@mui/material";
export default function User() {
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
        <UserSearchForm handleSetData={handleSetData} page={page} />
        <UserTable
          data={data}
          handleSetPage={handleSetPage}
          handleSetData={handleSetData}
        />
      </Grid>
    </>
  );
}