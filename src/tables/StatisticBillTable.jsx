import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { formatDateTime, numWithCommas } from "../constraints/Util";

StatisticBillTable.propTypes = {
  data: PropTypes.array.isRequired,
};

const PaymentMethodOptions = {
  CASH: 0,
  MOMO: 1,
};

export default function StatisticBillTable(props) {
  return (
    <>
      <Grid container spacing={2}>
        {props?.data && props?.data.length > 0 ? (
          <Stack
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              margin: "0 20px",
            }}
          >
            <Stack
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography marginRight={"30px"} fontWeight={'bold'}>Tổng hóa đơn:</Typography>
              <Typography>
                {`${numWithCommas(
                  props?.data.reduce((total, item) => (total += item?.total), 0)
                )} đ`}
              </Typography>
            </Stack>
            <Stack
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography marginRight={"30px"}  fontWeight={'bold'}>
                Tổng hóa đơn với Momo:
              </Typography>
              <Typography>
                {`${numWithCommas(
                  props?.data.reduce((total, item) => {
                    if (item?.paymentMethod === PaymentMethodOptions["MOMO"]) {
                      return (total += item?.total);
                    }
                    return total;
                  }, 0)
                )} đ`}
              </Typography>
            </Stack>
            <Stack
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography marginRight={"30px"}  fontWeight={'bold'}>
                Tổng hóa đơn với tiền mặt:
              </Typography>
              <Typography>
                {`${numWithCommas(
                  props?.data.reduce((total, item) => {
                    if (item?.paymentMethod === PaymentMethodOptions["CASH"]) {
                      return (total += item?.total);
                    }
                    return total;
                  }, 0)
                )} đ`}
              </Typography>
            </Stack>
          </Stack>
        ) : null}

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
                        <TableCell align="center">{numWithCommas(item?.total)}</TableCell>
                      </TableRow>
                    );
                  } else return null;
                })
              : null}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}
