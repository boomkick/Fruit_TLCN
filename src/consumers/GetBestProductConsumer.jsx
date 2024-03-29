import React from "react";
import {
  GetBestProduct,
  GetBestProductLoading,
} from "../providers/GetBestProductProvider";
import LoadingAPI from "../components/LoadingAPI";
import { Button, Grid, Typography, styled } from "@mui/material";
import { numWithCommas } from "../constraints/Util";
import { Link } from "react-router-dom";

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

const PromotionTypeEnum = {
  PRCIE: 0,
  PERCENTAGE: 1,
};

const GetBestProductConsumer = () => {
  const BestProductData = React.useContext(GetBestProduct);
  const BestProductDataLoading = React.useContext(GetBestProductLoading);

  const [promotionPrice, setPromotionPrice] = React.useState(null);
  React.useEffect(() => {
    if (BestProductData?.promotion) {
      if (
        Number(BestProductData?.promotion.type) ===
        PromotionTypeEnum.PRCIE.valueOf()
      ) {
        setPromotionPrice(
          Math.round(BestProductData?.price - BestProductData?.promotion.value)
        );
      } else {
        const percent = BestProductData?.promotion.value / 100;
        setPromotionPrice(
          Math.round(BestProductData?.price - BestProductData?.price * percent)
        );
      }
    }
  }, [BestProductData]);

  return (
    <LoadingAPI loading={BestProductDataLoading}>
      <Grid container spacing={2} justifyContent="between" marginTop={"10px"}>
        <Grid
          item
          xs={6}
          sx={{
            "box-shadow":
              "0 1px 15px 6px rgba(0,0,0,.05), 0 0 0 rgba(0,0,0,.10) inset",
          }}
        >
          <img alt="" src={BestProductData.image?.url} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3" gutterBottom>
            {BestProductData.name}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ "margin-bottom": "5px" }}>
            {promotionPrice ? (
              <>
                <span
                  style={{
                    fontSize: "15px",
                    marginRight: "10px",
                    textDecoration: "line-through",
                  }}
                >
                  {numWithCommas(
                    BestProductData.price ? BestProductData.price : 0
                  )}
                  ₫
                </span>
                <span style={{ color: "#FA9210" }}>
                  {numWithCommas(promotionPrice)}₫
                </span>
              </>
            ) : (
              <span style={{ color: "#FA9210" }}>
                {numWithCommas(
                  BestProductData.price ? BestProductData.price : 0
                )}
                ₫
              </span>
            )}
          </Typography>
          <Typography variant="body2" gutterBottom mb={3}>
            {BestProductData.description ? BestProductData.description : ""}
          </Typography>
          <Link to={`/product-detail/${BestProductData?.id}`}>
            <AddToCartButton>CHI TIẾT SẢN PHẨM</AddToCartButton>
          </Link>
        </Grid>
      </Grid>
    </LoadingAPI>
  );
};

export default React.memo(GetBestProductConsumer);
