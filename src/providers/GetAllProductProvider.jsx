import React, { useEffect, useState } from "react";
import apiProduct from "../apis/apiProduct";

export const GetAllProduct = React.createContext();
export const GetMaxPageAllProduct = React.createContext();
export const GetAllProductLoading = React.createContext();

const GetAllProductProvider = (props) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getValue = async () => {
      const response = await apiProduct.getProducts(
        props?.page ? props?.page : 1,
        8
      );
      if (response) {
        setValue(response.data);
        setLoading(false);
      }
    };
    setTimeout(() => {
      getValue()
    }, 1000);
  }, [props?.page]);

  return (
    <GetAllProduct.Provider value={value.products}>
      <GetMaxPageAllProduct.Provider value={value.maxPage}>
        <GetAllProductLoading.Provider value={loading}>
          {props.children}
        </GetAllProductLoading.Provider>
      </GetMaxPageAllProduct.Provider>
    </GetAllProduct.Provider>
  );
};

export default GetAllProductProvider;
