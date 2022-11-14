import React from 'react'
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Grid,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextareaAutosize
} from '@mui/material';
import "./DetailProduct.scss"
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorIcon from '@mui/icons-material/Error';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const choose = [
  { label: 'The Shawshank Redemption' },
  { label: 'The Godfather' },
  { label: 'The Godfather: Part II' },
  { label: 'The Dark Knight' },
  { label: '12 Angry Men' },
  { label: "Schindler's List" },
  { label: 'Pulp Fiction' }];
export default function DetailProduct() {
  return (
    <Box px={2} spacing={2}>
      <Stack>
        <Stack sx={{ backgroundColor: "#FFF", height: "80px" }} px={2} direction="row" justifyContent="flex-start" alignItems="center" mb={0.2}>
          <ArrowBackIcon />
          <Typography>Tạo sản phẩm mới</Typography>
        </Stack>
        <Stack>
          <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 550 }}>1.Thông tin chung</Typography>
          </Stack>
          <Stack sx={{ backgroundColor: "#FFF", height: "180px" }} px={2} mt={0.2} alignItems="flex-start">
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 550 }} mt={2}>*Tên sản phẩm</Typography>
              <TextField size="small" sx={{ width: "1000px" }}></TextField>
              <Typography sx={{ fontWeight: 550 }} mt={2}>* Danh mục</Typography>
              <Autocomplete size="small" disablePortal id="1" options={choose} sx={{ width: "1000px" }} renderInput={(params) => <TextField {...params} />} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 550 }}>2.Mô Tả Sản Phẩm</Typography>
        </Stack>
        <Stack p={2} spacing={2}>
          <Typography sx={{ fontWeight: "bold" }}>Hình ảnh sản phẩm</Typography>
          <Typography>Danh sách hình ảnh, tải hình ảnh sản phẩm với tối thiểu 1 tấm hình</Typography>
          <Button className="btn__upload" variant="contained" component="label">
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <PlayCircleOutlineIcon sx={{fontSize:"50px"}} />
              <Typography sx={{ color: "#333" }}>Nhấn hoặc kéo thả tập tin vào để tải lên</Typography>
            </Stack>
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <Stack direction="row">
            <Typography sx={{ fontWeight: "bold" }}>Mô tả chi tiết sản phẩm (Không chèn link/địa chỉ/SĐT/website/logo nhà bán)</Typography>
            <InfoOutlinedIcon />
          </Stack>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            style={{ width: "50%" }}
          />
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: "#fff" }} pt={2}>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 550 }}>3. Giá và đơn vị bán</Typography>
        </Stack>
        <Stack direction="row" spacing={20}>
          <Stack px={2}>
            <Typography sx={{ fontWeigth: "bold" }}>Giá bán</Typography>
            <TextField size="small" sx={{ width: "150%" }}></TextField>
          </Stack>
          <Stack px={2}>
            <Typography sx={{ fontWeigth: "bold" }}>Đơn vị</Typography>
            <TextField size="small" sx={{ width: "150%" }}></TextField>
          </Stack>
          <Stack px={2}>
            <Typography sx={{ fontWeigth: "bold" }}>Giá trị tối thiểu</Typography>
            <TextField size="small" sx={{ width: "150%" }}></TextField>
          </Stack>
        </Stack>
        <Stack px={2} py={2} direction="row" sx={{display: "flex", justifyContent: "flex-end"}}>
          <Button variant="contained" component="label">
            <Typography sx={{color:"#FFFFFF"}}>Thêm sản phẩm</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
