import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { numWithCommas } from "../../constraints/Util";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PromotionTypeEnum = {
  PRCIE: 0,
  PERCENTAGE: 1,
};

PaymentItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function PaymentItem(props) {
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    if (props.data.product) {
      if (props.data.product?.promotion) {
        if (
          Number(props.data.product?.promotion.type) ===
          PromotionTypeEnum.PRCIE.valueOf()
        ) {
          setProductPrice(
            props.data.product?.price - props.data.product?.promotion.value
          );
        } else {
          const percent = props.data.product?.promotion.value / 100;
          setProductPrice(
            props.data.product?.price - props.data.product?.price * percent
          );
        }
      } else {
        setProductPrice(props.data?.product?.price);
      }
    }
  }, [props.data.product]);

  return (
    <Stack
      key={props.data?.id}
      direction="row"
      className="orderDetail__item"
      p={1}
    >
      <Box mr={1.875}>
        <img
          height="60px"
          width="60px"
          src={props.data?.product?.image?.url}
          alt=""
        />
      </Box>
      <Stack
        spacing={1.5}
        width="100%"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Link to={"/"}>
          <Typography sx={{ fontSize: "14px" }}>
            {props.data?.product?.name} x {props.data?.quantity}
          </Typography>
        </Link>
        <Typography fontSize="14px" color="#888">
          {numWithCommas(props.data?.quantity * productPrice || 0)} đ
        </Typography>
      </Stack>
    </Stack>
  );
}
