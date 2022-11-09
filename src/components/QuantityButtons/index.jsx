import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, {  useState, useEffect } from "react";
import "./QuantityButtons.scss"

function QuantityButtons(props){
    const [count, setCounter] = useState(1);

    return (
        <ButtonGroup size="small" aria-label="small outlined button group" className="quantity-buttons">
            <Button onClick={() => {(count > 0) ? setCounter(count - 1) : setCounter(0)}}>-</Button>
            <Button >{count}</Button>
            <Button onClick={() => {setCounter(count + 1)}}>+</Button>
        </ButtonGroup>
    )
}

export default QuantityButtons;
