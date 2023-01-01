import * as React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function BasicDateRangePicker(props) {
  const [value, setValue] = React.useState(props.value || [null, null]);

  React.useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const handleChangeDateRange = (newValue) => {
    setValue(newValue)
    props.onChangeCreatedDate(newValue)
  }

  if (props.status && props.status === "ClientOrderFilter")
    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: 'Từ ngày', end: 'Đến ngày' }}
      >
        <DateRangePicker
          value={value}
          onChange={(newValue) => {handleChangeDateRange(newValue)}}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} size="small"/>
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} size="small"/>
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    );
  else 
    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: 'Từ ngày', end: 'Đến ngày' }}
      >
        <DateRangePicker
          value={value}
          onChange={(newValue) => {handleChangeDateRange(newValue)}}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    );
}