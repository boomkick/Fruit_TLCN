import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

StatisticCartTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function StatisticCartTable(props) {
  return (
    <>
      <Grid container spacing={2}>
        <Table
          className="tableCategory"
          sx={{ minWidth: "300px", maxWidth: "500px" }}
          stickyHeader
          size="medium"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "22%", top: "64px", fontSize: "18px" }}>
                Trạng thái
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "18px" }}
              >
                Số lượng đơn hàng&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">Đang xử lí</TableCell>
              <TableCell align="center">{props.data["PENDING"] || 0}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">Đã vận chuyển</TableCell>
              <TableCell align="center">
                {props.data["DELIVERIED"] || 0}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">Đã hủy</TableCell>
              <TableCell align="center">
                {props.data["CANCELLED"] || 0}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}
