import {
  Button,
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
import PropTypes from "prop-types";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { green, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

InventoryTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleSetPage: PropTypes.func.isRequired,
};

export default function InventoryTable(props) {
  const [modalDelete, setModalDelete] = useState(false);
  //   const [products, setProducts] = useState([]);
  //   const [page, setPage] = useState(1);
  //   const [totalPage, setTotalPage] = useState(1);
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
    // apiProduct
    //   .deleteProduct({ id: itemdelete.id })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       toast.success("Xóa sản phẩm thành công");
    //       const newProducts = products.filter((item) => {
    //         return itemdelete.id !== item.id;
    //       });
    //       setProducts(newProducts);
    //     } else {
    //       toast.error("Xóa sản phẩm không thành công");
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error("Xóa sản phẩm không thành công!");
    //   });
  };
  return (
    <>
      <Table
        className="productTable"
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Giá nhập</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Ngày nhập</TableCell>
            <TableCell>Ngày hết hạn</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.inventories?.length >= 1 ? (
            props.data.inventories.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Stack>
                    <Typography>{row.id}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack>
                    <Typography sx={{ color: "#1890ff" }}>
                      {row.product.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" justifyContent="center">
                    <Typography sx={{ margin: "auto 0" }}>
                      {row.importPrice}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Typography>{row.quantity}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{row.deliveryDate}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{row.expireDate}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{row.description}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Stack
                    display="flex"
                    flexDirection={"row"}
                    justifyContent="center"
                    alignItems={"center"}
                  >
                    <Stack p={1}>
                        <EditOutlinedIcon
                          variant="Outlined"
                          cursor="pointer"
                          sx={{ color: green[600], "& :hover": green[800] }}
                          onClick={() => {
                            navigate(`/admin/inventory/detail/${row.id}`)
                          }}
                        />
                    </Stack>
                    <Stack p={1}>
                      <DeleteOutlinedIcon
                        variant="Outlined"
                        onClick={() => openModalDelete(row)}
                        sx={{ color: red[500], "& :hover": red[700] }}
                        cursor="pointer"
                      />
                    </Stack>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      {props.data.maxPage >= 1 ? (
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
                {`Bạn có chắc muốn xoá hàng ${itemdelete?.product.name}?`}
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
    </>
  );
}
