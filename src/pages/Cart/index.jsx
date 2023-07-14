import { useEffect, useState } from "react";
import "./ShoppingCart.scss";
import {
  Grid,
  Typography,
  Button,
  Stack,
  Box,
  Dialog,
  Modal,
} from "@mui/material";
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { red } from "@mui/material/colors";

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
  const [giftCartList, setGiftCartList] = useState([]);
  const [modalError, setModalError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  // get cart by user
  useEffect(() => {
    const handleGetData = async () => {
      await apiCart
        .getCart()
        .then((res) => {
          dispatch(updateCart(res?.data));
        })
        .catch((error) => {
          toast.error(error.toString());
        });

      await apiGiftCart
        .getCurrentGiftCart()
        .then((res) => {
          setGiftCartList(res?.data);
        })
        .catch((error) => {
          toast.error(error.toString());
        });
    };
    handleGetData();
  }, []);

  const handleChangeGiftCartList = (dataGiftCarts) => {
    setGiftCartList(dataGiftCarts);
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
  const handleBuy = async () => {
    if (cart?.length > 0) {
      let isEnoughQuantity = true;
      await cart.forEach((item) => {
        let param = {
          id: item.id,
          quantity: item.quantity,
        };
        apiCart.putCart(param).then((res) => {
          if (res?.status !== 200) {
            isEnoughQuantity = false;
            // toast.error(res?.message);
          }
        });
      });
      setTimeout(() => {
        if (handleValidateQuantity() && isEnoughQuantity) {
          navigate("/payment");
        }
      }, 500);
    } else {
      toast.info("Hiện bạn chưa có sản phẩm nào trong giỏ cả");
    }
  };

  const handleValidateQuantity = async () => {
    await apiCart.getValidateQuantity().then((res) => {
      if (res?.status != 200) {
        setErrorContent(res?.data.map((item) => <Typography>{item}</Typography>));
        setModalError(true);
        return false;
      }
    });
    return true;
  };

  // modal error
  const closeModalError = () => setModalError(false);

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
                  {`Sản phẩm (${
                    groupByGiftCart(giftCartList, cart)?.noGiftList?.length
                  } sản phẩm)`}
                </Stack>
                <Stack>Đơn giá</Stack>
                <Stack>Giá giảm</Stack>
                <Stack>Đơn vị</Stack>
                <Stack>Giá trị tối thiểu</Stack>
                <Stack>Số lượng</Stack>
                <Stack>Tạm tính</Stack>
                <Stack>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={openDialogDeleteAll}
                  >
                    <DeleteOutlinedIcon />
                  </span>
                </Stack>
              </Box>
              <Stack className="cart__list">
                {groupByGiftCart(giftCartList, cart)?.noGiftList?.map(
                  (item) => (
                    <CartItem key={item.id} data={item} />
                  )
                )}
              </Stack>
            </Box>
            {groupByGiftCart(giftCartList, cart)?.giftCartList?.map((item) => (
              <GiftCart
                data={item}
                dataGiftCartList={giftCartList}
                changeGiftCartList={handleChangeGiftCartList}
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
                    <span>(Đã bao gồm phụ phí nếu có)</span>
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
              <h4>Xoá giỏ hàng</h4>
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
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalError}
        onClose={closeModalError}
      >
        <Stack
          className="modal-info"
          direction="row"
          spacing={2}
          justifyContent="center"
          width="20rem"
        >
          {/* <Stack>
                <InfoOutlinedIcon sx={{ color: red[500] }}  />
              </Stack> */}

          <Stack spacing={3}>
            <Stack>
              <Typography fontWeight="bold">
                {`Số lượng hàng không đủ`}
              </Typography>
              {errorContent}
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button
                onClick={closeModalError}
                variant="contained"
                color="error"
              >
                Đồng ý
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}

export default ShoppingCart;
