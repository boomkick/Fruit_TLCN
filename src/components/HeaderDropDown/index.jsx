import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

HeaderDropdown.propTypes = {
  headerName: PropTypes.string.isRequired,
  dropdownItems: PropTypes.array,
};
export default function HeaderDropdown(props) {
  const [imageShow, setImageShow] = useState("");

  useEffect(() => {
    if (props.dropdownItems && props.dropdownItems.length > 0)
      setImageShow(props.dropdownItems[0].image);
  }, [props.dropdownItems]);

  return (
    <>
      <li className="header__leftElement-item">
        <Link to={"/"}>
          <Typography
            className="header__leftElement-main"
            sx={{
              fontSize: "14px",
              fontWeight: "700",
              position: "relative",
              paddingBottom: "5px",
              borderBottom: "3px solid transparent",
            }}
          >
            {props.headerName}
          </Typography>
        </Link>
        <div className="subnav subnav__dropdown">
          <ul>
            {props.dropdownItems && props.dropdownItems.length > 0
              ? props.dropdownItems.map((item) => (
                  <li onMouseEnter={() => setImageShow(item.image)}>
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                ))
              : null}
          </ul>
          <img className="subnav__dropdown-img" src={imageShow} alt="" />
        </div>
      </li>
    </>
  );
}
