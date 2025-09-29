import axiosInstance from "../utils/AxiosInstance";

export const getAllBlogComments = async () => {
    try {
        const response = await axiosInstance.get('/blog-comments');
        return response.data;
    } catch (error) {
        console.error("Get all blog comments failed:", error);
        throw error;
    }
};

export const getBlogCommentById = async (id) => {
    try {
        const response = await axiosInstance.get(`/blog-comments/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get blog comment failed:", error);
        throw error;
    }
};

export const getBlogCommentsByBlog = async (blogId) => {
    try {
        const response = await axiosInstance.get(`/blog-comments/blog/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Get blog comments by blog failed:", error);
        throw error;
    }
};

export const getBlogCommentsByUser = async (username) => {
    try {
        const response = await axiosInstance.get(`/blog-comments/user/${username}`);
        return response.data;
    } catch (error) {
        console.error("Get blog comments by user failed:", error);
        throw error;
    }
};

export const createBlogComment = async (blogComment) => {
    try {
        const response = await axiosInstance.post('/blog-comments', blogComment);
        return response.data;
    } catch (error) {
        console.error("Create blog comment failed:", error);
        throw error;
    }
};

export const updateBlogComment = async (id, blogComment) => {
    try {
        const response = await axiosInstance.put(`/blog-comments/${id}`, blogComment);
        return response.data;
    } catch (error) {
        console.error("Update blog comment failed:", error);
        throw error;
    }
};

export const deleteBlogComment = async (id) => {
    try {
        await axiosInstance.delete(`/blog-comments/${id}`);
    } catch (error) {
        console.error("Delete blog comment failed:", error);
        throw error;
    }
};
