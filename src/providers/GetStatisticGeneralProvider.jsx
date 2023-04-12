import React, { useEffect, useState } from "react";
import apiStatistics from "../apis/apiStatistic";

export const GetStatisticGeneral = React.createContext();
export const GetStatisticGeneralLoading = React.createContext();

const GetStatisticGeneralProvider = (props) => {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getValue = async () => {
    let [products, users, orders, profit] = await Promise.all([
        apiStatistics.getCountAllProduct(),
        apiStatistics.getCountAllUser(),
        apiStatistics.getCart(),
        apiStatistics.getProfit(),
    ]);
      if (products && users && orders && profit) {
        setValue({
            "products": products.data,
            "users": users.data,
            "orders": orders.data["CANCELLED"] + orders.data["DELIVERIED"] + orders.data["PENDING"],
            "profit": profit.data.profit,
        });
        setLoading(false);
      }
    };
    setTimeout(() => {
      getValue()
    }, 1000);
  }, []);

  return (
    <GetStatisticGeneral.Provider value={value}>
        <GetStatisticGeneralLoading.Provider value={loading}>
          {props.children}
        </GetStatisticGeneralLoading.Provider>
    </GetStatisticGeneral.Provider>
  );
};

export default GetStatisticGeneralProvider;
