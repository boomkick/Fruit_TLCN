/* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
//  import "./CruCategory.scss";
import apiInventory from "../../../../apis/apiInventory";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  InputBase,
  styled,
} from "@mui/material";
import MaterialUIPickers from "../../../../components/DatePicker";
import PropTypes from "prop-types";

CreateUpdateInventory.propTypes = {
  edit: PropTypes.bool.isRequired,
};

const unitByItems = [
    { id: 0, label: "NONE", name: "Mặc định" },
    { id: 1, label: "WEIGHT", name: "Trọng lượng" },
    { id: 2, label: "UNIT", name: "Đơn vị" },
  ];

function CreateUpdateInventory(props) {
  const [id, setId] = useState("");
  const [inventory, setInventory] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [importPrice, setImportPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [unit, setUnit] = useState(null);

  const [deliveryDate, setDeliveryDate] = useState(null);
  const handleChangeDeliveryDate = React.useCallback((date) => {
    setDeliveryDate(date);
  }, []);

  const [expireDate, setExpireDate] = useState(null);
  const handleChangeExpireDate = React.useCallback((date) => {
    setExpireDate(date);
  }, []);

  useEffect(() => {
    const loaddata = async () => {
      await apiInventory
        .getInventoryById(id)
        .then((res) => {
          setInventory(res.data);
          setProductId(res.data.productId);
          setQuantity(res.data.quantity);
          setImportPrice(res.data.importPrice);
          setDescription(res.data.description);
          setSupplierId(res.data.supplierId);
          setUnit(res.data.unit);
          setDeliveryDate(res.data.deliveryDate);
          setExpireDate(res.data.expireDate);
        })
        .catch((error) => {
          setInventory({});
        });
    };
    if (props.edit) {
      setId(params?.id);
      loaddata();
    }
  }, [props.edit]);

  const handleUpdate = () => {
    const params = {
        "productId": Number(productId),
        "quantity": Number(quantity),
        "importPrice": Number(importPrice),
        "description": description,
        "supplierId": Number(supplierId),
        "unit": unit === 1 ? 1 : 0,
        "deliveryDate": deliveryDate.format("YYYY-MM-DD"),
        "expireDate": expireDate.format("YYYY-MM-DD"),
    };
    if (
      !(
        productId &&
        quantity &&
        importPrice &&
        description &&
        supplierId &&
        unit &&
        deliveryDate &&
        expireDate &&
        id
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    apiInventory
      .putInventory(params, id)
      .then((res) => {
        toast.success("Cập nhật thành công");
        navigate("/admin/inventory");
      })
      .catch((error) => {
        toast.error("Cập nhật không thành công, đã có sự cố!");
      });
  };

  const handleSave = () => {
    const params = {
      "productId": Number(productId),
      "quantity": Number(quantity),
      "importPrice": Number(importPrice),
      "description": description,
      "supplierId": Number(supplierId),
      "unit": unit === 1 ? 1 : 0,
      "deliveryDate": deliveryDate.format("YYYY-MM-DD"),
      "expireDate": expireDate.format("YYYY-MM-DD"),
    };
    if (
      !(
        productId &&
        quantity &&
        importPrice &&
        description &&
        supplierId &&
        unit &&
        deliveryDate &&
        expireDate
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      apiInventory
        .postInventory(params)
        .then((res) => {
            if(res.status === 200) {
                toast.success("Nhập hàng vào kho thành công");
                navigate("/admin/inventory")
            }
            else {
                toast.error("Nhập hàng không thành công, đã xảy ra sự cố !");
            }
        })
        .catch((error) => {
          toast.error("Nhập hàng không thành công, đã xảy ra sự cố !");
        });
    }
  };
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
          <TextField
            value={productId}
            onChange={(event) => {
              setProductId(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Số lượng</Typography>
          <TextField
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Giá nhập</Typography>
          <TextField
            value={importPrice}
            onChange={(event) => {
              setImportPrice(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Ngày nhập</Typography>
          <MaterialUIPickers
            handleChangeDate={handleChangeDeliveryDate}
            value={deliveryDate}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Ngày hết hạn</Typography>
          <MaterialUIPickers
            handleChangeDate={handleChangeExpireDate}
            value={expireDate}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Mô tả</Typography>
          <TextField
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Nhà cung cấp</Typography>
          <TextField
            value={supplierId}
            onChange={(event) => {
              setSupplierId(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Stack>
        <Stack direction="row">
          <Typography sx={{ width: "200px" }}>Đơn vị</Typography>
          <Select
                  value={unit}
                  onChange={(event) => {
                    setUnit(event.target.value);
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  cursor="pointer"
                  sx={{ minWidth: 300, width: "70%" }}
                >
                  {unitByItems ? (
                    unitByItems.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
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

export default CreateUpdateInventory;
