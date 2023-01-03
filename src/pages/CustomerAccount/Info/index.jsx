import {useState} from "react";
import { Link } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { toast } from 'react-toastify';
import { loginSuccess } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux';

import "./Info.scss";

import {
  Avatar,
  Typography,
  Stack,
  ListItemText,
  Button,
  Modal,
  Box,
  IconButton,
  Divider,
  Badge,
  ClickAwayListener,
  TextField,
} from "@mui/material";

import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useSelector } from "react-redux";

import apiProfile from "../../../apis/apiProfile";
import Loading from "../../../components/Loading";
import SelectBoxAddress from "../../../components/SelectBoxAddress";



function Info() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [phone, setPhone] = useState(user.phone)
  const [email, setEmail] = useState(user.email)
  const [modalUploadAvatar, setModalUploadAvatar] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Xử lí hình ảnh
  const openModalUploadAvatar = () => setModalUploadAvatar(true);
  const closeModalUploadAvatar = () => setModalUploadAvatar(false);

  const handleClickAvatar = () => {
    openModalUploadAvatar();
  };
  const handleClickAwayAvatar = () => {
    closeModalUploadAvatar();
  };
  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList);
  };


  const handleUploadAvatar = ()=>{
    if (image.length === 0) {
      toast.warning("Vui lòng chọn ảnh")
      return
    }
    if(uploading){
      toast.warning("Hình ảnh đang được cập nhật, vui lòng không thao tác quá nhiều lần")
      return
    }
    setUploading(true)
    let params = new FormData(); 
    params.append('photo', image[0].file);
    apiProfile.postUploadAvatar(params)
      .then(res => {
        toast.success("Cập nhật ảnh đại diện thành công")
        getUserProfile()
      })
      .catch(error => {
        toast.error("Cập nhật ảnh đại diện thất bại")
      })
      .finally(() => {
        setModalUploadAvatar(false);
        setUploading(false)
      })
  }

  // Xử lí Tên, số điện thoại, email
  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  }
  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  }
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  }
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  // Xử lí phần địa chỉ
  const [city, setCity] = useState(user.cityId);
  const [district, setDistrict] = useState(user.districtId);
  const [ward, setWard] = useState(user.wardId);
  const [addressDetail, setAddressDetail] = useState(user.detailLocation);

  const handleChangeCity = (value) => {
    setCity(value);
  };

  const handleChangeDistrict = (value) => {
    setDistrict(value);
  };

  const handleChangeWard = (value) => {
    setWard(value);
  };

  const handleChangeAddressDetail = (event) => {
    setAddressDetail(event.target.value);
  };
  
  const onSaveChange = () => {
    if (!(firstName && lastName && phone && email && city && district && ward && addressDetail)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    const params = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      cityId: city,
      districtId: district,
      wardId: ward,
      detailLocation: addressDetail,
    };
    setUpdating(true)
    apiProfile
      .putUpdateProfile(params)
      .then((response) => {
        toast.success("Thay đổi thành công");
        getUserProfile();
      })
      .catch((error) => {
        toast.error("Thay đổi không thành công");
        console.log(error)
      })
      .finally(()=>setUpdating(false))
  };

  const getUserProfile = () => {
    apiProfile.getUserProfile()
      .then((res) => {
        let newUser = res.data
        dispatch(loginSuccess({ ...user, ...newUser }))
      })
  }
  return (
    <Stack className="customer-info" spacing={3}>
      <Typography variant="h6">Thông tin tài khoản</Typography>
      <Stack direction="row" spacing={8}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={4}>
            <ClickAwayListener onClickAway={handleClickAwayAvatar}>
              <Box sx={{ position: "relative" }} onClick={handleClickAvatar}>
                <Badge
                  badgeContent={<EditRoundedIcon fontSize="30" color="white" />}
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  color="primary"
                >
                  <Avatar
                    sx={{
                      width: 110,
                      height: 110,
                      border: "3px solid aquamarine",
                    }}
                    src={image.length === 0 ? user.photoUrl : image[0].data_url}
                  />
                </Badge>
                
              </Box>
            </ClickAwayListener>

            <Stack spacing={3} justifyContent="space-around">
              <Stack
                direction="column"
                spacing={2}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <label>Họ</label>
                <input id="input-name" placeholder="Thêm họ" type="text"
                  value={firstName}
                  onChange={onChangeFirstName}
                />
              </Stack>

              <Stack
                direction="column"
                spacing={2}
                alignItems="flex-star"
                justifyContent="space-between"
              >
                <label>Tên</label>
                <input
                  id="input-nickname"
                  placeholder="Thêm Tên"
                  type="text"
                  value={lastName}
                  onChange={onChangeLastName}
                />
              </Stack>
            </Stack>
          </Stack>
          <Typography>Số điện thoại và Email</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" sx={{ width: "350px", position: "relative" }}>
                <TextField
                    id="outlined-basic"
                    value={phone}
                    variant="outlined"
                    sx={{ width: "100%" }}
                    size="small"
                    onChange={onChangePhone}
                />
                <span className="order__iconSearch">
                    <LocalPhoneOutlinedIcon sx={{ fontSize: "28px" }} color="disabled" />
                </span>
              </Stack>
            </Stack>
            <Stack
            direction="row"
            spacing={15}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" sx={{ width: "350px", position: "relative" }}>
              <TextField
                  id="outlined-basic"
                  value={email}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  size="small"
                  onChange={onChangeEmail}
                  disabled
              />
              <span className="order__iconSearch">
                  <EmailOutlinedIcon sx={{ fontSize: "28px" }} color="disabled" />
              </span>
          </Stack>

          </Stack>
          
          <Stack style={{backgroundColor: "#f7f7f7", padding: "10px"}}>
            <Typography>Bảo mật</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={{marginTop: "20px"}}
            >
              <Stack direction="row" spacing={1}>
                <LockIcon color="disabled" />
                <ListItemText primary="Mật khẩu của bạn" />
              </Stack>
              <Link to="/my-account/edit-account/password">
                <Button size="small" variant="outlined" style={{color: "#3D8B91", border: "1px solid #3D8B91"}}>
                  Quên mật khẩu
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack spacing={4} style={{width: "100%"}}>
          
          <Stack
              direction="row"
              spacing={15}
              alignItems="center"
              justifyContent="space-between"
              style={{width: "100%"}}
            >
            <Stack spacing={4}  style={{width: "100%"}}>
              <Typography>Địa chỉ tài khoản</Typography>
              <SelectBoxAddress
                city={city}
                district={district}
                ward={ward}
                onChangeCity={handleChangeCity}
                onChangeDistrict={handleChangeDistrict}
                onChangeWard={handleChangeWard}
              />
            </Stack>
          </Stack>
          <Stack direction="row">
          <Typography className="create-address__label">
            Địa chỉ chi tiết
          </Typography>
          <Stack className="create-address__input">
            <TextField
                  id="outlined-basic"
                  value={addressDetail}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  size="small"
                  onChange={handleChangeAddressDetail}
              />
            </Stack>
          </Stack>
          <Button variant="contained" sx={{ width: 200, alignSelf: "center", backgroundColor: "#3D8B91", '&:hover': {backgroundColor: '#3D8B91'}}}
            onClick={onSaveChange}
          >
            {updating&&<Loading color="#fff"/>}Lưu thay đổi
          </Button>
          
        </Stack>
      </Stack>

      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalUploadAvatar}
        onClose={closeModalUploadAvatar}
      >
        <Stack sx={{ padding: "2rem" }} className="modal-info" spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2">
              Cập nhật avatar
            </Typography>

            <IconButton onClick={closeModalUploadAvatar}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />

          <Box>
            <ImageUploading
              value={image}
              onChange={onChange}
              dataURLKey="data_url"
              acceptType={["jpg"]}
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <Box className="upload__image-wrapper">
                  {imageList.length === 0 ? (
                    <Stack
                      sx={{
                        width: "100%",
                        height: "30rem",
                        border: "2px dashed grey",
                        borderRadius: "5px",
                      }}
                      style={isDragging ? { color: "red" } : null}
                      justifyContent="center"
                      alignItems="center"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <Typography
                        sx={{ ml: "auto", mr: "auto", color: "blue" }}
                      >
                        Nhấn để chọn hoặc kéo thả hình ảnh vào khung này.
                      </Typography>
                    </Stack>
                  ) : null}

                  {imageList.map((image,i) => (
                    <Stack
                      key={i}
                      sx={{
                        width: "100%",
                        height: "30rem",
                        borderRadius: "5px",
                      }}
                      spacing={3}
                      className="image-item"
                    >
                      <img
                        style={{
                          width: "25rem",
                          height: "25rem",
                          alignSelf: "center",
                        }}
                        src={image.data_url}
                        alt=""
                      />
                      <Stack
                        direction="row"
                        className="image-item__btn-wrapper"
                        justifyContent="center"
                        spacing={5}
                      >
                        <Button
                          sx={{ width: "50%" }}
                          variant="outlined"
                          onClick={() => onImageRemove(0)}
                        >
                          Hủy bỏ
                        </Button>
                        <Button
                          sx={{ width: "50%" }}
                          variant="contained"
                          onClick={handleUploadAvatar}
                        >
                         {uploading&&<Loading color="#fff"/>} Lưu thay đổi
                        </Button>
                      </Stack>
                    </Stack>
                  ))}
                </Box>
              )}
            </ImageUploading>
          </Box>
        </Stack>
      </Modal>

    </Stack>
  );
}
export default Info;
