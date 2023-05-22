import { Box, Button, Dialog, Stack } from "@mui/material";
import PropTypes from "prop-types";
import CartItem from "../CartItem";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React, { useState } from "react";
import { removeGiftCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import apiGiftCart from "../../apis/apiGiftCart";

GiftCart.propTypes = {
  dataCart: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  changeData: PropTypes.func.isRequired,
};

export default function GiftCart(props) {
  console.log("data của giftCart", props.data);
  // Xử lí button xóa sản phẩm
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickRemove = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveGiftCart = () => {
    dispatch(removeGiftCart(props.data));
    apiGiftCart.deleteGiftCart(props.data.id);
    props.changeData({
      ...props.dataCart,
      giftCartList: props.dataCart?.giftCartList.filter(
        (item) => item.id != props.data.id
      ),
    });
    setOpen(false);
  };

  return (
    <Box>
      <Box className="cart__heading cart">
        <Stack direction="row">
          {`${props.data.name} (${props.data?.cartDetails?.length} sản phẩm)`}
        </Stack>
        <Stack>Đơn giá</Stack>
        <Stack>Gía giảm</Stack>
        <Stack>Đơn vị</Stack>
        <Stack>Giá trị tối thiểu</Stack>
        <Stack>Số lượng</Stack>
        <Stack>Tạm tính</Stack>
        <Stack>
          <span onClick={handleClickRemove}>
            <DeleteOutlinedIcon />
          </span>
        </Stack>
      </Box>
      <Stack className="cart__list">
        {props.data?.cartDetails?.length > 0 ? (
          props.data?.cartDetails?.map((item) => (
            <CartItem key={item.id} data={item}  dataCart={props.dataCart} changeData={props.changeData}/>
          ))
        ) : (
          <></>
        )}
      </Stack>
      <Dialog onClose={handleClose} open={open}>
        <Box className="dialog-removecart">
          <Box className="dialog-removecart__title">
            <h4>Xoá sản phẩm</h4>
          </Box>
          <Box className="dialog-removecart__content">
            Bạn có muốn xóa sản phẩm đang chọn?
          </Box>
          <Box className="dialog-removecart__choose">
            <Button
              variant="outlined"
              onClick={handleRemoveGiftCart}
              sx={{ width: "auto", height: "36px" }}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ width: "57px", height: "36px" }}
            >
              Huỷ
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
