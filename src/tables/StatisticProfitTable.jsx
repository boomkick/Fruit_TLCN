import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";

StatisticProfitTable.propTypes = {
  data: PropTypes.number.isRequired,
};

export default function StatisticProfitTable(props) {
  return (
    <>
        <Row>
        <Table
                 className="tableCategory"
                 sx={{ minWidth: "300px", maxWidth: "500px" }}
                 stickyHeader
                 size="medium"
             >
                 <TableHead>
                     <TableRow>
                         <TableCell sx={{ width: "22%", top: "64px", fontSize: "18px" }}>Loại</TableCell>
                         <TableCell align="center" sx={{ width: "20%", top: "64px", fontSize: "18px" }}>Lợi nhuận&nbsp;</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                         <TableRow
                             sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                         >
                             <TableCell align="left">Tổng</TableCell>
                             <TableCell align="center">{props.data || 0}</TableCell>
                         </TableRow>
                 </TableBody>
             </Table>
        </Row>
    </>
  );
}
