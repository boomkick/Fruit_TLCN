import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Rating,
  Button,
  Box,
  TextareaAutosize,

} from "@mui/material";
import "./ProductDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../../components/CardProduct";
// styles swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
import DetailProduct from "../../components/DetailProduct"
import Comment from "../../components/Comment"
import apiProduct from "../../apis/apiProduct";
import { toast } from "react-toastify";
import { Pagination as MuiPagination } from "@mui/material";
import apiReview from "../../apis/apiReview";

function ProductDetail() {
    const user = useSelector((state) => state.auth.user);
    const [product, setProduct] = useState();
    const [listReviews, setListReviews] = useState([]);
    const [top8Product, setTop8Product] = useState([]);
    const { id } = useParams();
    // Phân trang
    const [maxPage, setMaxPage] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const handleChangeCurrentPage = (event) => {
      setCurrentPage(event.target.value);
    }

    useEffect(() => {
      const getReviews = async () => {
        const params = {
          page: currentPage,
          pageSize: 5
        }
        await apiReview.getReviewsByProduct(params, id)
          .then(res => {
            setListReviews(res.data.reviews);
            setMaxPage(res.data.maxPage);
          })
          .catch(error => {
            toast.error(error)
          })
      }
      getReviews();
    }, [currentPage])

    // Thay đổi hoặc chỉnh sửa bình luận của mình
    const [myReview, setMyReview] = useState(null);

    // Bình chọn sản phẩm
    const [ratingStars, setRatingStars] = useState(5);
    const [contentComment, setContentComment] = useState("");

    // Lấy dữ liệu top 8 sản phẩm và dữ liệu chi tiết sản phẩm
    useEffect(() => {
      const getTop8Product = async () => {
        const response = await apiProduct.getTop8Product();
        if (response) {
          setTop8Product(response.data);
        }
      };
      getTop8Product();

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
          pageSize: 5
        }
        await apiReview.getReviewsByProduct(params, id)
          .then(res => {
            setListReviews(res.data.reviews);
            setMaxPage(res.data.maxPage);
            if (user){
              let newReview = res.data.reviews?.find(item => item?.account?.id === user.id)
              setMyReview(newReview);
              if (newReview) {
                setRatingStars(newReview?.rating);
                setContentComment(newReview?.content);
              }
            }
          })
          .catch(error => {
            toast.error(error)
          })
      }
      getReviews();

    }, []);

    // Lấy reviews sản phẩm, cùng với render lại review khi thêm bình luận mới
    const handleSubmitComment = async () => {
      if (!user) {
        toast.warning("Vui lòng đăng nhập trước khi gửi bình luận")
        return
      }
      if(ratingStars && contentComment) {
        const params = {
          content: contentComment,
          rating: ratingStars
        }
        await apiReview.postReview(params, id)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              toast.success("Bạn đã thêm bình luận vào sản phẩm");
              setRatingStars(5);
              setContentComment("");
            } else {
              toast.error(res.message);
            }
          })
          .catch(error => {
            toast.error(error)
          })
        
        const getReviews = async () => {
          const params = {
            page: 1,
            pageSize: 5
          }
          await apiReview.getReviewsByProduct(params, id)
            .then(res => {
              setListReviews(res.data.reviews);
              setMaxPage(res.data.maxPage);
              if (user){
                let newReview = res.data.reviews?.find(item => item?.account?.id === user.id)
                setMyReview(newReview);
                if (newReview) {
                  setRatingStars(newReview?.rating);
                  setContentComment(newReview?.content);
                }
              }
            })
            .catch(error => {
              toast.error(error)
            })
        }
        getReviews();
      }
    }

    const handleChangeContentComment = (event) => {
      setContentComment(event.target.value);
    }

    // Xử lí cập nhật bình luận nếu có của người dùng
    const handleUpdateComment = async () => {
      if (!user) {
        toast.warning("Vui lòng đăng nhập trước khi chỉnh sửa bình luận")
        return
      }
      if(ratingStars && contentComment) {
        const params = {
          content: contentComment,
          rating: ratingStars
        }
        await apiReview.putReviewsByProduct(params, myReview.id)
          .then(res => {
            console.log("res: ", res);
            if (res.status === 200) {
              toast.success("Bạn đã chỉnh sửa bình luận");
              setRatingStars(5);
              setContentComment("");
            } else {
              toast.error(res.message);
            }
          })
          .catch(error => {
            toast.error(error)
          })
        
        const getReviews = async () => {
          const params = {
            page: 1,
            pageSize: 5
          }
          await apiReview.getReviewsByProduct(params, id)
            .then(res => {
              setListReviews(res.data.reviews);
              setMaxPage(res.data.maxPage);
              if (user){
                let newReview = res.data.reviews?.find(item => item?.account?.id === user.id)
                setMyReview(newReview);
                if (newReview) {
                  setRatingStars(newReview?.rating);
                  setContentComment(newReview?.content);
                }
              }
            })
            .catch(error => {
              toast.error(error)
            })
          }
        getReviews();
      }
    }
    // Xử lí xóa bình luận
    const handleDeleteComment = async () => {
      if (!user) {
        toast.warning("Vui lòng đăng nhập trước khi chỉnh sửa bình luận")
        return
      }
      await apiReview.deleteReviewsByProduct({id: myReview.id})
        .then(res => {
          if(res.status === 200) {
            toast.success("xóa bình luận thành công")
            setMyReview(null)
            setRatingStars(5)
            setContentComment("")
          }
          else {
            toast.error("Xóa bình luận không thành công")
          }
        })
        .catch(error => {
          toast.error(error)
        })
        const getReviews = async () => {
          const params = {
            page: 1,
            pageSize: 5
          }
          await apiReview.getReviewsByProduct(params, id)
            .then(res => {
              setListReviews(res.data.reviews);
              setMaxPage(res.data.maxPage);
            })
            .catch(error => {
              toast.error(error)
            })
          }
        getReviews();
    }

    return (
        <Box className= "container" style={{ backgroundColor: "#fff"}}>
            <DetailProduct data={product} />

            <Box sx={{
              width: "100%",
              padding: "0px 15px 30px",
              borderTop: "1px solid #ECECEC"
            }}>
                <Box className="detailProduct__title">
                  <h2>
                      {"Top sản phẩm bán chạy"}
                  </h2>
                </Box>
              <Swiper
                slidesPerView={4}
                spaceBetween={0}
                slidesPerGroup={4}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {top8Product.map((item) => (
                <SwiperSlide>
                  <CardProduct data={item}/>
                </SwiperSlide>
              ))}
              </Swiper>
            </Box>
            <Comment data={listReviews}/>
            {maxPage > 1 ? 
              <MuiPagination count={maxPage} page={currentPage} onChange={handleChangeCurrentPage} color="primary"/>
            : null}

            {myReview ? 
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
              <Button variant="contained" sx={{ backgroundColor: "black", textTransform: "uppercase", fontWeight: "400", marginRight: "10px"}} onClick={handleUpdateComment}>Chỉnh sửa</Button>
              <Button variant="contained" sx={{ backgroundColor: "black", textTransform: "uppercase", fontWeight: "400"}} onClick={handleDeleteComment}>Xóa</Button>
          </Box>
            : 
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
                <Button variant="contained" sx={{ backgroundColor: "black", textTransform: "uppercase", fontWeight: "400"}} onClick={handleSubmitComment}>GỬI</Button>
            </Box>
            }
            
            

        </Box>
    );
}
export default ProductDetail;