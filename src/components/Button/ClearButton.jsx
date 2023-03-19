import {
  Button,
} from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import PropTypes from "prop-types";

ClearButton.propTypes = {
  handleReset: PropTypes.func.isRequired,
};
export default function ClearButton(props) {
  return <>
  <Button
    variant="contained"
    endIcon={<RotateLeftIcon />}
    style={{ padding: "7px 10px", backgroundColor: "#8388A4" }}
    onClick={props.handleReset}
  >
    Xóa
  </Button>;
  </>
}
