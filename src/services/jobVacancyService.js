import axiosInstance from "../utils/AxiosInstance";

export const getAllJobVacancies = async () => {
    try {
        const response = await axiosInstance.get('/job-vacancies');
        return response.data;
    } catch (error) {
        console.error("Get all job vacancies failed:", error);
        throw error;
    }
};

export const getJobVacancyById = async (id) => {
    try {
        const response = await axiosInstance.get(`/job-vacancies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get job vacancy failed:", error);
        throw error;
    }
};

export const createJobVacancy = async (jobVacancy) => {
    try {
        const response = await axiosInstance.post('/job-vacancies', jobVacancy);
        return response.data;
    } catch (error) {
        console.error("Create job vacancy failed:", error);
        throw error;
    }
};

export const updateJobVacancy = async (id, jobVacancy) => {
    try {
        const response = await axiosInstance.put(`/job-vacancies/${id}`, jobVacancy);
        return response.data;
    } catch (error) {
        console.error("Update job vacancy failed:", error);
        throw error;
    }
};

export const deleteJobVacancy = async (id) => {
    try {
        await axiosInstance.delete(`/job-vacancies/${id}`);
    } catch (error) {
        console.error("Delete job vacancy failed:", error);
        throw error;
    }
};
