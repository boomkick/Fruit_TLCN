import React, { useState } from "react";
import { Container } from "react-bootstrap";
import StatisticCartSearchForm from "../../../../forms/StatisticCartSearchForm";
import StatisticCartTable from "../../../../tables/StatisticCartTable";

export default function StatisticCart() {
  const [data, setData] = useState({})
  const handleSetData = React.useCallback((value) => {
    setData(value)
  }, [])
  
  return (
    <>
      <Container class="bg-white" style={{padding: "24px", backgroundColor: "#fff"}}>
        <StatisticCartSearchForm handleSetData={handleSetData}/>
        <StatisticCartTable data={data}/>
      </Container>
    </>
  );
}
