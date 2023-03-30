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
    style={{ padding: "7px 10px", backgroundColor: "#74768B" }}
    onClick={props.handleReset}
  >
    Xóa
  </Button>;
  </>
}
