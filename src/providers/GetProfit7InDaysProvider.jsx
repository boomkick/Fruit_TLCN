import React, { useEffect, useState } from "react";
import apiStatistics from "../apis/apiStatistic";

export const GetProfitIn7Days = React.createContext();
export const GetProfitIn7DaysLoading = React.createContext();

const GetProfitIn7DaysProvider = (props) => {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getValue = async () => {
    let profits = await 
        apiStatistics.getProfitIn7Days()
        ;
      if (profits) {
        setValue(profits);
        setLoading(false);
      }
    };
    setTimeout(() => {
      getValue()
    }, 1000);
  }, []);

  return (
    <GetProfitIn7Days.Provider value={value}>
        <GetProfitIn7DaysLoading.Provider value={loading}>
          {props.children}
        </GetProfitIn7DaysLoading.Provider>
    </GetProfitIn7Days.Provider>
  );
};

export default GetProfitIn7DaysProvider;
