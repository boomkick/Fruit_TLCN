import React from "react";
import {
  GetBestProduct,
  GetBestProductLoading,
} from "../providers/GetBestProductProvider";
import LoadingAPI from "../components/LoadingAPI";
import { Button, Grid, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiCart from "../apis/apiCart";
import { numWithCommas } from "../constraints/Util";

const AddToCartButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    opacity: 0.8,
  },
});

const GetBestProductConsumer = () => {
  const user = useSelector((state) => state.auth.user);
  const BestProductData = React.useContext(GetBestProduct);
  const BestProductDataLoading = React.useContext(GetBestProductLoading);

  async function handleClickAddItem() {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }
    
    let param = {
      productId: BestProductData?.id,
      quantity: 1,
    };

    await apiCart
      .postCart(param)
      .then((res) => {
        if (res.status !== 200) {
          toast.success(res?.message);
        } else {
          toast.success("Đã thêm sản phẩm thành công");
        }
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  }
  return (
    <LoadingAPI loading={BestProductDataLoading}>
      <Grid container spacing={2} justifyContent="between" marginTop={"10px"}>
        <Grid item xs={6} sx={{"box-shadow": "0 1px 15px 6px rgba(0,0,0,.05), 0 0 0 rgba(0,0,0,.10) inset"}}>
          <img alt="" src={BestProductData.image?.url} />
        </Grid>
        <Grid item xs={6} >
          <Typography variant="h3" gutterBottom>
            {BestProductData.name}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ "margin-bottom": "5px" }}>
            {numWithCommas(BestProductData.price ? BestProductData.price : 0)}₫
          </Typography>
          <Typography variant="body2" gutterBottom mb={3}>
            {BestProductData.description
              ? BestProductData.description
              : ""}
          </Typography>
          <AddToCartButton onClick={handleClickAddItem}>THÊM VÀO GIỎ HÀNG</AddToCartButton>
        </Grid>
      </Grid>
    </LoadingAPI>
  );
};

export default React.memo(GetBestProductConsumer);
