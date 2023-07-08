import { Box, Grid, Stack, Typography } from "@mui/material";
import ImageUploadPreviewComponent from "../../../components/ImagesUploadPreview";
import "./InputDataTraining.scss"

export default function InputDataTraining() {
  return (
    <Grid container style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Box className="inputDataTrainingAdmin">
        <Stack
          direction="row"
          mb={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: "#FFF", height: "80px" }}
          px={2}
        >
          <Typography fontSize="26px">Thêm dữ liệu training</Typography>
        </Stack>
        <Stack>
            <ImageUploadPreviewComponent/>
        </Stack>
      </Box>
    </Grid>
  );
}
