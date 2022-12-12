import React from "react";
import "./CardProduct.scss";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

//import img
import img from "../../assets/img/product_nho_mau_don_han_quoc.jpg";

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
          //   sx={{ position: "absolute" }}
        />
        <CardContent className="card__content">
          <Typography>{data?.name}</Typography>
          <Typography>{data?.price}₫</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardProduct;
