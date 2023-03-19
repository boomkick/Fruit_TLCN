import React, { useState } from "react";
import { Container } from "react-bootstrap";
import StatisticProfitSearchForm from "../../../../forms/StatisticProfitSearchForm";
import StatisticProfitTable from "../../../../tables/StatisticProfitTable";

export default function StatisticProfit() {
    const [data, setData] = useState(0)
  const handleSetData = React.useCallback((value) => {
    setData(value)
  }, [])
  
  return (
    <>
      <Container class="bg-white" style={{padding: "24px", backgroundColor: "#fff"}}>
        <StatisticProfitSearchForm handleSetData={handleSetData}/>
        <StatisticProfitTable data={data}/>
      </Container>
    </>
  );
}