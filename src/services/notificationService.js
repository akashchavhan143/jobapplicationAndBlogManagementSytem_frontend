import axiosInstance from "../utils/AxiosInstance";

export const getAllNotifications = async () => {
    try {
        const response = await axiosInstance.get('/notifications');
        return response.data;
    } catch (error) {
        console.error("Get all notifications failed:", error);
        throw error;
    }
};

export const getNotificationById = async (id) => {
    try {
        const response = await axiosInstance.get(`/notifications/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get notification failed:", error);
        throw error;
    }
};

export const getNotificationsByUser = async (username) => {
    try {
        const response = await axiosInstance.get(`/notifications/user/${username}`);
        return response.data;
    } catch (error) {
        console.error("Get notifications by user failed:", error);
        throw error;
    }
};

export const getUnreadNotificationCountByUser = async (username) => {
    try {
        const response = await axiosInstance.get(`/notifications/user/${username}/unread-count`);
        return response.data;
    } catch (error) {
        console.error("Get unread notification count failed:", error);
        throw error;
    }
};

export const createNotification = async (notification) => {
    try {
        const response = await axiosInstance.post('/notifications', notification);
        return response.data;
    } catch (error) {
        console.error("Create notification failed:", error);
        throw error;
    }
};

export const updateNotification = async (id, notification) => {
    try {
        const response = await axiosInstance.put(`/notifications/${id}`, notification);
        return response.data;
    } catch (error) {
        console.error("Update notification failed:", error);
        throw error;
    }
};

export const deleteNotification = async (id) => {
    try {
        await axiosInstance.delete(`/notifications/${id}`);
    } catch (error) {
        console.error("Delete notification failed:", error);
        throw error;
    }
};
