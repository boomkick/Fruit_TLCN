import React from "react";
import "./DetailProduct.scss";
import { Box, Modal, Rating } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BookIcon from "@mui/icons-material/Book";
import FacebookIcon from "@mui/icons-material/Facebook";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AppleIcon from "@mui/icons-material/Apple";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
//import img
import apiCart from "../../apis/apiCart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { productUnit, productStatus } from "../../constraints/Product";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { numWithCommas } from "../../constraints/Util";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HelpIcon from "@mui/icons-material/Help";
import GiftListModal from "../GiftListModal";

const PromotionTypeEnum = {
  PRCIE: 0,
  PERCENTAGE: 1,
};

function DetailProduct({ data }) {
  const user = useSelector((state) => state.auth.user);

  // Cart
  const [openGiftCartList, setOpenGiftCartList] = React.useState(false);
  const handleOpenGiftCartList = () => setOpenGiftCartList(true);
  const handleCloseGiftCartList = () => setOpenGiftCartList(false);

  const [productImage, setProductImage] = useState("");
  const status = productStatus.find((item) => item.id == data?.status);
  const [quantity, setQuantity] = useState(1);
  const [promotionPrice, setPromotionPrice] = useState(null);
  const [ratingStars, setRatingStars] = useState(5);
  const { id } = useParams();

  useEffect(() => {
    setProductImage("");
  }, [id]);

  useEffect(() => {
    setRatingStars(data?.rating?.toFixed(2));
    if (data?.promotion) {
      if (Number(data?.promotion.type) === PromotionTypeEnum.PRCIE.valueOf()) {
        setPromotionPrice(Math.round(data?.price - data?.promotion.value));
      } else {
        const percent = data?.promotion.value / 100;
        setPromotionPrice(Math.round(data?.price - data?.price * percent));
      }
    }
  }, [data]);

  async function handleClickAddItem() {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }
    if (quantity < 1) {
      toast.error("Vui lòng chọn số lượng sản phẩm lớn hơn 0");
      return;
    }

    let param = {
      productId: data?.id,
      quantity: quantity,
    };

    await apiCart
      .postCart(param)
      .then((res) => {
        if (res.status !== 200) {
          toast.success(res?.message);
        } else {
          toast.success("Đã thêm sản phẩm thành công");
        }
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  }

  function handleStatusProduct(status) {
    if (status?.id == 0) {
      return (
        <>
          <AddShoppingCartIcon style={{ color: "#49A94D" }} />
        </>
      );
    } else if (status?.id == 1) {
      return (
        <>
          <ProductionQuantityLimitsIcon
            style={{ color: "E40100", marginRight: "5px" }}
          />
          <p
            style={{
              fontSize: "15px",
              color: "#E40100",
              textTransform: "uppercase",
            }}
          >{`Sản phẩm tạm thời ${status?.text}`}</p>
        </>
      );
    } else {
      return (
        <>
          <RemoveShoppingCartIcon style={{ color: "E40100" }} />
          <p>{status?.text}</p>
        </>
      );
    }
  }

  // Xử lí chọn hiển thị khi chọn hình ảnh
  const handleChangeImage = (event) => {
    setProductImage(event.target.src);
  };

  return (
    <Box className="detailProduct">
      <Box className="detailProduct__img">
        <div className="detailProduct__primary-img">
          <img alt="" src={productImage || data?.productImages[0]?.url}></img>
        </div>
        <div className="detailProduct__list-img">
          {data?.productImages.length > 0 ? (
            data?.productImages.map((item) => (
              <img
                className="detailProduct__item-img"
                alt=""
                src={item?.url}
                onClick={handleChangeImage}
              ></img>
            ))
          ) : (
            <></>
          )}
        </div>
      </Box>
      <Box className="detailProduct__general">
        <div className="detailProduct__info">
          <h3>{data?.name}</h3>
          <div className="detailProduct__info-underline-title"></div>
          {data?.promotion ? (
            <div className="detailProduct__info-price">
              <h4 className="detailProduct__info-price-original">
                {data?.price ? numWithCommas(data?.price) : 0}đ
              </h4>
              <h4 className="detailProduct__info-price-sale">
                {numWithCommas(promotionPrice || 0)}đ
              </h4>
            </div>
          ) : (
            <div className="detailProduct__info-price">
              <h4 className="detailProduct__info-price-sale">
                {data?.price ? numWithCommas(data?.price) : 0}đ
              </h4>
            </div>
          )}
          <div className="detailProduct__info-rate">
            <Rating
              name="half-rating"
              value={ratingStars || 5}
              precision={0.5}
              readOnly
            />
            <p style={{ marginTop: "3px" }}>
              {" "}
              ({ratingStars === 0 || !ratingStars
                ? "Chưa có "
                : ratingStars}{" "}
              điểm đánh giá)
            </p>
          </div>
          <div className="detailProduct__info-general">
            <div>
              <p className="detailProduct__info-general-text">Số lượng:</p>
              <p className="detailProduct__info-general-text">Số lượng đã bán:</p>
              <p className="detailProduct__info-general-text">
                Loại sản phẩm:
              </p>
              <p className="detailProduct__info-general-text">Khối lượng sản phẩm:</p>
            </div>
            <div>
              <p className="detailProduct__info-general-text">
                {data?.quantity + " sản phẩm"}
              </p>
              <p className="detailProduct__info-general-text">
                {data?.sales + ' sản phẩm'}
              </p>
              <p className="detailProduct__info-general-text">
                {data?.category?.name}
              </p>
              <p className="detailProduct__info-general-text">
                {(data?.weight / 1000) >= 1 ? (data?.weight / 1000) + ' kilogram' : (data?.weight) + ' gram'}
              </p>
            </div>
            {/* <p className="detailProduct__info-general-text">
              Nếu bạn đang tìm kiếm một loại trái cây ngon, thì không còn gì
              tuyệt vời hơn sản phẩm này. Được thu hoạch từ vườn trái cây chất
              lượng cao, trái cây này đã được chọn lọc cẩn thận để đảm bảo chất
              lượng tốt nhất. Với màu sắc tươi sáng và vị ngọt tự nhiên, sản
              phẩm này sẽ làm hài lòng cả những người ưa thích trái cây khó tính
              nhất.
            </p> */}
          </div>

          <div className="detailProduct__status">
            {status?.id != 0 ? (
              <></>
            ) : (
              <>
                <ButtonGroup
                  size="small"
                  aria-label="small outlined button group"
                  className="quantity-buttons"
                  style={{ height: "38px" }}
                >
                  <Button
                    onClick={() => {
                      quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0);
                    }}
                  >
                    -
                  </Button>
                  <Button>{quantity}</Button>
                  <Button
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
                <button
                  className="detailProduct__add-to-cart"
                  style={{ fontWeight: 600, cursor: "pointer" }}
                  onClick={handleClickAddItem}
                >
                  THÊM VÀO GIỎ HÀNG
                </button>
              </>
            )}
            {status?.id != 0 ? null : (
              <button
                className="detailProduct__add-to-gift"
                style={{ fontWeight: 600, cursor: "pointer" }}
                onClick={handleOpenGiftCartList}
              >
                <CardGiftcardIcon />
              </button>
            )}
            <div className="detailProduct__status-info">
              {handleStatusProduct(status)}
            </div>
          </div>
          <div className="detailProduct__info-guide">
            <div
              style={{ display: "flex", fontSize: "20px", lineHeight: "28px" }}
            >
              <HelpIcon sx={{ fontSize: "20px", marginRight: "2px" }} />
              <p>Hướng dẫn cách đặt hàng trực tuyến</p>
            </div>
            <div
              style={{ display: "flex", fontSize: "20px", lineHeight: "28px" }}
            >
              <BookIcon sx={{ fontSize: "20px", marginRight: "2px" }} />
              <p>Câu hỏi thường gặp khi mua hàng</p>
            </div>
            <div
              style={{ display: "flex", fontSize: "20px", lineHeight: "28px" }}
            >
              {/* <BookIcon sx={{ fontSize: "20px", marginRight: "2px" }} /> */}
            </div>
          </div>
        </div>
        <div className="detailProduct__support">
          <div className="detailProduct__support-box">
            <div className="detailProduct__support-box-item">
              <LocalShippingIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Đặt hàng online, giao hàng COD toàn quốc</p>
            </div>
            <div className="detailProduct__support-box-item">
              <VolunteerActivismIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Nhận hàng, kiểm tra, thanh toán tận tay</p>
            </div>
            <div className="detailProduct__support-box-item">
              <AppleIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>
                Sản phẩm tươi và sạch, luôn đảm bảo chất lượng cho người dùng
              </p>
            </div>
          </div>
          <div className="detailProduct__support-box">
            <div className="detailProduct__support-box-item">
              <PhoneIphoneIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Hotline đặt hàng 093 471 0592 (Làm việc cả T7, CN)</p>
            </div>
            <div className="detailProduct__support-box-item">
              <FacebookIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Hỗ trợ qua Facebook Messenger</p>
            </div>
          </div>
        </div>
      </Box>

      {/* Gift */}
      <Modal
        open={openGiftCartList}
        onClose={handleCloseGiftCartList}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-gift">
          <GiftListModal
            closeModalGiftCart={handleCloseGiftCartList}
            quantity={quantity}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default DetailProduct;
