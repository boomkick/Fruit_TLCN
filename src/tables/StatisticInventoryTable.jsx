import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import {formatDateTime} from '../constraints/Util'

StatisticInventoryTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function StatisticInventoryTable(props) {
  console.log("data: ", props.data);
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
                sx={{ width: "30%", top: "64px", fontSize: "15px" }}
              >
                Ngày
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                ID thông báo&nbsp;
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "60%", top: "64px", fontSize: "15px" }}
              >
                Nội dung&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props.data
              ? props.data.map((item) => (
            <Fragment>
              <TableRow>
                <TableCell rowSpan={item.notification.length + 1}>
                  {formatDateTime(item.date)}
                </TableCell>
              </TableRow>
              {item.notification.map((item) => (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.content}</TableCell>
                </TableRow>
              ))}
            </Fragment>
          )) : null}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}
