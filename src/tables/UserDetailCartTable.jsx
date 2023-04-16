import {
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

UserDetailCartTable.propTypes = {
  data: PropTypes.object.isRequired,
  handleSetPage: PropTypes.func.isRequired,
};

export default function UserDetailCartTable(props) {
  return (
    <>
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
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
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
                sx={{ width: "35%", top: "64px", fontSize: "15px" }}
              >
                Mô tả
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
                      <TableCell align="center">{item.status}</TableCell>
                      <TableCell align="center">{item.createdDate}</TableCell>
                      <TableCell align="center">
                        {item.processDescription}
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
