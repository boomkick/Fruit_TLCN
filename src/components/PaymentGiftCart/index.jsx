import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PaymentItem from "../PaymentItem";

PaymentGiftCart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function PaymentGiftCart(props) {
  return (
    <Box bgcolor="#fff" p={2} mt={2}>
      <Box mb={2}>
        <Stack direction={"row"} spacing={68.5}>
          <Typography
            className="payment__title"
            gutterBottom
            variant="h5"
            component="div"
          >
            {"Giỏ quà " + props.data?.name}
          </Typography>
        </Stack>
        <Box
          sx={{
            borderTop: "1px solid #bfbfbf",
            width: "90%",
            paddingBottom: "20px",
          }}
        ></Box>
        <Stack className="payment__listItem">
          {props.data?.cartDetails.map((item) => (
            <PaymentItem data={item} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
