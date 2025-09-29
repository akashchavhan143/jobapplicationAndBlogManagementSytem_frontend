import axiosInstance from "../utils/AxiosInstance";

export const getAllBlogs = async () => {
    try {
        const response = await axiosInstance.get('/blogs');
        return response.data;
    } catch (error) {
        console.error("Get all blogs failed:", error);
        throw error;
    }
};

export const getApprovedBlogs = async () => {
    try {
        const response = await axiosInstance.get('/blogs/approved');
        return response.data;
    } catch (error) {
        console.error("Get approved blogs failed:", error);
        throw error;
    }
};

export const getBlogById = async (id) => {
    try {
        const response = await axiosInstance.get(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get blog failed:", error);
        throw error;
    }
};

export const getBlogsByUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/blogs/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Get blogs by user failed:", error);
        throw error;
    }
};

export const createBlog = async (blog,userId) => {
    try {
        const response = await axiosInstance.post(`/blogs/create/${userId}`, blog);
        return response.data;
    } catch (error) {
        console.error("Create blog failed:", error);
        throw error;
    }
};

export const updateBlog = async (id, blog) => {
    try {
        const response = await axiosInstance.put(`/blogs/${id}`, blog);
        return response.data;
    } catch (error) {
        console.error("Update blog failed:", error);
        throw error;
    }
};

export const deleteBlog = async (id) => {
    try {
        await axiosInstance.delete(`/blogs/${id}`);
    } catch (error) {
        console.error("Delete blog failed:", error);
        throw error;
    }
};
