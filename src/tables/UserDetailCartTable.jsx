import {
  Grid,
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
import { orderTabs } from "../constraints/OrderItem";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

UserDetailCartTable.propTypes = {
  data: PropTypes.object.isRequired,
  handleSetPage: PropTypes.func.isRequired,
};

export default function UserDetailCartTable(props) {
  const navigate = useNavigate();
  return (
    <>
    <Grid container spacing={2} mb={3} ml={0.5}>
      <Typography fontSize={'18px'} fontWeight={'600'}>Tổng giá trị các đơn hàng đã vận chuyển: {props.data.total}</Typography>
    </Grid>
      <Grid container spacing={2}>
        <Table
          className="tableCategory"
          sx={{ minWidth: "100%" }}
          stickyHeader
          size="medium"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "10%", top: "64px", fontSize: "15px" }}>
                STT
              </TableCell>
              <TableCell sx={{ width: "15%", top: "64px", fontSize: "15px" }}>
                Địa chỉ
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "15%", top: "64px", fontSize: "15px" }}
              >
                Trạng thái
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Ngày tạo
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "30%", top: "64px", fontSize: "15px" }}
              >
                Mô tả
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                Chi tiết
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.carts
              ? props.data.carts.map((item) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell align="center">
                        {item.detailLocation}
                      </TableCell>
                      <TableCell align="center">
                        {
                          orderTabs.find((e) => e.id == item?.status)
                            ?.type
                        }
                      </TableCell>
                      <TableCell align="center">{item.createdDate}</TableCell>
                      <TableCell align="center">
                        {item.processDescription}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          display="flex"
                          flexDirection={"row"}
                          justifyContent="center"
                          alignItems={"center"}
                        >
                          <Stack>
                            <InfoOutlinedIcon
                              variant="Outlined"
                              cursor="pointer"
                              sx={{color: green[600] }}
                              onClick={() => {
                                navigate(`/admin/order/detail/${item.id}`);
                              }}
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
      </Grid>
    </>
  );
}
