import { Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import apiProfile from "../../../../apis/apiProfile";
import { role } from "../../../../constraints/Role"


function UpdateRoleEmployee() {
    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        apiProfile
        .getEmployeeByAdminWithID_V2({id: id})
        .then((response) => {
            setEmail(response.data.email)
            setEmployeeRole(response.data.role)
            setSalary(response.data.salary)
        })
    }, [id])

    // Nhập email
    const [email, setEmail] = useState("")
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    // Chon Role
    const [employeeRole, setEmployeeRole] = useState(0)
    const handleChangeEmployeeRole = (event) => {
        setEmployeeRole(event.target.value);
    }

    // Nhập email
    const [salary, setSalary] = useState(null)
    const handleChangeSalary = (event) => {
        setSalary(event.target.value);
    }

    const handleUpdateRole = () => {
        const params = {
            "email": email,
            "role": employeeRole,
            "salary": Number(salary)
        }
        apiProfile.putUpdateRole(params)
            .then((res) => {
                if(res.status === 200) {
                    toast.success("Cập nhật quyền thành công");
                    navigate("/admin/employee")
                } else {
                    toast.error(res.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    return (<>
        <Box width={'100%'} bgcolor='#fff'>
            <Stack className="cruBrand" p={3} justifyContent="center" width="700px" spacing={2} bgcolor='#fff'>
                <Stack direction="row">
                    <Typography className="cruBrand__label">Nhập email nhân viên:</Typography>
                    <TextField value={email} onChange={handleChangeEmail} disabled={id ? true : false}
                        size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
                </Stack>
                <Stack direction="row">
                    <Typography className="cruBrand__label">
                        Quyền hạn:
                    </Typography>
                    <FormControl className="create-address__input" sx={{flex:"1"}}>
                        <Select
                        size="small"
                        value={employeeRole}
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={handleChangeEmployeeRole}
                        >
                        {
                            id ? role.map(item => <MenuItem value={item?.id}>{item?.text}</MenuItem>) :
                            role.map(item => item?.id !== 0 ? <MenuItem value={item?.id}>{item?.text}</MenuItem> : null)
                        }
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row">
                    <Typography className="cruBrand__label">Lương:</Typography>
                    <TextField value={salary} onChange={handleChangeSalary}
                        size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
                </Stack>
                <Stack direction="row" display={'flex'} justifyContent={'space-between'}>
                    <Button variant="outlined" onClick={() => navigate('/admin/employee')}>Quay lại</Button>
                    <Button variant="outlined" onClick={handleUpdateRole}>Cập nhật quyền</Button>
                </Stack>
            </Stack>
        </Box>
    </>)
}

export default UpdateRoleEmployee