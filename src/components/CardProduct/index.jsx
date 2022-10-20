import React from "react";
import "./CardProduct.scss";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

//import img
import img from "../../assets/img/HD-119-TOP-Copy-2-360x360.jpg";

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
          {/* <Typography className="card__price" color={`${data?.discount!==0 ? "#ff0000" : "#000000"}`} variant="h5" component="div">
                    {
                        data?.discount!==0 ?
                        <>{numWithCommas(Math.round(data?.price*(1-0.01*data.discount)))} ₫ <Box className="card__sale">{data?.discount}%</Box>
                        </>
                        :
                        <>{numWithCommas(data?.price)} ₫ </>
                    } 
                    </Typography> */}
          <Typography>Guitar Acoustic Station HD-119</Typography>
          <Typography>1,290,000 đ</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardProduct;
