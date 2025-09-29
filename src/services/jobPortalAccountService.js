import axiosInstance from "../utils/AxiosInstance";

export const getAllJobPortalAccounts = async () => {
    try {
        const response = await axiosInstance.get('/job-portal-accounts');
        return response.data;
    } catch (error) {
        console.error("Get all job portal accounts failed:", error);
        throw error;
    }
};

export const getJobPortalAccountById = async (id) => {
    try {
        const response = await axiosInstance.get(`/job-portal-accounts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get job portal account failed:", error);
        throw error;
    }
};

export const getJobPortalAccountsByUser = async (username) => {
    try {
        const response = await axiosInstance.get(`/job-portal-accounts/user/${username}`);
        return response.data;
    } catch (error) {
        console.error("Get job portal accounts by user failed:", error);
        throw error;
    }
};

export const createJobPortalAccount = async (jobPortalAccount,userId) => {
    try {
        const response = await axiosInstance.post(`/job-portal-accounts/create/${userId}`, jobPortalAccount);
        return response.data;
    } catch (error) {
        console.error("Create job portal account failed:", error);
        throw error;
    }
};

export const updateJobPortalAccount = async (id, jobPortalAccount) => {
    try {
        const response = await axiosInstance.put(`/job-portal-accounts/${id}`, jobPortalAccount);
        return response.data;
    } catch (error) {
        console.error("Update job portal account failed:", error);
        throw error;
    }
};

export const deleteJobPortalAccount = async (id) => {
    try {
        await axiosInstance.delete(`/job-portal-accounts/${id}`);
    } catch (error) {
        console.error("Delete job portal account failed:", error);
        throw error;
    }
};
