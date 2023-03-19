import {
  Button,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PropTypes from "prop-types";

FilterButton.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};
export default function FilterButton(props) {
  return <>
  <Button
    variant="contained"
    startIcon={<FilterAltIcon />}
    style={{ padding: "7px 10px", backgroundColor: "#36D7B7" }}
    onClick={props.handleFilter}
  >
    Bộ lọc
  </Button>;
  </>
}
