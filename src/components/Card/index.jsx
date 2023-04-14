import "./Card.scss";
import Stack from "@mui/material/Stack";
import GroupsIcon from "@mui/icons-material/Groups";
import { Typography } from "@mui/material";
import { numWithCommas } from "../../constraints/Util";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import PaidIcon from "@mui/icons-material/Paid";
import React from "react";

export default function Card(props) {
  let iconColor = props.item.iconColor;
  const getIcon = React.useCallback(() => {
    switch(props.item.id){
      case 1:
        return (<GroupsIcon sx={{ fontSize: 40, color: iconColor }} />)
      case 2:
        return (<InventoryIcon sx={{ fontSize: 30, color: iconColor }} />)
      case 3:
        return (<DescriptionIcon sx={{ fontSize: 30, color: iconColor }} />)
      case 4:
        return (<PaidIcon sx={{ fontSize: 30, color: iconColor }} />)
      default:
        return <GroupsIcon sx={{ fontSize: 40, color: iconColor }} />
    }
  }, [props.item])
  return (
    <Stack className="card__item" key={props.item.id} direction="row">
      <Stack className="card__icon" bgcolor={props.item.bgcolor}>
        {getIcon()}
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
