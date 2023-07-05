import React, { useEffect, useState } from "react";
import "./CardProduct.scss";
import { Card, CardContent, CardMedia, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { numWithCommas } from "../../constraints/Util";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const PromotionTypeEnum = {
  PRCIE: 0,
  PERCENTAGE: 1,
};

function CardProduct({ data }) {
  const [percentDiscount, setPercentDiscount] = useState(null);
  const [promotionPrice, setPromotionPrice] = useState(null);
  useEffect(() => {
    if (data?.promotion) {
      if (Number(data?.promotion.type) === PromotionTypeEnum.PRCIE.valueOf()) {
        setPercentDiscount(
          Math.round((data?.promotion.value / data?.price) * 100)
        );
        setPromotionPrice(Math.round(data?.price - data?.promotion.value));
      } else {
        const percent = data?.promotion.value / 100;
        setPercentDiscount(Math.round(data?.promotion.value));
        setPromotionPrice(Math.round(data?.price - data?.price * percent));
      }
    }
  }, [data]);
  return (
    <Link
      className="card__wrap"
      to={`/product-detail/${data?.id}`}
      style={{
        width: "270px",
      }}
    >
      <Card className="card" sx={{ boxShadow: "none" }}>
        {percentDiscount ? (
          <div className="card__discount">
            <div className="card__discount_badge">
              <div
                style={{
                  width: "36px",
                  height: "30px",
                  background: "#FF0000",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>-{percentDiscount}%</span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <CardMedia
          component="img"
          width="270px"
          image={data?.image?.url}
          style={{ height: "270px" }}
        />
        <CardContent className="card__content">
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p className="card__content-name">{data?.name}</p>
            <p className="card__content-category">
              {data?.category?.name ? data?.category?.name : "Danh mục"}
            </p>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
              <p className="card__content-price" align="left">
                {numWithCommas(promotionPrice ? promotionPrice : data?.price)}₫
              </p>
              {percentDiscount ? (
                <p
                  style={{
                    textDecoration: "line-through",
                    opacity: "0.7",
                    paddingLeft: "5px",
                  }}
                >
                  {numWithCommas(data?.price)}₫
                </p>
              ) : (
                <></>
              )}
            </Box>
            <Box display={"flex"}>
            <p className="card__content-product-quantity">
                {`${data?.quantity} sản phẩm`}
              </p>
              {
                data?.quantity <= 10 ? <ProductionQuantityLimitsIcon sx={{ color: "red", marginLeft: "5px", fontSize: "14px"}}/> : null
              }
              </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardProduct;
