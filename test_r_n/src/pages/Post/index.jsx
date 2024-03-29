import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader/Loader";
import { useFetch } from "../../hooks/useFetch";
import { PostService } from "../../services";
import classes from "./Post.module.css";

const PostPage = () => {
    const { id } = useParams();

    const [post, setPost] = useState({});

    const [fetchPostById, isLoading] = useFetch(async (id) => {
        const [response] = await PostService.getPostById(id);
        setPost(response);
    });

    useEffect(() => {
        fetchPostById(id);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {isLoading ? (
                <div className={classes.loaderContainer}>
                    <Loader />
                </div>
            ) : (
                <div className={classes.page}>
                    <h3>Пост c id={id}</h3>
                    <strong>
                        {post?.id}. {post?.title}
                    </strong>
                    <div>{post?.body}</div>
                </div>
            )}
        </>
    );
};

export default PostPage;
