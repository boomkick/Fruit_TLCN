import { useState, useEffect } from "react";
import {Box, Typography} from "@mui/material";
import {Pagination} from "@mui/material";


function Comment (props) {
    const listReviews = props.data
    return (
        <Box className="detailProduct__comment">
                <Box className="detailProduct__title">
                  <h2>ĐÁNH GIÁ SẢN PHẨM ({listReviews?.length || 0})</h2>
                </Box>
                {listReviews?.length === 0 ? 
                <Typography fontSize={"17.25px"} style={{borderBottom: "1px solid #ECECEC", opacity: "0.5"}}>Sản phẩm hiện tại chưa có đánh giá nào</Typography>
                :
                listReviews?.map((item) => {
                    return (
                        <Box className="detailProduct__comment-card">
                            <div className="detailProduct__comment-card-user">
                                <img src="https://secure.gravatar.com/avatar/f7c6b77bf377de274f6a06b9cf79fa95?s=60&d=mm&r=g" alt="" />
                                <div className="detailProduct__comment-card-user-info">
                                <h3>{item?.account?.firstName + " " + item?.account?.lastName}</h3>
                                <h4>{item?.postDate}</h4>
                                <p>{item?.content}</p>
                                </div>
                            </div>
                        </Box>
                    )
                })}
            </Box>
    )
};
export default Comment;