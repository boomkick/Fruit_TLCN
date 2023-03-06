import React from 'react';
import {
    GetAllProduct,
    GetMaxPageAllProduct,
    GetAllProductLoading
} from "../providers/GetAllProductProvider"
import LoadingAPI from '../components/LoadingAPI';
import CardProduct from "../components/CardProduct";
import { Box } from "@mui/material";
import { Pagination} from "@mui/material";

const GetAllProductConsumer = (props) => {
    const AllProductData = React.useContext(GetAllProduct)
    const MaxPageAllProduct = React.useContext(GetMaxPageAllProduct)
    const AllProductDataLoading = React.useContext(GetAllProductLoading)
    const onChangePage = React.useCallback((event, value) => {
      console.log("event: ", value)
      props?.handleChangePage(value)
    }, [])
    return (
        <LoadingAPI loading={AllProductDataLoading}>
          <div className="products-consumer">
              {AllProductData ? AllProductData.map((item) => (
                <CardProduct data={item} />
              )) : null}
            </div>
            <Box className="products-pagination">
              <Pagination
                count={MaxPageAllProduct}
                onChange={onChangePage}
                page={props?.currentPage}
                shape="rounded"
                sx={{ alignItems: "center" }}
              />
            </Box>
        </LoadingAPI>
    )
}

export default GetAllProductConsumer;