import { Box } from "@mui/material";
import React from "react";
import HashLoader from "react-spinners/HashLoader";

const LoadingAPI = (props) => {
  return (
    <>
      {props?.loading ? (
        // True -> load
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(138 138 138)",
            width: "100%",
            height: "100%"
          }}
        >
          <Box
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "30px",
              margin: "30px",
            }}
          >
            <HashLoader
              color="#36d7b7"
              loading={props?.loading}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
              // style={{borderRadius: "5px", backgroundColor: "black"}}
            />
          </Box>
        </Box>
      ) : (
        //False -> out loading time
        <>{props?.children}</>
      )}
    </>
  );
};

export default LoadingAPI;
