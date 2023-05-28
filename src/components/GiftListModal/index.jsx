import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import AddToPhotosIconOutslined from "@mui/icons-material/AddToPhotosOutlined";
import CloseIcon from "@mui/icons-material/Close";
import apiGiftCart from "../../apis/apiGiftCart";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import apiCart from "../../apis/apiCart";

GiftListModal.propTypes = {
  closeModalGiftCart: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default function GiftListModal(props) {
  const [openCreateBox, setOpenCreateBox] = React.useState(false);
  const [nameGiftCart, setNameGiftCart] = React.useState("");
  const [giftCartList, setGiftCartList] = React.useState([]);
  const { id } = useParams();

  const handlegetListGiftCart = async () => {
    await apiGiftCart
      .getGiftCartByProductId(id)
      .then((res) => {
        if (res.status == 200) {
          setGiftCartList(
            res.data.map((item) => {
              return { ...item, isChecked: item?.cartDetailId ? true : false };
            })
          );
        }
      })
      .catch();
  };

  React.useEffect(() => {
    handlegetListGiftCart();
  }, [id]);

  const handleChangeCheck = React.useCallback(async (event, item) => {
    if (item.cartDetailId) {
      await apiCart
        .deleteCart(item.cartDetailId)
        .then((res) => {
          if (res.status == 200) {
            toast.success(`Đã xóa sản phẩm khỏi ${item.name}`);
          } else {
            toast.error(`Xóa sản phẩm khỏi ${item.name} không thành công`);
          }
        })
        .catch();
      handlegetListGiftCart();
    } else {
      let params = {
        productId: id,
        quantity: props.quantity,
        giftCartId: item.id,
      };
      await apiCart
        .postCart(params)
        .then((res) => {
          if (res.status == 200) {
            toast.success(`Đã thêm sản phẩm vào ${item.name}`);
          } else {
            toast.error(`Thêm sản phẩm vào ${item.name} không thành công`);
          }
        })
        .catch();
      handlegetListGiftCart();
    }
  }, []);

  const handleCreateGiftCart = async () => {
    let params = {
      name: nameGiftCart,
    };
    await apiGiftCart
      .postCurrentGiftCart(params)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Đã tạo ${nameGiftCart}`);
          let params = {
            productId: id,
            quantity: props.quantity,
            giftCartId: res.data.id,
          };
          apiCart
            .postCart(params)
            .then((resCreate) => {
              if (resCreate.status == 200) {
                toast.success(`Đã thêm sản phẩm vào ${res.data.name}`);
              } else {
                toast.error(
                  `Thêm sản phẩm vào ${res.data.name} không thành công`
                );
              }
            })
            .catch();
          setNameGiftCart("");
          props.closeModalGiftCart();
        } else {
          toast.error("Tạo không thành công");
        }
      })
      .catch((error) => {});
  };
  return (
    <>
      <Stack direction="column">
        <Stack direction="row">
          <Typography>Lưu vào...</Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxHeight: "350px",
            overflowY: "scroll",
          }}
        >
          {giftCartList.length > 0
            ? giftCartList.map((item, index) => (
                <FormControlLabel
                  label={item?.name}
                  control={
                    <Checkbox
                      checked={item?.isChecked || item?.cartDetailId}
                      onChange={(event) => handleChangeCheck(event, item)}
                      style={{ paddingRight: "10px" }}
                    />
                  }
                />
              ))
            : null}
        </Stack>

        {openCreateBox ? (
          <>
            <TextField
              value={nameGiftCart}
              onChange={(event) => {
                setNameGiftCart(event.target.value);
              }}
              id="standard-basic"
              label="Tên gói quà"
              variant="standard"
            />
            <Stack
              display="flex"
              alignItems="flex-end"
              sx={{ marginTop: "10px" }}
            >
              <Button
                size="small"
                sx={{ fontSize: "16px", width: "50%" }}
                onClick={handleCreateGiftCart}
              >
                Tạo
              </Button>
            </Stack>
          </>
        ) : (
          <Button
            startIcon={<AddToPhotosIconOutslined />}
            variant="outlined"
            color="success"
            onClick={() => setOpenCreateBox(true)}
            sx={{ marginTop: "10px" }}
          >
            Tạo gói quà
          </Button>
        )}
        <span style={{ position: "absolute", top: 2, right: 2 }}>
          <IconButton onClick={props.closeModalGiftCart}>
            <CloseIcon fontSize="10px" />
          </IconButton>
        </span>
      </Stack>
    </>
  );
}
