import React, { useEffect, useState } from 'react';
import apiProduct from "../apis/apiProduct";

export const GetNewProducts = React.createContext();
export const GetNewProductsLoading = React.createContext();

const GetNewProductsProvider = (props) => {
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      // Get 8 sản phẩm mới nhất
      const getValue = async () => {
        let param = {
          page: 1,
          pageSize: 8,
          orderBy: "ID",
          isDeleted: false
        };
        const response = await apiProduct.getProductsByCategory(param);
        if (response) {
          setValue(response.data.products);
          setLoading(false)
        }
      };
      getValue();
    }, []);

  return (
    <GetNewProducts.Provider value={value}>
        <GetNewProductsLoading.Provider value={loading}>
            {props.children}
        </GetNewProductsLoading.Provider>
    </GetNewProducts.Provider>
  );
};


export default GetNewProductsProvider;