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
import { numWithCommas } from "../constraints/Util";

StatisticProductTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function StatisticProductTable(props) {
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
              width: "30%"
            }}
          >
            <Stack
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography marginRight={"30px"} fontWeight={"bold"}>Tổng lợi nhuận:</Typography>
              <Typography>
                {`${numWithCommas(
                  props?.data.reduce((total, item) => (total += item?.Profit), 0)
                )} đồng`}
              </Typography>
            </Stack>
            <Stack
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography marginRight={"30px"} fontWeight={"bold"}>
                Tổng số lượng sản phẩm:
              </Typography>
              <Typography>
                {`${numWithCommas(
                  props?.data.reduce((total, item) => (total += item?.Sale), 0)
                )} sản phẩm`}
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
                Tên&nbsp;
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Lợi nhuận&nbsp;
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Số lượng bán&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data
              ? props.data.map((item) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{item.Id}</TableCell>
                      <TableCell align="center">{item.Name}</TableCell>
                      <TableCell align="center">{`${numWithCommas(item.Profit)}`}</TableCell>
                      <TableCell align="center">{item.Sale}</TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}
