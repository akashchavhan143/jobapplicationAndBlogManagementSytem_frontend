import axiosInstance from "../utils/AxiosInstance";

export const getAllBlogLikes = async () => {
    try {
        const response = await axiosInstance.get('/blog-likes');
        return response.data;
    } catch (error) {
        console.error("Get all blog likes failed:", error);
        throw error;
    }
};

export const getBlogLikeById = async (id) => {
    try {
        const response = await axiosInstance.get(`/blog-likes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get blog like failed:", error);
        throw error;
    }
};

export const getBlogLikeCountByBlog = async (blogId) => {
    try {
        const response = await axiosInstance.get(`/blog-likes/blog/${blogId}/count`);
        return response.data;
    } catch (error) {
        console.error("Get blog like count failed:", error);
        throw error;
    }
};

export const checkUserLikedBlog = async (blogId, username) => {
    try {
        const response = await axiosInstance.get(`/blog-likes/blog/${blogId}/user/${username}/exists`);
        return response.data;
    } catch (error) {
        console.error("Check user liked blog failed:", error);
        throw error;
    }
};

export const createBlogLike = async (blogLike) => {
    try {
        const response = await axiosInstance.post('/blog-likes', blogLike);
        return response.data;
    } catch (error) {
        console.error("Create blog like failed:", error);
        throw error;
    }
};

export const deleteBlogLikeById = async (id) => {
    try {
        await axiosInstance.delete(`/blog-likes/${id}`);
    } catch (error) {
        console.error("Delete blog like failed:", error);
        throw error;
    }
};

export const deleteBlogLikeByUserAndBlog = async (blogId, username) => {
    try {
        await axiosInstance.delete(`/blog-likes/blog/${blogId}/user/${username}`);
    } catch (error) {
        console.error("Delete blog like by user and blog failed:", error);
        throw error;
    }
};
