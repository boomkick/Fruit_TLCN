import React from "react";
import "./CardProduct.scss";
import { Card, CardContent, CardMedia, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { numWithCommas } from "../../constraints/Util";
function CardProduct({ data }) {
  return (
    <Link
      className="card__wrap"
      to={`/product-detail/${data?.id}`}
      style={{
        width: "270px",
      }}
    >
      <Card className="card" sx={{boxShadow:"none",}}>
        {data?.salePrice ? (
          <div className="card__discount">
          <div className="card__discount_badge">
            <div
              style={{
                width:"36px",
                height:"30px",
                background: "#F4BA36",
                padding:"2px",
                display:"flex",
                alignItems:"center",
              }}
            >
                <span>-29%</span>
            </div>
          </div>
        </div>
        ) : <></>}
        
        <CardMedia
          component="img"
          width="270px"
          image={data?.image?.url}
          style={{height: "270px"}}
        />
        <CardContent className="card__content">
          <Box style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <p className="card__content-name">{data?.name}</p>
            <p className="card__content-category">{data?.category?.name ? data?.category?.name : "Danh mục"}</p>
          </Box>
          <p className="card__content-price" align="left">{numWithCommas(data?.price)}₫</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardProduct;
