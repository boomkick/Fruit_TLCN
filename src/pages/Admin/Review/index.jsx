import React, { useState } from "react";
import ReviewSearchForm from "../../../forms/ReviewSearchForm";
import ReviewTable from "../../../tables/ReviewTable";
import { Grid } from "@mui/material";
import "./Review.scss";
export default function Review() {
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
        <ReviewSearchForm handleSetData={handleSetData} page={page} />
        <ReviewTable
          data={data}
          handleSetData={handleSetData}
          handleSetPage={handleSetPage}
        />
      </Grid>
    </>
  );
}
