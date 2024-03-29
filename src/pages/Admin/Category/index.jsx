import React from "react";
import { Link } from "react-router-dom";
import apiCategory from '../../../apis/apiCategory';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "./Category.scss";
import {
  Stack,
  Button,
  Typography,
  Modal,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Category() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = React.useState([]);
  const [itemdelete, setItemdelete] = useState(null);
  const [dialogDelete, setDialogDelete] = useState(false);

  useEffect(() => {
    const getData = async () => {
      apiCategory.showAllCategory()
        .then(res => {
          setCategory(res.data);
        })
    };
    getData();
  }, []);

  const handleDelete = () => {
    const newcategory = category.filter(item => {
      return itemdelete.id !== item.id
    }
    )
    setCategory(newcategory)
    closeDialogDeleteAll()
    apiCategory.deleteCategory({ id: itemdelete.id })
      .then(res => {
        toast.success("Xóa thành công")
      })
      .catch(error => {
        toast.error("Xóa không thành công!")
      })
  }
  const openDialogDeleteAll = (itemdelete) => {
    setItemdelete(itemdelete)
    setDialogDelete(true)
  }
  const closeDialogDeleteAll = () => {
    setDialogDelete(false)
  }

  return (
    <Stack direction="row" bgcolor="#fff" p={3}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize="26px">Danh sách danh mục sản phẩm</Typography>
          <Link to="/admin/category/create">
            <Button variant="contained">Thêm danh mục</Button>
          </Link>
        </Stack>
        <Stack direction="row" width="100%" position="relative">
          <TextField
            id="outlined-basic"
            placeholder="Tìm danh mục"
            variant="outlined"
            width="100% !important"
            onChange={(event) => setQuery(event.target.value)}

          />
          <span className="category__iconSearch">
            <SearchIcon sx={{ fontSize: "28px" }} />
          </span>
        </Stack>

        <Table
          className="tableCategoryAdmin"
          sx={{ minWidth: "650px" }}
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "80%", top: "64px" }}>
                Tên danh mục
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Thao tác&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { category ?
              category.filter((category) => (category?.name.toLowerCase().includes(query))).map((item, id) => (
                <TableRow
                  key={item.id}
                >
                  <TableCell scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell >
                    <Stack spacing={1} justifyContent="center" py={1} style={{display: "flex", flexDirection: "row"}}>
                      <Link to={`edit/${item.id}`} >
                        <EditIcon 
                        style={{cursor: "pointer"}} 
                        sx={{
                          "&:hover": { color: "#FFFFFF", backgroundColor: "green" }, 
                          transition: "ease 0.2s",
                          borderRadius: "5px"
                        }}/>
                      </Link>
                      <DeleteIcon onClick={() => openDialogDeleteAll(item)} variant="outlined" style={{cursor: "pointer", marginTop: "0px", marginLeft: "5px"}} 
                      sx={{
                        "&:hover": { color: "#FFFFFF", backgroundColor: "red" }, 
                        transition: "ease 0.2s",
                        borderRadius: "5px",
                      }}/>
                    </Stack>
                  </TableCell>
                </TableRow>
              )) : null
            }

          </TableBody>
        </Table>
      </Stack>
      {
        dialogDelete &&
        <Modal
          sx={{ overflowY: "scroll" }}
          onClose={closeDialogDeleteAll}
          open={dialogDelete}
        >
          <Stack className="modal-info" direction="row" spacing={2} justifyContent='center' width='26rem' >
            <Stack>
              <InfoOutlinedIcon color="primary" />
            </Stack>

            <Stack spacing={3}>
              <Stack>
                <Typography fontWeight="bold">
                  Bạn có chắc muốn xóa danh mục này ?
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button onClick={closeDialogDeleteAll} variant="outlined">Hủy</Button>
                <Button variant="contained" onClick={handleDelete}>Xác nhận</Button>
              </Stack>
            </Stack>
          </Stack>
        </Modal>
      }

    </Stack>
  );
}

export default Category;
