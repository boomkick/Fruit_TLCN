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
      to={`/`}
      style={{
        width: "270px",
      }}
    >
      <Card className="card" sx={{boxShadow:"none",}}>
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
        <CardMedia
          component="img"
          width="270px"
          height="270px"
          image={img}
          //   sx={{ position: "absolute" }}
        />
        <CardContent className="card__content">
          <Typography>Nho Mẫu Đơn Đỏ Hàn Quốc</Typography>
          <Typography>1,500,000₫</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardProduct;
