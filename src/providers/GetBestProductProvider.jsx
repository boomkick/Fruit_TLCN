import React, { useEffect, useState } from 'react';
import apiProduct from "../apis/apiProduct";

export const GetBestProduct = React.createContext();
export const GetBestProductLoading = React.createContext();

const GetBestProductProvider = (props) => {
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      // Get sản phẩm được mua nhiều nhất
      const getValue = async () => {
        const response = await apiProduct.getBestProduct();
        if (response) {
          setValue(response.data);
          setLoading(false)
        }
      };
      getValue();
    }, []);

  return (
    <GetBestProduct.Provider value={value}>
        <GetBestProductLoading.Provider value={loading}>
            {props.children}
        </GetBestProductLoading.Provider>
    </GetBestProduct.Provider>
  );
};


export default GetBestProductProvider;