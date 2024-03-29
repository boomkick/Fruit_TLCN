import {
  Button,
  Grid,
  Modal,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";
import { toast } from "react-toastify";
import apiReview from "../apis/apiReview";

const ReviewResourceType = {
  Image: 0,
  Video: 1,
};

ReviewTable.propTypes = {
  data: PropTypes.object.isRequired,
  handleSetData: PropTypes.func.isRequired,
  handleSetPage: PropTypes.func.isRequired,
};

export default function ReviewTable(props) {
  const [modalDelete, setModalDelete] = useState(false);
  const [itemdelete, setItemdelete] = useState(null);
  const navigate = useNavigate();

  // Xử lí xóa sản phẩm
  const openModalDelete = (row) => {
    setItemdelete(row);
    setModalDelete(true);
  };
  const closeModalDelete = () => setModalDelete(false);
  const handleDelete = () => {
    closeModalDelete();
    apiReview
      .deleteReviewsByAdmin({ id: itemdelete.id })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Xóa đánh giá thành công");
          const getData = async () => {
            let param = {};
            if (props.page) {
              param["page"] = props.page;
            }
            apiReview
              .getReviewsByAdmin(param)
              .then((response) => {
                props.handleSetData(response.data);
              })
              .catch(props.handleSetData({}));
          };
          getData();
          return;
        } else {
          toast.error("Xóa đánh giá không thành công");
        }
      })
      .catch((error) => {
        toast.error("Xóa đánh giá không thành công!");
      });
  };

  const getVideoReview = (item) => (
    <video
      width="180px"
      height="180px"
      controls
      src={item?.url}
      style={{ marginRight: "10px" }}
    />
  );

  const getImageReview = (item) => (
    <img
      src={item?.url}
      width="180px"
      height="180px"
      style={{ marginRight: "10px" }}
      alt=""
    />
  );

  return (
    <>
      <Grid container spacing={2}>
        <Table
          className="table"
          sx={{ minWidth: "800px" }}
          stickyHeader
          size="medium"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ width: "5%", top: "64px", fontSize: "15px" }}
              >
                STT
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                Tài khoản
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Nội dung
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "5%", top: "64px", fontSize: "15px" }}
              >
                Điểm
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Hình
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Video
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                Xử lí
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.reviews
              ? props.data?.reviews.map((item) => {
                  let image = item.reviewResource.find(
                    (item) => item.type === ReviewResourceType.Image.valueOf()
                  );
                  let video = item.reviewResource.find(
                    (item) => item.type === ReviewResourceType.Video.valueOf()
                  );
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell align="center">{item.product.name}</TableCell>
                      <TableCell>
                        {item.account.firstName + " " + item.account.lastName}
                      </TableCell>
                      <TableCell>{item.content}</TableCell>
                      <TableCell align="center">{item.rating}</TableCell>
                      <TableCell align="center">
                        {image ? getImageReview(image) : ""}
                      </TableCell>
                      <TableCell align="center">
                        {video ? getVideoReview(video) : ""}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          display="flex"
                          flexDirection={"row"}
                          justifyContent="center"
                          alignItems={"center"}
                        >
                          {/* <Stack p={1}>
                            <InfoOutlinedIcon
                              variant="Outlined"
                              cursor="pointer"
                              sx={{color: green[600] }}
                              onClick={() => {
                                navigate(`/admin/review/detail/${item.id}`);
                              }}
                            />
                          </Stack> */}
                          {/* <Stack p={1}>
                            <EditOutlinedIcon
                              variant="Outlined"
                              cursor="pointer"
                              sx={{ color: green[600], "& :hover": green[800] }}
                              onClick={() => {
                                navigate(`/admin/inventory/detail/${item.id}`);
                              }}
                            />
                          </Stack> */}
                          <Stack p={1}>
                            <DeleteOutlinedIcon
                              variant="Outlined"
                              onClick={() => openModalDelete(item)}
                              sx={{ color: red[500], "& :hover": red[700] }}
                              cursor="pointer"
                            />
                          </Stack>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
        {props.data?.maxPage >= 1 ? (
          <Stack
            spacing={2}
            width={"100%"}
            mt="10px"
            display={"flex"}
            alignItems={"center"}
            m={2}
            pb={2}
          >
            <Pagination
              count={props.data?.maxPage}
              page={props.data?.currentPage}
              onChange={props.handleSetPage}
              color="primary"
            />
          </Stack>
        ) : (
          <></>
        )}
        <Modal
          sx={{ overflowY: "scroll" }}
          open={modalDelete}
          onClose={closeModalDelete}
        >
          <Stack
            className="modal-info"
            direction="row"
            spacing={2}
            justifyContent="center"
            width="28rem"
          >
            <Stack>
              <InfoOutlinedIcon color="primary" />
            </Stack>

            <Stack spacing={3}>
              <Stack>
                <Typography fontWeight="bold">
                  {`Bạn có chắc muốn xoá đánh giá thứ tự ${itemdelete?.id}?`}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button onClick={closeModalDelete} variant="outlined">
                  Hủy
                </Button>
                <Button variant="contained" onClick={handleDelete}>
                  Xóa bỏ
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Modal>
      </Grid>
    </>
  );
}
