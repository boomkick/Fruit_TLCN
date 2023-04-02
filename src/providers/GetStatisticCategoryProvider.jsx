import React, { useEffect, useState } from "react";
import apiStatistics from "../apis/apiStatistic";

export const GetStatisticCategory = React.createContext();
export const GetStatisticCategoryLoading = React.createContext();

const GetStatisticCategoryProvider = (props) => {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getValue = async () => {
      let data = await apiStatistics.getByCategory();
      if (data) {
        setValue(data);
        setLoading(false);
      }
    };
    setTimeout(() => {
      getValue();
    }, 1000);
  }, []);

  return (
    <GetStatisticCategory.Provider value={value}>
        <GetStatisticCategoryLoading.Provider value={loading}>
          {props.children}
        </GetStatisticCategoryLoading.Provider>
    </GetStatisticCategory.Provider>
  );
};

export default GetStatisticCategoryProvider;
