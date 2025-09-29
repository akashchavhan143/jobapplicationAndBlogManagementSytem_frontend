import axiosInstance from "../utils/AxiosInstance";

export const loginApi = async (values) => {
    try {
        const response = await axiosInstance.post("/auth/login", {
           username: values.username,
           password: values.password
        });
        console.log("login response", response.data.data);
        const token = response.data.data.token; // Access token from data
        const user = {
            username: response.data.data.username,
            email: response.data.data.email,
            role: response.data.data.role,
            id:response.data.data.id
        };
    
        return { token, user }; // Return structured data
    }
    catch (error) {
        console.error("Login failed:", error);
        throw error; // Propagate the error to be handled by the calling function
    }
};

export const registerApi = async (values) => {
    try {
        const response = await axiosInstance.post("/auth/register", values);
        return response.data;
    } catch (error) {
        console.error("Register failed:", error);
        throw error;
    }
};
