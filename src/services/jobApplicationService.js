import axiosInstance from "../utils/AxiosInstance";

export const getJobApplicationsByUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/job-applications/byUser?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Get job applications failed:", error);
        throw error;
    }
};

export const getJobApplicationById = async (id) => {
    try {
        const response = await axiosInstance.get(`/job-applications/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get job application failed:", error);
        throw error;
    }
};

export const createJobApplication = async (jobApplication,id) => {
    try {
        const response = await axiosInstance.post(`/job-applications/${id}`, jobApplication);
        return response.data;
    } catch (error) {
        console.error("Create job application failed:", error);
        throw error;
    }
};

export const updateJobApplication = async (id, jobApplication) => {
    try {
        const response = await axiosInstance.put(`/job-applications/${id}`, jobApplication);
        return response.data;
    } catch (error) {
        console.error("Update job application failed:", error);
        throw error;
    }
};

export const deleteJobApplication = async (id) => {
    try {
        await axiosInstance.delete(`/job-applications/${id}`);
    } catch (error) {
        console.error("Delete job application failed:", error);
        throw error;
    }
};
