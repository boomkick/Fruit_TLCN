import React from "react";
import { Stack, Typography } from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export function ErrorAfterSubmit(props) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <ErrorOutlineIcon size="small" color="error" />
      <Typography variant="subtitle2" color="red">
        {props.message}
      </Typography>
    </Stack>
  );
}

export function ErrorInput(props) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="caption" color="gray">
        {props.message}
      </Typography>
    </Stack>
  );
}
