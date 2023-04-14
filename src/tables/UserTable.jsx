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
import { green, red } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import apiProfile from "../apis/apiProfile";
import { toast } from "react-toastify";

UserTable.propTypes = {
  data: PropTypes.object.isRequired,
  handleSetPage: PropTypes.func.isRequired,
  handleSetData: PropTypes.func.isRequired,
};

export default function UserTable(props) {
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
    apiProfile
      .updateUserStatus({
        userId: itemdelete.id,
        status: itemdelete.status === 0 ? 2 : 0,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Chuyển đổi trạng thái người dùng thành công");
          const getData = async () => {
            let param = {};
            if (props.page) {
              param["page"] = props.page;
            }
            apiProfile
              .getUserByAdmin(param)
              .then((response) => {
                props.handleSetData(response.data);
              })
              .catch(props.handleSetData({}));
          };
          getData();
          return;
        } else {
          toast.error("Chuyển đổi trạng thái người dùng không thành công");
        }
      })
      .catch((error) => {
        toast.error("Chuyển đổi trạng thái người dùng không thành công!");
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Table
          className="tableCategory"
          sx={{ minWidth: "800px" }}
          stickyHeader
          size="medium"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                STT
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Tên
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                Vị trí
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                SĐT
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Địa chỉ
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.accounts
              ? props.data.accounts.map((item) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell>
                        {item.firstName + " " + item.lastName}
                      </TableCell>
                      <TableCell align="center">
                        {item.role === 0
                          ? "Người dùng"
                          : item.role === 1
                          ? "Nhân viên"
                          : "Quản trị viên"}
                      </TableCell>
                      <TableCell align="center">{item.phone}</TableCell>
                      <TableCell align="center">
                        {item.detailLocation}
                      </TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">
                        <Stack
                          display="flex"
                          flexDirection={"row"}
                          justifyContent="center"
                          alignItems={"center"}
                        >
                          <Stack p={1}>
                            <InfoOutlinedIcon
                              variant="Outlined"
                              onClick={() => navigate(`${item.id}`)}
                              sx={{ color: green[500], "& :hover": green[700] }}
                              cursor="pointer"
                            />
                          </Stack>
                          <Stack p={1}>
                            {item?.status === 0 ? (
                              <AccountCircleIcon
                                variant="Outlined"
                                onClick={() => openModalDelete(item)}
                                sx={{
                                  color: green[500],
                                  "& :hover": green[700],
                                }}
                                cursor="pointer"
                              />
                            ) : (
                              <NoAccountsIcon
                                variant="Outlined"
                                onClick={() => openModalDelete(item)}
                                sx={{ color: red[500], "& :hover": red[700] }}
                                cursor="pointer"
                              />
                            )}
                          </Stack>
                          
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
        {props.data.maxPage > 1 ? (
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
              count={props.data.maxPage}
              page={props.data.currentPage}
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
                  {`Bạn có chắc muốn đổi trạng thái người dùng thứ tự ${
                    itemdelete?.firstName + " " + itemdelete?.lastName
                  }?`}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button onClick={closeModalDelete} variant="outlined">
                  Hủy
                </Button>
                <Button variant="contained" onClick={handleDelete}>
                  Chuyển trạng thái
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Modal>
      </Grid>
    </>
  );
}
