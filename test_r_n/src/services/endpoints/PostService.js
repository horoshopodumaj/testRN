import { getData } from "../api/api";

const actions = {
    //получаем все посты с учетом limit и page
    getAllPosts: async (limit, page) => await getData("posts/", limit, page),
    //получаем пост по id
    getPostById: async (id) => await getData(`posts/${id}/`),
};
export default actions;
