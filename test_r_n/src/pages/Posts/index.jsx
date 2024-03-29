import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import Button from "../../components/common/Button/Button";
import Loader from "../../components/common/Loader/Loader";
import { useFetch } from "../../hooks/useFetch";
import { useObserver } from "../../hooks/useObserver";
import { PostService } from "../../services";
import classes from "./Posts.module.css";

export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
};

const PostsPage = () => {
    const lastElement = useRef(null);
    const pageScrollLimit = 5;
    const limit = 10;
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

    const [fetchPosts, isPostsLoading, postError] = useFetch(async (limit, page) => {
        const [response, total] = await PostService.getAllPosts(limit, page);
        setPosts([...posts, ...response]);
        setTotalPages(getPageCount(total, limit));
    });

    useObserver(lastElement, page < totalPages, isPostsLoading, () => setPage(page + 1), page >= pageScrollLimit);

    useEffect(() => {
        fetchPosts(limit, page);

        if (page === 1) return;

        setSearchParams({ page: page });
        // eslint-disable-next-line
    }, [page, limit]);

    // если не найдены посты
    if (!posts.length) {
        return <h1 className={classes.postsEmpty}>Посты не найдены</h1>;
    }

    return (
        <div className={classes.page}>
            {/* если произошла ошибка при запросе */}
            {postError && <h1>Произошла ошибка {postError}</h1>}

            {/* проходим по массиву постов  */}
            {posts.map((post) => (
                <PostItem key={post?.id} post={post} />
            ))}

            {/*отображаем элемент если есть посты и убираем элемент за которым следим после первых пяти раз */}
            {!!posts.length && page < pageScrollLimit && <div ref={lastElement} className={classes.lastElement}></div>}

            {/* показываем лоудер пока посты грузятся */}
            {isPostsLoading && (
                <div className={classes.loaderContainer}>
                    <Loader />
                </div>
            )}

            {/* показываем кнопку после первых пяти раз */}
            {page >= pageScrollLimit && (
                <div className={classes.btnContainer}>
                    <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                        Загрузить еще
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PostsPage;
