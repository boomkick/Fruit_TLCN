import { Button, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function User() {
    const navigate = useNavigate()
    return (<>
        <Stack p={3} bgcolor="#fff">
             <Typography fontSize="26px">Quản lí người dùng</Typography>
             <Stack direction="row" spacing="2rem" p={2} alignItems="center">
                <Typography>Cập nhật vai trò người dùng</Typography>
                <Button variant="contained" style={{padding: "7px 10px"}} onClick={() => navigate("update-role/")}>Cập nhật</Button>
             </Stack>
        </Stack>
    </>)
}

export default User