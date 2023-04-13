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
import { green } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
EmployeeTable.propTypes = {
  data: PropTypes.object.isRequired,
  handleSetPage: PropTypes.func.isRequired,
};

export default function EmployeeTable(props) {
  const navigate = useNavigate();
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
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                STT
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Tên
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Vị trí
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                SĐT
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "20%", top: "64px", fontSize: "15px" }}
              >
                Lương
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "10%", top: "64px", fontSize: "15px" }}
              >
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.accounts
              ? props.data.accounts.map((item) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell>
                        {item.firstName + " " + item.lastName}
                      </TableCell>
                      <TableCell align="center">{item.role === 0 ? "Người dùng" : item.role === 1 ? "Nhân viên" : "Quản trị viên" }</TableCell>
                      <TableCell align="center">{item.phone}</TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">{item.salary}</TableCell>
                      <TableCell align="center">
                        <Stack
                          display="flex"
                          flexDirection={"row"}
                          justifyContent="center"
                          alignItems={"center"}
                        >
                          <Stack p={1}>
                            <EditOutlinedIcon
                              variant="Outlined"
                              cursor="pointer"
                              sx={{ color: green[600], "& :hover": green[800] }}
                              onClick={() => {
                                navigate(`/admin/employee/update-role/${item.id}`);
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
