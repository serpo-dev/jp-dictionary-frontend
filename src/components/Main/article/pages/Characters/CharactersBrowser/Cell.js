import React from "react";
import stylesheet from "./Cell.module.css";
import { NavLink } from "react-router-dom";

const Cell = (props) => {
    const path = `/characters/${[props.kanji.URI]}`;

    return (
        <NavLink to={path} className={stylesheet.box}>
            <div className={stylesheet.title}>{props.kanji.title}</div>
        </NavLink>
    );
};

export default Cell;
