import { Alert } from "@mui/material";
import PropTypes from "prop-types";

AlertNotFound.propTypes = {
  value: PropTypes.string,
};
export default function AlertNotFound(props) {
  return (
    <>
      <Alert
        severity="warning"
        style={{
          marginTop: "23px",
          marginRight: "15px",
          marginLeft: "15px",
          fontSize: "16px",
        }}
      >
        {props.value}
      </Alert>
    </>
  );
}
