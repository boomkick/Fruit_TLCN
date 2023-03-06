import React, { useEffect, useState } from 'react';
import apiProduct from "../apis/apiProduct";

export const GetTop8Product = React.createContext();
export const GetTop8ProductLoading = React.createContext();

const GetTop8ProductProvider = (props) => {
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      // Get 8 sản phẩm được mua nhiều nhất
      const getValue = async () => {
        const response = await apiProduct.getTop8Product();
        if (response) {
          setValue(response.data);
          setLoading(false)
        }
      };
      getValue();
    }, []);

  return (
    <GetTop8Product.Provider value={value}>
        <GetTop8ProductLoading.Provider value={loading}>
            {props.children}
        </GetTop8ProductLoading.Provider>
    </GetTop8Product.Provider>
  );
};


export default GetTop8ProductProvider;