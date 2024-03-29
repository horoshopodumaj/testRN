import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import classes from "./Header.module.css";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
        if (!location?.pathname.includes("/post")) return;
        navigate(-1);
    };
    return (
        <div className={classes.header} onClick={goBack}>
            <Button>назад</Button>
        </div>
    );
};

export default Header;
