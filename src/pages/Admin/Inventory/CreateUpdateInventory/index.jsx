/* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
import apiInventory from "../../../../apis/apiInventory";
import apiProduct from "../../../../apis/apiProduct";
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
  Autocomplete,
} from "@mui/material";
import MaterialUIPickers from "../../../../components/DatePicker";
import PropTypes from "prop-types";
import { formatDate } from "../../../../constraints/Util";

CreateUpdateInventory.propTypes = {
  edit: PropTypes.bool.isRequired,
};

const unitByItems = [
  { id: 0, label: "NONE", name: "Mặc định" },
  { id: 1, label: "UNIT", name: "Đơn vị" },
  { id: 2, label: "WEIGHT", name: "Trọng lượng" },
];

function CreateUpdateInventory(props) {
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(props.edit);
  const [inventory, setInventory] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [importPrice, setImportPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [unit, setUnit] = useState(1);
  const [productSuggests, setProductSuggests] = useState([]);

  const [deliveryDate, setDeliveryDate] = useState(null);
  const handleChangeDeliveryDate = React.useCallback((date) => {
    setDeliveryDate(date);
  }, []);

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
      await apiInventory
        .getInventoryById(id)
        .then((res) => {
          setInventory(res.data);
          setProductId(
            productSuggests.find((item) => item.id == res.data.product.id)
          );
          setQuantity(res.data.quantity);
          setImportPrice(res.data.importPrice);
          setDescription(res.data.description);
          //setUnit(res.data.unit + 1);
          setDeliveryDate(res.data.deliveryDate);
          setExpireDate(res.data.expireDate);
        })
        .catch((error) => {
          setInventory({});
        });
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

  const handleUpdate = () => {
    if (!unit) {
      toast.warning("Gía trị đơn vị không được để mặc định");
      return;
    }
    if (
      !(
        productId &&
        quantity &&
        importPrice &&
        description &&
        unit &&
        deliveryDate &&
        expireDate &&
        id
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
    } else {
      if(typeof deliveryDate === "object"){}
        let deliveryDateFormat = typeof deliveryDate === "object" ? deliveryDate.format("YYYY-MM-DD") : deliveryDate;
        let expireDateFormat = typeof expireDate === "object" ? expireDate.format("YYYY-MM-DD") : expireDate;
        const params = {
        productId: Number(productId?.id),
        quantity: Number(quantity),
        importPrice: Number(importPrice),
        description: description,
        unit: 1,
        deliveryDate: deliveryDateFormat,
        expireDate: expireDateFormat,
      };
      apiInventory
        .putInventory(params, id)
        .then((res) => {
          toast.success("Cập nhật thành công");
          navigate("/admin/inventory");
        })
        .catch((error) => {
          toast.error("Cập nhật không thành công, đã có sự cố!");
        });
    }
  };

  const handleSave = () => {
    if (
      !(
        productId &&
        quantity &&
        importPrice &&
        description &&
        unit &&
        deliveryDate &&
        expireDate
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      const params = {
        productId: Number(productId?.id),
        quantity: Number(quantity),
        importPrice: Number(importPrice),
        description: description,
        unit: 1,
        deliveryDate: deliveryDate.format("YYYY-MM-DD"),
        expireDate: expireDate.format("YYYY-MM-DD"),
      };
      apiInventory
        .postInventory(params)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Nhập hàng vào kho thành công");
            navigate("/admin/inventory");
          } else {
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
