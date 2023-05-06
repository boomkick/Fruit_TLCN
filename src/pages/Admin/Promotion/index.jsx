/* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
import apiPromotion from "../../../apis/apiPromotion";
import apiProduct from "../../../apis/apiProduct";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Select,
  Button,
  InputBase,
  styled,
  Autocomplete,
} from "@mui/material";
import MaterialUIPickers from "../../../components/DatePicker";
import PropTypes from "prop-types";
import { formatDate } from "../../../constraints/Util";

CreateUpdatePromotion.propTypes = {
  edit: PropTypes.bool.isRequired,
};

const typeByItems = [
  { id: 0, label: "PRICE", name: "Giá trị" },
  { id: 1, label: "PERCENTAGE", name: "Phần trăm" },
];

const enableByItems = [
  { id: 0, label: "FALSE", name: "Không hiệu lực" },
  { id: 1, label: "TRUE", name: "Có hiệu lực" },
];

function CreateUpdatePromotion(props) {
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(props.edit);
  const [promotion, setPromotion] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [productSuggests, setProductSuggests] = useState([]);

  const [productId, setProductId] = useState(null);
  const [value, setValue] = useState(null);
  const [type, setType] = useState(1);
  const handleChangeType = React.useCallback((event) => {
    setType(event.target.value);
  }, []);

  const [isEnable, setIsEnable] = useState(1);

  // Ngày hết hạn
  const [expireDate, setExpireDate] = useState(null);
  const handleChangeExpireDate = React.useCallback((date) => {
    setExpireDate(date);
  }, []);

  useEffect(() => {
    const loadProductSuggest = async () => {
      await apiProduct.getProductSuggest().then((res) => {
        if (res.data.length > 0) {
          const suggestProductOptions = res.data.map((item) => ({
            label: `${item.name}`,
            id: `${item.id}`,
          }));
          setProductSuggests(suggestProductOptions);
        }
      });
    };
    loadProductSuggest();
  }, []);

  useEffect(() => {
    const loaddata = async () => {
      await apiPromotion
        .getPromotionByProductId(id)
        .then((res) => {
          setPromotion(res.data);
          setProductId(productSuggests.find((item) => item.id == id));
          setValue(res.data.value);
          setType(res.data.type);
          setExpireDate(res.data.expireDate);
          setIsEnable(res.data.isEnable ? 1 : 0);
        })
        .catch((error) => {});
    };
    if (edit === true && id) {
      loaddata();
    }
  }, [id, productSuggests]);

  useEffect(() => {
    if (props.edit) {
      setEdit(true);
      setId(params?.id);
    }
  }, []);

  const handleUpdate = React.useCallback(() => {
    if (promotion && promotion != {}) {
      if (!(productId && value && expireDate)) {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      } else {
        let expDate = new Date(expireDate);
        const params = {
          productId: Number(productId?.id),
          value: Number(value),
          type: type,
          expireDate: formatDate(expDate),
          isEnable: isEnable == 1 ? true : false,
        };
        apiPromotion
          .putProductPromotion(params, promotion?.id)
          .then((res) => {
            if (res?.status == 200) {
              toast.success("Cập nhật thành công");
              navigate("/admin/product");
            } else toast.error("Cập nhật không thành công, đã có sự cố!");
          })
          .catch((error) => {
            toast.error("Cập nhật không thành công, đã có sự cố!");
          });
      }
    } else {
      if (!(productId && value && expireDate)) {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!");
        return;
      } else {
        const params = {
          productId: Number(productId?.id),
          value: Number(value),
          type: type,
          expireDate: expireDate.format("YYYY-MM-DD"),
        };
        apiPromotion
          .postProductPromotion(params)
          .then((res) => {
            if (res.status === 200) {
              toast.success("Thêm khuyến mãi thành công");
              navigate("/admin/product");
            } else {
              if (res?.message) {
                toast.error(res?.message);
              } else
                toast.error(
                  "Thêm khuyến mãi không thành công, đã xảy ra sự cố !"
                );
            }
          })
          .catch((error) => {
            toast.error("Thêm khuyến mãi không thành công, đã xảy ra sự cố !");
          });
      }
    }
  }, [productId, value, expireDate, promotion, type, isEnable]);

  const handleSave = React.useCallback(() => {
    if (!(productId && value && expireDate)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      const params = {
        productId: Number(productId?.id),
        value: Number(value),
        type: type,
        expireDate: expireDate.format("YYYY-MM-DD"),
      };
      apiPromotion
        .postProductPromotion(params)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Thêm khuyến mãi thành công");
            navigate("/admin/product");
          } else {
            if (res?.message) {
              toast.error(res?.message);
            } else
              toast.error(
                "Thêm khuyến mãi không thành công, đã xảy ra sự cố !"
              );
          }
        })
        .catch((error) => {
          toast.error("Thêm khuyến mãi không thành công, đã xảy ra sự cố !");
        });
    }
  }, [productId, value, expireDate]);

  return (
    <Box width={"100%"} bgcolor="#fff">
      <Stack
        className="cruBrand"
        p={3}
        justifyContent="center"
        width="700px"
        spacing={2}
        bgcolor="#fff"
      >
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>ID sản phẩm</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={productSuggests}
            value={productId}
            onChange={(event, value) => {
              setProductId(value);
            }}
            sx={{ flex: 1 }}
            renderInput={(params) => <TextField {...params} label="Sản phẩm" />}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Loại</Typography>
          <Select
            value={type}
            onChange={(event) => handleChangeType(event)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            cursor="pointer"
            sx={{ minWidth: 300, width: "70%" }}
          >
            {typeByItems ? (
              typeByItems.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))
            ) : (
              <></>
            )}
          </Select>
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Hiệu lực</Typography>
          <Select
            value={isEnable}
            onChange={(event) => {
              setIsEnable(event.target.value);
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            cursor="pointer"
            sx={{ minWidth: 300, width: "70%" }}
            disabled={promotion ? false : true}
          >
            {enableByItems ? (
              enableByItems.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))
            ) : (
              <></>
            )}
          </Select>
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Giá trị</Typography>
          <TextField
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Ngày hết hạn</Typography>
          <MaterialUIPickers
            handleChangeDate={handleChangeExpireDate}
            value={expireDate}
          />
        </Stack>

        <Stack justifyContent="center" alignItems="center">
          <Button
            onClick={props.edit ? handleUpdate : handleSave}
            sx={{ width: "30%" }}
            variant="contained"
          >
            {props.edit ? "Cập nhật" : "Thêm"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
const InputCustom = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    boxSizing: "border-box",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    display: "flex",
    height: "40px !important",
    padding: "0px 26px 0px 12px",
    alignItems: "center",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#1890ff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default CreateUpdatePromotion;
