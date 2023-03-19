import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

StatisticProductTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function StatisticProductTable(props) {
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
                Tên&nbsp;
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Đơn vị&nbsp;
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
                      <TableCell align="center">{item.Unit}</TableCell>
                      <TableCell align="center">{item.Profit}</TableCell>
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
