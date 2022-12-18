import { useCallback, useEffect, useState } from "react";
import "./ShoppingCart.scss";
import {
  Grid,
  Typography,
  Checkbox,
  Button,
  Stack,
  Box,
  Dialog,
} from "@mui/material";
import CartItem from "../../components/CartItem";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import { cart } from "../../constraints/Cart"
import InfoIcon from "@mui/icons-material/Info";
import DiscountIcon from "@mui/icons-material/Discount";
import { numWithCommas } from "../../constraints/Util";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../slices/cartSlice";

import { deleteAll } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCoupon } from "../../slices/paymentSlice";
import apiCart from "../../apis/apiCart";

function ShoppingCart() {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkAll, setCheckAll] = useState(false);
  const [couponValue, setCouponValue] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.payment.coupon);
  const addressShip = useSelector((state) => state.payment.address);

  // get cart by user
  useEffect(() => {
    // title web
    const loadTitle = () => {
      document.title = "Giỏ hàng";
    };
    loadTitle();

    apiCart.getCart()
      .then((res) => {
        dispatch(updateCart(res?.data));
      })
      .catch((error) => {
        toast.error(error.toString());
      })
  }, [])

  // Caculate sum money
  useEffect(() => {
    const calcPrice = () => {
      const total = cart.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      );
      setTotalPrice(total);
    };
    calcPrice();
  }, [cart]);

  const handleDeleteAll = () => {
    dispatch(deleteAll());
    closeDialogDeleteAll();
  };
  const openDialogDeleteAll = () => {
    setDialogDelete(true);
  };
  const closeDialogDeleteAll = () => {
    setDialogDelete(false);
  };
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleOpenAddress = useCallback(() => {
    if (user) {
      setOpenAddress(true);
    } else {
      toast.warning("Vui lòng đăng nhập để chọn địa chỉ");
    }
  }, [user]);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);

  const navigate = useNavigate();
  const handleBuy = () => {
    console.log(cart)
    cart.forEach((item) => {
      let param = {
        productId: item.product.id,
        quantity: item.quantity
      }
      apiCart.putCart(param)
  })
    navigate("/payment");
  };


  console.log("ci",cart)
  return (
    <>
      <Box className="container">
        <Typography
          className="cart__title"
          gutterBottom
          variant="h5"
          component="div"
        >
          GIỎ HÀNG
        </Typography>
        <Grid container spacing={2} style={{ marginTop: "24px" }}>
          <Grid item lg={9} md={12} sm={12} xs={12}>
            <Box>
              <Box className="cart__heading cart">
                <Stack direction="row">
                  {`Sản phẩm (${cart.length} sản phẩm)`}
                </Stack>
                <Stack>Đơn giá</Stack>
                <Stack>Số lượng</Stack>
                <Stack>Tạm tính</Stack>
                <Stack>
                  <span onClick={openDialogDeleteAll}>
                    <DeleteOutlinedIcon />
                  </span>
                </Stack>
              </Box>
              <Stack className="cart__list">
                {cart.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </Stack>
            </Box>
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Box>
              <Box className="cart-summary">
                <Typography>TỔNG CỘNG GIỎ HÀNG</Typography>
                <Box className="cart-summary__divider"></Box>
                <Box className="cart-summary__price">
                  <span>Tạm tính</span>
                  <span>{numWithCommas(totalPrice)} ₫</span>
                </Box>
                <Box className="cart-summary__divider"></Box>
                <Box className="cart-summary__price">
                  <span>Tổng tiền</span>
                  <Box className="cart-summary__valueprice">
                    <span>{numWithCommas(totalPrice)} ₫</span>
                    <span>(Đã bao gồm VAT nếu có)</span>
                  </Box>
                </Box>
              </Box>
              <button
                onClick={handleBuy}
                style={{
                  width: "100%",
                  height: "42px",
                  fontWeight: 600,
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "1em",
                  lineHeight: "38px",
                  padding: "0 18px",
                  marginBottom: "15px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                Tiến hành đặt hàng
              </button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {dialogDelete && (
        <Dialog onClose={closeDialogDeleteAll} open={dialogDelete}>
          <Box className="dialog-removecart">
            <Box className="dialog-removecart__title">
              <h4>Xoá sản phẩm</h4>
            </Box>
            <Box className="dialog-removecart__content">
              Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng
            </Box>
            <Box className="dialog-removecart__choose">
              <Button
                variant="outlined"
                onClick={handleDeleteAll}
                sx={{ width: "94px", height: "36px" }}
              >
                Xác nhận
              </Button>
              <Button
                variant="contained"
                onClick={closeDialogDeleteAll}
                sx={{ width: "57px", height: "36px" }}
              >
                Huỷ
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
}

export default ShoppingCart;