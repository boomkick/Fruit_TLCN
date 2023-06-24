import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { formatDateTime } from "../constraints/Util";

StatisticBillTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function StatisticBillTable(props) {
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
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                STT
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Mã đơn hàng&nbsp;
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Phương thức TT&nbsp;
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Ngày thanh toán&nbsp;
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Tổng hóa đơn&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data
              ? props.data?.map((item) => {
                  if (item?.purchaseDate) {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{item.id}</TableCell>
                        <TableCell align="center">
                          {item.orderCode || "N/A"}
                        </TableCell>
                        <TableCell align="center">
                          {item.paymentMethod === 1
                            ? "Dịch vụ thanh toán MoMo"
                            : "Tiền mặt"}
                        </TableCell>
                        <TableCell align="center">
                          {formatDateTime(item.purchaseDate)}
                        </TableCell>
                        <TableCell align="center">{item.total}</TableCell>
                      </TableRow>
                    );
                  }else return null
                })
              : null}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}
