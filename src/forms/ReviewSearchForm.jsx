import {
  Grid,
  FormControl,
  Stack,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import FilterButton from "../components/Button/FilterButton";
import ClearButton from "../components/Button/ClearButton";
import apiProduct from "../apis/apiProduct";
import apiReview from "../apis/apiReview";
import { useParams } from "react-router-dom";

ReviewSearchForm.propTypes = {
  page: PropTypes.number.isRequired,
  handleSetData: PropTypes.func.isRequired,
};

export default function ReviewSearchForm(props) {
  // Theo nội dung keyword
  const [keyWord, setKeyWord] = useState("");
  const handleChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  // Theo id sản phẩm
  const id = useParams().id;
  const [productId, setProductId] = useState(id ? {id: id, label: ""} : null);
  const [productSuggests, setProductSuggests] = useState([]);
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
    const getData = async () => {
      let param = {};
      if (props.page) {
        param["page"] = props.page;
      }
      if (productId) {
        param["strProductId"] = productId.id;
      }
      apiReview
        .getReviewsByAdmin(param)
        .then((response) => {
          props.handleSetData(response.data);
        })
        .catch(props.handleSetData({}));
    };
    getData();
  }, [props.page]);

  const handleFilter = () => {
    const getData = async () => {
      let param = {};
      if (keyWord && keyWord !== "") {
        param["keyWord"] = keyWord;
      }
      if (productId) {
        param["strProductId"] = productId.id;
      }
      apiReview
        .getReviewsByAdmin(param)
        .then((response) => {
          props.handleSetData(response.data);
        })
        .catch(props.handleSetData({}));
    };
    getData();
  };

  const handleReset = () => {
    setKeyWord("");
    setProductId("");
  };

  return (
    <>
      <Grid container mb={2}>
        <Typography fontSize="26px">Quản lí đánh giá</Typography>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        mb={2}
      >
        <Grid item xs={6}>
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
                ID sản phẩm:
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={productSuggests}
                value={productId}
                onChange={(event, value) => {
                  setProductId(value);
                }}
                sx={{ width: "70%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Sản phẩm" />
                )}
              />
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={6}>
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
                Nội dung tìm kiếm:
              </Typography>
              <TextField
                id="outlined-basic"
                label="Nội dung"
                value={keyWord}
                onChange={handleChangeKeyWord}
                variant="outlined"
                sx={{ width: "70%" }}
                size="big"
              />
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Grid item xs={1}>
          <Stack width={"100%"}>
            <FilterButton handleFilter={handleFilter} />
          </Stack>
        </Grid>
        <Grid item xs={1}>
          <Stack width={"100%"}>
            <ClearButton handleReset={handleReset} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
