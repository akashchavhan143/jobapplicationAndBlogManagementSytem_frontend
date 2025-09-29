import axiosInstance from "../utils/AxiosInstance";

export const getUserByUsername = async (username) => {
    try {
        const response = await axiosInstance.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error("Get user failed:", error);
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const response = await axiosInstance.post('/users', user);
        return response.data;
    } catch (error) {
        console.error("Create user failed:", error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        console.error("Get all users failed:", error);
        throw error;
    }
};

export const updateUser = async (id, user) => {
    try {
        const response = await axiosInstance.put(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        console.error("Update user failed:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete user failed:", error);
        throw error;
    }
};
