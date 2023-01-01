import { Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import apiProfile from "../../../../apis/apiProfile";
import { role } from "../../../../constraints/Role"

function UpdateRoleUser() {
    const navigate = useNavigate();

    // Nhập email
    const [email, setEmail] = useState("")
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    // Chon Role
    const [userRole, setUserRole] = useState(0)
    const handleChangeUserRole = (event) => {
        setUserRole(event.target.value);
    }

    // Nhập email
    const [salary, setSalary] = useState("")
    const handleChangeSalary = (event) => {
        setSalary(event.target.value);
    }

    const handleUpdateRole = () => {
        const params = {
            "email": email,
            "role": userRole,
            "salary": salary
        }
        apiProfile.putUpdateRole(params)
            .then((res) => {
                if(res.status === 200) {
                    toast.success("Cập nhật quyền thành công");
                    navigate("/admin/user")
                } else {
                    toast.error("Cập nhật quyền không thành công");
                }
            })
            .catch((error) => {
                toast.error("Cập nhật quyền không thành công");
            })
    }

    return (<>
        <Box width={'100%'} bgcolor='#fff'>
            <Stack className="cruBrand" p={3} justifyContent="center" width="700px" spacing={2} bgcolor='#fff'>
                <Stack direction="row">
                    <Typography className="cruBrand__label">Nhập email người dùng:</Typography>
                    <TextField value={email} onChange={handleChangeEmail}
                        size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
                </Stack>
                <Stack direction="row">
                    <Typography className="cruBrand__label">
                        Quyền hạn:
                    </Typography>
                    <FormControl className="create-address__input" sx={{flex:"1"}}>
                        <Select
                        size="small"
                        value={userRole}
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={handleChangeUserRole}
                        >
                        {
                            role.map(item => <MenuItem value={item?.id}>{item?.text}</MenuItem>)
                        }
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row">
                    <Typography className="cruBrand__label">Lương:</Typography>
                    <TextField value={salary} onChange={handleChangeSalary}
                        size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
                </Stack>
                <Stack direction="row">
                    <Button variant="outlined" onClick={handleUpdateRole}>Cập nhật quyền</Button>
                </Stack>
            </Stack>
        </Box>
    </>)
}

export default UpdateRoleUser