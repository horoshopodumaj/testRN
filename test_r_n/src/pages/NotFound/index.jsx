import React from "react";
import classes from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div>
            <h1 className={classes.title}>Вы перешли на страницу которой нет!</h1>
        </div>
    );
};

export default NotFound;
