import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import PropTypes from "prop-types";

MaterialUIPickers.propTypes = {
  value: PropTypes,
  handleChangeDate: PropTypes.func.isRequired,
};

export default function MaterialUIPickers(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} sx={{flex: "1"}}>
            <DesktopDatePicker
            inputFormat="MM/DD/YYYY"
            value={props.value}
            onChange={props.handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
            />
        </Stack>
    </LocalizationProvider>
  );
}