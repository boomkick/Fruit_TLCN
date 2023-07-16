import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import apiModelImageSearching from "../../apis/apiModelImageSearching";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";

export default function ImageUploadPreviewComponent() {
  const [fileObj, setFileObj] = useState([]);
  const [fileArray, setFileArray] = useState([]);

  const uploadMultipleFiles = (e) => {
    let oldFileObj = [...fileObj];
    oldFileObj.push(e.target.files[0]);
    setFileObj(oldFileObj);
    let oldFileArray = [...fileArray];
    oldFileArray.push(URL.createObjectURL(e.target.files[0]));
    setFileArray(oldFileArray);
  };

  // Suggest Label
  const [labelEnglishOptions, setLabelEnglishOptions] = useState([]);
  const [labelVietNameseOptions, setLabelVietNameseOptions] = useState([]);

  const [labelEnglishID, setLabelEnglishID] = useState(null);
  const [labelVietNameseID, setLabelVietNameseID] = useState(null);
  useEffect(() => {
    const loadSuggest = async () => {
      await apiModelImageSearching.getLabels().then((res) => {
        if (res?.length > 0) {
          let enOptions = [];
          let vnOptions = [];
          res.forEach((item, index) => {
            enOptions[index] = { label: item?.en };
            vnOptions[index] = { label: item?.vi };
          });
          setLabelEnglishOptions(enOptions);
          setLabelVietNameseOptions(vnOptions);
        }
      });
    };
    loadSuggest();
  }, []);

  const handleChangeLabelEnglish = useCallback((value) => {
    setLabelEnglishID(value);
    let id = undefined;
    labelEnglishOptions.forEach((item, index) => {
      if (item?.label === value?.label) {
        id = index;
        return;
      }
    });
    setLabelVietNameseID(
      labelVietNameseOptions.find((item, index) => index === id)
    );
  }, [labelVietNameseOptions, labelEnglishOptions]);

  // If new
  const [labelEnglish, setLabelEnglish] = useState("");
  const [labelVietNamese, setLabelVietNamese] = useState("");
  const handleChangeLabelEnglishText = (event) => {
    setLabelEnglish(event.target.value);
  };
  const handleChangeLabelVietNameseText = (event) => {
    setLabelVietNamese(event.target.value);
  };

  // radioButton New or Edit
  const [radioValue, setRadioValue] = React.useState("exist");

  const handleChangeRadioValue = (event) => {
    setRadioValue(event.target.value);
  };

  const handleReset = () => {
    setFileObj([])
    setFileArray([])
    setRadioValue("exist")
    setLabelEnglish("")
    setLabelVietNamese("")
    setLabelEnglishID(null)
    setLabelVietNameseID(null)
  }

  // Save
  const handleUpdate = async () => {
    let params = new FormData();
    if (fileObj?.length < 1) {
      toast.error("Chưa có ảnh để lưu trữ!");
    }
    if (radioValue === "exist") {
      if (!labelEnglishID) {
        toast.error("Vui lòng chọn label tiếng anh!");
        return
      }
      const label = {
        en: labelEnglishID?.label?.trim(),
        vi: labelVietNameseID?.label.trim(),
      };
      params.append("label", JSON.stringify(label));
      fileObj.forEach((item) => {
        params.append("images", item);
      });
      apiModelImageSearching.postAddImages(params).then((res) => {
        if (res?.status !== 200) {
          toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
        } else {
          toast.success("Đã lưu trữ ảnh thành vào bộ dữ liệu");
        }
      });
      handleReset();
    } else {
      if (!labelEnglish) {
        toast.error("Vui lòng chọn label tiếng anh!");
      }
      const label = {
        en: labelEnglish?.trim(),
        vi: labelVietNamese?.trim(),
      };
      params.append("label", JSON.stringify(label));
      fileObj.forEach((item) => {
        params.append("images", item);
      });
      apiModelImageSearching.postAddImages(params).then((res) => {
        if (res?.status !== 200) {
          toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
        } else {
          toast.success("Đã lưu trữ ảnh thành vào bộ dữ liệu");
        }
      });
      handleReset()
    }
  };

  return (
    <form>
      <Stack display={"flex"} marginLeft={"8px"}>
        <Typography
          sx={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Bộ dữ liệu:
        </Typography>
        <div className="form-group multi-preview">
          <Stack>
            <Grid container spacing={2} width={"100%"}>
              {fileArray.map((url) => (
                <Grid xs={2} height={"200px"}>
                  <Stack
                    border={"1px solid #ccc"}
                    borderRadius={"5px"}
                    sx={{ width: "95%", height: "95%" }}
                  >
                    <img
                      src={url}
                      alt="..."
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </div>
      </Stack>

      <div className="form-group" style={{ marginLeft: "8px" }}>
        <input
          type="file"
          className="form-control"
          onChange={uploadMultipleFiles}
          multiple
          style={{ display: "none" }}
          id="icon-button-multiple-files"
        />
        <label htmlFor="icon-button-multiple-files">
          <Button
            variant="outlined"
            startIcon={<FileUploadIcon />}
            sx={{ marginTop: "0px !important" }}
            component={"span"}
          >
            Upload
          </Button>
        </label>
      </div>
      <Stack direction="row">
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            maxWidth: 600,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <FormLabel sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Kiểu thêm:
          </FormLabel>
          <RadioGroup
            value={radioValue}
            onChange={handleChangeRadioValue}
            sx={{ width: "70%", flexDirection: "row" }}
          >
            <FormControlLabel
              value="exist"
              control={<Radio />}
              label="Đã tồn tại"
            />
            <FormControlLabel
              value="new"
              control={<Radio />}
              label="Thêm mới"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack direction="column">
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            maxWidth: 600,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Label tiếng anh:
          </Typography>
          {radioValue === "exist" ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={labelEnglishOptions}
              value={labelEnglishID}
              onChange={(event, value) => {
                handleChangeLabelEnglish(value);
              }}
              sx={{ width: "70%" }}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            <TextField
              id="outlined-basic"
              value={labelEnglish}
              onChange={handleChangeLabelEnglishText}
              variant="outlined"
              sx={{ width: "70%" }}
              size="big"
            />
          )}
        </FormControl>
      </Stack>
      <Stack direction="column">
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            maxWidth: 600,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Label việt nam:
          </Typography>
          {radioValue === "exist" ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={labelVietNameseOptions}
              value={labelVietNameseID}
              onChange={(event, value) => {
                setLabelVietNameseID(value);
              }}
              sx={{ width: "70%" }}
              renderInput={(params) => <TextField {...params} />}
              disabled={true}
            />
          ) : (
            <TextField
              id="outlined-basic"
              value={labelVietNamese}
              onChange={handleChangeLabelVietNameseText}
              variant="outlined"
              sx={{ width: "70%" }}
              size="big"
            />
          )}
        </FormControl>
      </Stack>
      <Stack justifyContent="start" flexDirection={"row"}>
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{ marginRight: "10px", width: "120px" }}
          startIcon={<SaveIcon />}
        >
          {"Cập nhật"}
        </Button>
      </Stack>
    </form>
  );
}
