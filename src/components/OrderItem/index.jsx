import { Box, Typography, Stack, Button } from "@mui/material";
import React from "react";
import "./OrderItem.scss";
import { orderTabs } from "../../constraints/OrderItem";
import { numWithCommas, roundPrice } from "../../constraints/Util";
import { Link } from "react-router-dom";

function OrderItem(props) {
  const { order } = props;
  const state = getState(order);

  return (
    <Box className="orderItem__container">
      <Stack
        direction="row"
        className="orderItem__heading"
        style={{ backgroundColor: "black" }}
      >
        {state?.icon && (
          <Stack sx={{ padding: "2px 0px 0px 2px" }} flexDirection={"row"}>
            <state.icon />{" "}
            <Typography sx={{ paddingLeft: "5px" }}>{state.type}</Typography>
          </Stack>
        )}

        <Typography component="span" variant="h3" fontWeight={500} color="#FFF">
          {state?.display}
        </Typography>
      </Stack>
      <Box className="orderItem">
        {order?.cartDetails.slice(0, 2).map((item) => (
          <Stack
            key={item?.id}
            className="orderItem__product"
            direction="row"
            justifyContent="space-between"
          >
            <Stack
              className="orderItem__img"
              direction="row"
              justifyContent="space-between"
            >
              <img alt="" src={item?.product?.image?.url} />
              <span className="orderItem__quantity">x{item?.quantity}</span>
            </Stack>
            <Stack flex={1} mx="12px">
              <Link
                to={
                  item?.product?.id
                    ? `/product-detail/${item?.product?.id}`
                    : ""
                }
              >
                <Typography className="text-overflow-2-lines" fontSize="13px">
                  {item?.product?.name}
                </Typography>
              </Link>
            </Stack>
            <Stack>
              <Typography className="orderItem__price">
                {numWithCommas(item?.price)} ₫
              </Typography>
            </Stack>
          </Stack>
        ))}
        <Box>
          <Box className="orderItem__total">
            <Typography
              component="span"
              fontSize="13px"
              fontWeight="400"
              color="#888"
            >
              Phí Ship:
            </Typography>
            <Typography
              component="span"
              fontSize="13px"
              fontWeight="500"
              color="#333"
            >
              {numWithCommas(roundPrice(order?.shippingFee || 0))} ₫
            </Typography>
          </Box>

          <Box className="orderItem__total">
            <Typography
              component="span"
              fontSize="17px"
              fontWeight="400"
              color="#888"
            >
              Tổng tiền:
            </Typography>
            <Typography
              component="span"
              fontSize="17px"
              fontWeight="500"
              color="#333"
            >
              {numWithCommas(
                roundPrice(order?.bill?.total + order?.shippingFee || 0)
              )}{" "}
              ₫
            </Typography>
          </Box>

          <Box className="orderItem__groupbtn">
            <Link to={`/my-account/orders/detail/${order?.id}`}>
              <Button variant="outlined" >Xem chi tiết</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const getState = (state) => orderTabs.find((item) => item.id === state.status);

export default OrderItem;
