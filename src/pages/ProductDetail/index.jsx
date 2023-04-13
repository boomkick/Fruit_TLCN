import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rating, Button, Box, TextareaAutosize } from "@mui/material";
import "./ProductDetail.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import DetailProduct from "../../components/DetailProduct";
import Comment from "../../components/Comment";
import apiProduct from "../../apis/apiProduct";
import { toast } from "react-toastify";
import { Pagination as MuiPagination } from "@mui/material";
import apiReview from "../../apis/apiReview";
import GetTop8ProductProvider from "../../providers/GetTop8ProductProvider";
import GetTop8ProductConsumer from "../../consumers/GetTop8ProductConsumer";
import { numWithCommas } from "../../constraints/Util";

function ProductDetail(props) {
  const user = useSelector((state) => state.auth.user);
  const [product, setProduct] = useState();
  const [listReviews, setListReviews] = useState([]);
  const { id } = useParams();
  // Phân trang
  const [maxPage, setMaxPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangeCurrentPage = (event) => {
    setCurrentPage(event.target.value);
  };
  // Re-render when change id
  const location = useLocation();
  const [, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(count => count + 1);
  }, [location.pathname, id]);

  useEffect(() => {
    const getReviews = async () => {
      const params = {
        page: currentPage,
        pageSize: 5,
      };
      await apiReview
        .getReviewsByProduct(params, id)
        .then((res) => {
          setListReviews(res.data.reviews);
          setMaxPage(res.data.maxPage);
        })
        .catch((error) => {
          toast.error(error);
        });
    };
    getReviews();
  }, [currentPage]);

  // Thay đổi hoặc chỉnh sửa bình luận của mình
  const [myReview, setMyReview] = useState(null);

  // Bình chọn sản phẩm
  const [ratingStars, setRatingStars] = useState(5);
  const [contentComment, setContentComment] = useState("");

  // Lấy dữ liệu top 8 sản phẩm và dữ liệu chi tiết sản phẩm
  useEffect(() => {
    const getProductDetail = async () => {
      const response = await apiProduct.getProductDetail(id);
      if (response) {
        setProduct(response.data);
      }
    };
    getProductDetail();

    const getReviews = async () => {
      const params = {
        page: 1,
        pageSize: 5,
      };
      await apiReview
        .getReviewsByProduct(params, id)
        .then((res) => {
          setListReviews(res.data.reviews);
          setMaxPage(res.data.maxPage);
          if (user) {
            let newReview = res.data.reviews?.find(
              (item) => item?.account?.id === user.id
            );
            setMyReview(newReview);
            if (newReview) {
              setRatingStars(newReview?.rating);
              setContentComment(newReview?.content);
            }
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    };
    getReviews();
  }, [id]);

  // Lấy reviews sản phẩm, cùng với render lại review khi thêm bình luận mới
  const handleSubmitComment = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập trước khi gửi bình luận");
      return;
    }
    if (ratingStars && contentComment) {
      const params = {
        content: contentComment,
        rating: ratingStars,
      };
      await apiReview
        .postReview(params, id)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Bạn đã thêm bình luận vào sản phẩm");
            setRatingStars(5);
            setContentComment("");
          } else {
            toast.error(res.message);
          }
        })
        .catch((error) => {
          toast.error(error);
        });

      const getReviews = async () => {
        const params = {
          page: 1,
          pageSize: 5,
        };
        await apiReview
          .getReviewsByProduct(params, id)
          .then((res) => {
            setListReviews(res.data.reviews);
            setMaxPage(res.data.maxPage);
            if (user) {
              let newReview = res.data.reviews?.find(
                (item) => item?.account?.id === user.id
              );
              setMyReview(newReview);
              if (newReview) {
                setRatingStars(newReview?.rating);
                setContentComment(newReview?.content);
              }
            }
          })
          .catch((error) => {
            toast.error(error);
          });
      };
      getReviews();
    }
  };

  const handleChangeContentComment = (event) => {
    setContentComment(event.target.value);
  };

  // Xử lí cập nhật bình luận nếu có của người dùng
  const handleUpdateComment = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập trước khi chỉnh sửa bình luận");
      return;
    }
    if (ratingStars && contentComment) {
      const params = {
        content: contentComment,
        rating: ratingStars,
      };
      await apiReview
        .putReviewsByProduct(params, myReview.id)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Bạn đã chỉnh sửa bình luận");
            setRatingStars(5);
            setContentComment("");
          } else {
            toast.error(res.message);
          }
        })
        .catch((error) => {
          toast.error(error);
        });

      const getReviews = async () => {
        const params = {
          page: 1,
          pageSize: 5,
        };
        await apiReview
          .getReviewsByProduct(params, id)
          .then((res) => {
            setListReviews(res.data.reviews);
            setMaxPage(res.data.maxPage);
            if (user) {
              let newReview = res.data.reviews?.find(
                (item) => item?.account?.id === user.id
              );
              setMyReview(newReview);
              if (newReview) {
                setRatingStars(newReview?.rating);
                setContentComment(newReview?.content);
              }
            }
          })
          .catch((error) => {
            toast.error(error);
          });
      };
      getReviews();
    }
  };
  // Xử lí xóa bình luận
  const handleDeleteComment = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập trước khi chỉnh sửa bình luận");
      return;
    }
    await apiReview
      .deleteReviewsByProduct({ id: myReview.id })
      .then((res) => {
        if (res.status === 200) {
          toast.success("xóa bình luận thành công");
          setMyReview(null);
          setRatingStars(5);
          setContentComment("");
        } else {
          toast.error("Xóa bình luận không thành công");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
    const getReviews = async () => {
      const params = {
        page: 1,
        pageSize: 5,
      };
      await apiReview
        .getReviewsByProduct(params, id)
        .then((res) => {
          setListReviews(res.data.reviews);
          setMaxPage(res.data.maxPage);
        })
        .catch((error) => {
          toast.error(error);
        });
    };
    getReviews();
  };

  return (
    <GetTop8ProductProvider>
      <Box className="container" style={{ backgroundColor: "#fff" }}>
        <DetailProduct data={product} />

        <Box
          sx={{
            width: "100%",
            padding: "0px 15px 30px",
            borderTop: "1px solid #ECECEC",
          }}
        >
          <Box className="detailProduct__title">
            <h2>{"Top sản phẩm bán chạy"}</h2>
          </Box>
          <GetTop8ProductConsumer />
        </Box>
        <Comment data={listReviews} />
        {maxPage > 1 ? (
          <MuiPagination
            count={maxPage}
            page={currentPage}
            onChange={handleChangeCurrentPage}
            color="primary"
          />
        ) : null}

        {myReview ? (
          <Box className="textComment">
            <p>Đánh giá của bạn về sản phẩm </p>
            <Rating
              name="simple-controlled"
              value={ratingStars}
              onChange={(event, newValue) => {
                setRatingStars(newValue);
              }}
            />
            <TextareaAutosize
              className="textComment__textarea"
              aria-label="empty textarea"
              placeholder="Hãy gửi ý kiến của bạn về sản phẩm cho shop, để shop cải thiện hơn, cám ơn bạn rất nhiều!"
              value={contentComment}
              onChange={handleChangeContentComment}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                textTransform: "uppercase",
                fontWeight: "400",
                marginRight: "10px",
              }}
              onClick={handleUpdateComment}
            >
              Chỉnh sửa
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                textTransform: "uppercase",
                fontWeight: "400",
              }}
              onClick={handleDeleteComment}
            >
              Xóa
            </Button>
          </Box>
        ) : (
          <Box className="textComment">
            <p>Đánh giá của bạn về sản phẩm </p>
            <Rating
              name="simple-controlled"
              value={ratingStars}
              onChange={(event, newValue) => {
                setRatingStars(newValue);
              }}
            />
            <TextareaAutosize
              className="textComment__textarea"
              aria-label="empty textarea"
              placeholder="Hãy gửi ý kiến của bạn về sản phẩm cho shop, để shop cải thiện hơn, cám ơn bạn rất nhiều!"
              value={contentComment}
              onChange={handleChangeContentComment}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                textTransform: "uppercase",
                fontWeight: "400",
              }}
              onClick={handleSubmitComment}
            >
              GỬI
            </Button>
          </Box>
        )}
      </Box>
    </GetTop8ProductProvider>
  );
}
export default ProductDetail;
