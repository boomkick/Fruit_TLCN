import "./Card.scss";
import Stack from "@mui/material/Stack";
import GroupsIcon from "@mui/icons-material/Groups";
import { Typography } from "@mui/material";
import { numWithCommas } from "../../constraints/Util";

export default function Card(props) {
  let iconColor = props.item.iconColor;
  return (
    <Stack className="card__item" key={props.item.id} direction="row">
      <Stack className="card__icon" bgcolor={props.item.bgcolor}>
        <GroupsIcon sx={{ fontSize: 40, color: iconColor }} />
      </Stack>
      <Stack alignItems="center" justifyContent="center">
        <Typography className="card__title">{props.item.title}</Typography>
        <Typography color="#2a2a2a" fontWeight={500}>
          {`${numWithCommas(props.item.value)} ${props.item.unit}`}
        </Typography>
      </Stack>
    </Stack>
  );
}
