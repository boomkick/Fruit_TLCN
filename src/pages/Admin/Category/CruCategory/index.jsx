 /* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
import "./CruCategory.scss";
import apiCategory from "../../../../apis/apiCategory";
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
    styled
} from "@mui/material";

function CrudCategory(props) {
    const [id, setId] = useState("");
    const [name, setName] = useState("")
    const [category, setCategory] = useState(null);
    const [edit, setEdit] = useState(props.edit);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getCategoryById = async () => {
            await apiCategory.getCategoryById(params.id)
            .then((res) => {
                setCategory(res.data);
                setName(res.data.name);
            })
        }
        getCategoryById();
        if(edit === true) {
            setId(params?.id);
        }
    }, [])

    // useEffect(() => {
    //     setCategory(listCategory.find((item) => item.id == id))
    // }, [edit])
    useEffect(() => {
        if (props.edit) {
            setEdit(props.edit)
        }
    }, []);

    const handleUpdate = () => {
        const params = {
            "name": name
        }
        if (!(name && id)) {
            toast.warning("Vui lòng nhập đầy đủ thông tin !!");
            return
        }    
        apiCategory.putCategory(params, id)
            .then(res => {
                toast.success("Cập nhật thành công")
                navigate("/admin/category")
            })
            .catch(error => {
                toast.error("Tên danh mục đã tồn tại")
            })
    }
    const handleSave = () => {
        const params = {
            "name": name
        }
        if (!(name)) {
            toast.warning("Vui lòng nhập đầy đủ thông tin !!");
            return
        }
        else {
            apiCategory.postCategory(params)
                .then(res => {
                    toast.success("Thêm danh mục thành công")
                    setName("")
                })
                .catch(error => {
                toast.error("Tên danh mục đã tồn tại")
                })
        }
    }
    return (
        <Box>
            <Stack p={3} justifyContent="center" sx={{ width: "700px" }} spacing={3}>
                <Stack direction="row" p={2} >
                    <Typography sx={{ width: "200px" }}>Tên danh mục</Typography>
                    <TextField value={name} size="small" id="outlined-basic" variant="outlined" sx={{ flex: 1 }} 
                        onChange={(event) => {setName(event.target.value)}}/>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                    <Button onClick={
                        edit ? handleUpdate
                            : handleSave} sx={{ width: "30%" }} variant="contained">{edit ? "Cập nhật":"Thêm"}</Button>
                </Stack>
            </Stack>
        </Box>
    )
}
const InputCustom = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        boxSizing: "border-box",
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        display: "flex",
        height: "40px !important",
        padding: '0px 26px 0px 12px',
        alignItems: "center",
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#1890ff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default CrudCategory