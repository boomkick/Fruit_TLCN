import {
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

ChangeButton.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
export default function ChangeButton(props) {
  return <>
  <Button
    variant="contained"
    startIcon={<EditLocationAltIcon />}
    size="small"
    style={{ backgroundColor: "black" }}
    onClick={props.handleChange}
  >
    Thay đổi
  </Button>
  </>
}
