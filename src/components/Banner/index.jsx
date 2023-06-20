import { Stack } from "@mui/material";

export default function Banner(props) {
  return (
    <>
      <Stack
        className="banner container"
        style={{ marginBottom: "10px", marginTop: "10px" }}
      >
        <img src={props?.value} alt="banner" style={{ width: "100%" }} />
      </Stack>
    </>
  );
}
