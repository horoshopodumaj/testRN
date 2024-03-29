import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./PostItem.module.css";

const PostItem = ({ post }) => {
    const navigate = useNavigate();
    return (
        <div className={classes.post} onClick={() => navigate(`/post/${post.id}`)}>
            <div>
                <strong className={classes.title}>
                    {post.id}. {post.title}
                </strong>
                <div>{post.body}</div>
            </div>
        </div>
    );
};

export default PostItem;
