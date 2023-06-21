import React, { useState, useEffect } from "react";
import { Box, CardMedia, Rating, Typography } from "@mui/material";
import { Pagination } from "@mui/material";
import {formatDate, formatDateTime} from '../../constraints/Util'

function Comment(props) {
  const [idPreview, setIdPreview] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
  const [itemSelectedType, setItemSelectedType] = useState(null);
  const getItemSelected = React.useCallback(() => {
    if (!itemSelected || !itemSelectedType) return <></>;
    if (itemSelectedType === "image") {
      return (
        <img
          className="detailProduct__comment-card-user-info-img-focus"
          src={itemSelected.url}
          alt=""
        />
      );
    } else {
      return (
        <CardMedia
          component="iframe"
          className="detailProduct__comment-card-user-info-img-focus"
          src={itemSelected.url}
          allow="autoPlay"
          autoPlay
          sx={{width: "32.25rem"}}
        />
      );
    }
  }, [itemSelected, itemSelectedType]);

  const listReviews = props.data;
  return (
    <Box className="detailProduct__comment">
      <Box className="detailProduct__title">
        <h2>ĐÁNH GIÁ SẢN PHẨM ({listReviews?.length || 0})</h2>
      </Box>
      {listReviews?.length === 0 ? (
        <Typography
          fontSize={"17.25px"}
          style={{ borderBottom: "1px solid #ECECEC", opacity: "0.5" }}
        >
          Sản phẩm hiện tại chưa có đánh giá nào
        </Typography>
      ) : (
        listReviews?.map((item) => {
          return (
            <Box className="detailProduct__comment-card">
              <div className="detailProduct__comment-card-user">
                <img
                  src="https://secure.gravatar.com/avatar/f7c6b77bf377de274f6a06b9cf79fa95?s=60&d=mm&r=g"
                  alt=""
                />
                <div className="detailProduct__comment-card-user-info">
                  <h3>
                    {item?.account?.firstName + " " + item?.account?.lastName}
                  </h3>
                  <Rating
                    name="read-only"
                    value={item?.rating}
                    readOnly
                    size="small"
                  />
                  <h4>{formatDateTime(item?.postDate)}</h4>
                  <p>{item?.content}</p>
                  <Box display={"flex"}>
                    {item?.reviewResource ? (
                      item?.reviewResource.map((reviewResource) =>
                        reviewResource.type === 0 ? (
                          <img
                            style={{width: 100, height: 100}}
                            className="detailProduct__comment-card-user-info-img"
                            src={reviewResource?.url}
                            alt=""
                            onClick={() => {
                              setIdPreview(item?.id);
                              setItemSelected(reviewResource);
                              setItemSelectedType("image");
                            }}
                          />
                        ) : (
                          <img
                            style={{width: 100, height: 100}}
                            className="detailProduct__comment-card-user-info-img"
                            src={reviewResource?.url.replace('mp4', 'jpg')}
                            alt=""
                            onClick={() => {
                              setIdPreview(item?.id);
                              setItemSelected(reviewResource);
                              setItemSelectedType("video");
                            }}
                          />
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </Box>
                  <Box sx={{transition: "1s ease"}}>
                  {idPreview == item?.id ?  getItemSelected() : null}
                  </Box>
                </div>
              </div>
            </Box>
          );
        })
      )}
    </Box>
  );
}
export default Comment;
