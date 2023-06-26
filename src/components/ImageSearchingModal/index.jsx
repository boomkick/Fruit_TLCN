import "./ImageSearchingModal.scss";
import {
  Modal,
  Box,
  Stack,
  FormControl,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import LoadingAPI from "../LoadingAPI";
import { Fragment, useCallback, useEffect, useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import apiModelImageSearching from "../../apis/apiModelImageSearching";
import { toast } from "react-toastify";

ImageSearchingModal.propsTypes = {
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  handleSetKeyWord: PropTypes.func,
};

function ImageSearchingModal(props) {
  // Tìm kiếm bằng hình ảnh
  const [imageSearching, setImageSearching] = useState(null);
  const [imageSearchingText, setImageSearchingText] = useState("");
  const [imageSearchingLoading, setImageSearchingLoading] = useState(false);

  useEffect(() => {
    const getImageSearching = async () => {
      if (imageSearching) {
        setImageSearchingLoading(true);
        let params = new FormData();
        params.append("images", imageSearching);
        await apiModelImageSearching
          .postGetForm(params)
          .then((res) => {
            setImageSearchingText(res?.fruit);
          })
          .catch((err) => {
            toast.error(err);
          });
        setImageSearchingLoading(false);
      }
    };
    getImageSearching();
  }, [imageSearching]);

  const onSearch = useCallback(() => {
    props.handleSetKeyWord(imageSearchingText);
    props.handleClose();
  }, [imageSearchingText, props]);

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box className="image-modal">
        <Stack direction="row" className="image-modal__heading">
          <h3>Chọn hình ảnh mong muốn</h3>
          <CloseIcon onClick={props.handleClose} height="24px" />
        </Stack>
          <LoadingAPI loading={imageSearchingLoading}>
        <Box className="image-modal__form">
            <Stack
              display={"flex"}
              flexDirection={"column"}
              flex={"1"}
              justifyContent={"center"}
              alignItems={"center"}
              marginTop={"10px"}
            >
              <img
                src={
                  imageSearching ? URL.createObjectURL(imageSearching) : null
                }
                className="image-modal__image"
                alt=""
              />
              <Stack
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyItems={"center"}
                sx={{ minWidth: 120, width: "80%", marginTop: "10px" }}
              >
                <TextField
                  disabled
                  id="outlined-disabled"
                  sx={{ flex: "3" }}
                  value={imageSearchingText}
                  size="small"
                />
                <FormControl sx={{ flex: "1" }}>
                  <Fragment>
                    <input
                      color="primary"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        setImageSearching(e.target.files[0]);
                      }}
                      id="icon-button-file"
                      style={{ display: "none" }}
                    />
                    <label htmlFor="icon-button-file">
                      <Button
                        variant="contained"
                        startIcon={<CameraAltOutlinedIcon />}
                        component={"span"}
                        sx={{
                          marginTop: "0px !important",
                          width: "100%",
                          marginLeft: "5px",
                        }}
                      >
                        Upload
                      </Button>
                    </label>
                  </Fragment>
                </FormControl>
              </Stack>
              <Stack
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyItems={"end"}
                sx={{ minWidth: 120, width: "80%", marginTop: "10px" }}
              >
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  color="success"
                  component={"span"}
                  sx={{
                    marginTop: "0px !important",
                    width: "100%",
                    marginLeft: "5px",
                  }}
                  onClick={onSearch}
                >
                  Tìm kiếm
                </Button>
              </Stack>
            </Stack>
        </Box>
          </LoadingAPI>
      </Box>
    </Modal>
  );
}

export default ImageSearchingModal;
