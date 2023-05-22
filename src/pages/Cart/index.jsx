import { useCallback, useEffect, useState } from "react";
import "./ShoppingCart.scss";
import { Grid, Typography, Button, Stack, Box, Dialog } from "@mui/material";
import CartItem from "../../components/CartItem";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { groupByGiftCart, numWithCommas } from "../../constraints/Util";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../slices/cartSlice";
import { deleteAll } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiCart from "../../apis/apiCart";
import apiGiftCart from "../../apis/apiGiftCart";
import GiftCart from "../../components/GiftCart";

const PromotionTypeEnum = {
  PRCIE: 0,
  PERCENTAGE: 1,
};

function ShoppingCart() {
  const user = useSelector((state) => state.auth.user);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [data, setData] = useState([]);

  // get cart by user
  useEffect(() => {
    const handleGetData = async () => {
      let cartDetailList = [];
      let giftCartList = [];
      await apiCart
        .getCart()
        .then((res) => {
          dispatch(updateCart(res?.data));
          cartDetailList = res?.data;
        })
        .catch((error) => {
          toast.error(error.toString());
        });

      await apiGiftCart
        .getCurrentGiftCart()
        .then((res) => {
          giftCartList = res?.data;
        })
        .catch((error) => {
          toast.error(error.toString());
        });

      setData(groupByGiftCart(giftCartList, cartDetailList));
    };
    handleGetData();
  }, []);

  const handleChangeData = (data) => {
    setData(data);
  };

  // Caculate sum money
  useEffect(() => {
    const calcPrice = () => {
      let total = 0;
      cart?.forEach((item) => {
        let promotionPrice = null;
        if (item.product?.promotion) {
          if (
            Number(item.product?.promotion.type) ===
            PromotionTypeEnum.PRCIE.valueOf()
          ) {
            promotionPrice =
              item.product?.price - item.product?.promotion.value;
          } else {
            const percent = item.product?.promotion.value / 100;
            promotionPrice =
              item.product?.price - item.product?.price * percent;
          }
        }
        total +=
          item.quantity *
          (promotionPrice ? promotionPrice : item.product?.price);
      });
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

  const navigate = useNavigate();
  const handleBuy = () => {
    if (cart?.length > 0) {
      cart.forEach((item) => {
        let param = {
          id: item.id,
          quantity: item.quantity,
        };
        apiCart.putCart(param);
      });
      navigate("/payment");
    } else {
      toast.info("Hiện bạn chưa có sản phẩm nào trong giỏ cả");
    }
  };

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
                  {`Sản phẩm (${data?.noGiftList?.length} sản phẩm)`}
                </Stack>
                <Stack>Đơn giá</Stack>
                <Stack>Gía giảm</Stack>
                <Stack>Đơn vị</Stack>
                <Stack>Giá trị tối thiểu</Stack>
                <Stack>Số lượng</Stack>
                <Stack>Tạm tính</Stack>
                <Stack>
                  <span onClick={openDialogDeleteAll}>
                    <DeleteOutlinedIcon />
                  </span>
                </Stack>
              </Box>
              <Stack className="cart__list">
                {data?.noGiftList?.map((item) => (
                  <CartItem key={item.id} data={item} dataCart={data} changeData={handleChangeData}/>
                ))}
              </Stack>
            </Box>
            {data?.giftCartList?.map((item) => (
              <GiftCart
                data={item}
                dataCart={data}
                changeData={handleChangeData}
              />
            ))}
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Box>
              <Box className="cart-summary">
                <Typography>TỔNG CỘNG GIỎ HÀNG</Typography>
                <Box className="cart-summary__divider"></Box>
                <Box className="cart-summary__price">
                  <span>Tạm tính</span>
                  <span>{numWithCommas(totalPrice || 0)} ₫</span>
                </Box>
                <Box className="cart-summary__divider"></Box>
                <Box className="cart-summary__price">
                  <span>Tổng tiền</span>
                  <Box className="cart-summary__valueprice">
                    <span>{numWithCommas(totalPrice || 0)} ₫</span>
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
