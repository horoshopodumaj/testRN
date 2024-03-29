import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import classes from "./Header.module.css";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className={classes.header} onClick={() => navigate(-1)}>
            <Button>назад</Button>
        </div>
    );
};

export default Header;
