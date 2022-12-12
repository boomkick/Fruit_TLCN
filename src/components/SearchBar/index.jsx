import React from "react";
import { useState } from "react";
import { Box, TextField , InputAdornment } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {
  const { onSearch } = props;

  const [searchText, setSearchText] = useState("");

  const handleInput = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const handleEnterKeyPressed = (e) => {
    if (e.key === "Enter") {
      onSearch(searchText);
    }
  };

  return (
    <div>
      <Box  sx={{ width:"100%" }}>
        <TextField
          onChange={handleInput}
          onKeyPress={handleEnterKeyPressed}
          type="text"
          value={searchText}
          placeholder="Tìm kiếm"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            ),
          }}
          sx={{width:"100%"}}
        />
      </Box>
    </div>
  );
}

export default SearchBar;
