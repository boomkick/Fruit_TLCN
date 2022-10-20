import React from "react";
import "./CardCategory.scss";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

//import img
import img from "../../assets/img/dan_guitar_cc300_6-360x360.jpg";

function CardCategory({ data }) {
  return (
    <Link
      className="card__wrap"
      to={`/`}
      style={{
        width: "270px",
      }}
    >
      <Card className="card" sx={{ boxShadow: "none" }}>
        <div className="card__category">
          <div className="card__category_title">
              <h5 style={{fontWeight:"400",letterSpacing: ".05em",}}>Đàn guitar</h5>
              <p>42 sản phẩm</p>
          </div>
        </div>
        <CardMedia
          component="img"
          width="270px"
          height="270px"
          image={img}
          sx={{borderRadius: "2%" }}
        />
      </Card>
    </Link>
  );
}

export default CardCategory;
