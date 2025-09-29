import axiosInstance from "../utils/AxiosInstance";

export const createBlogforEditor = async (formData,userId) => {
    try {
        const response = await axiosInstance.post('/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }})

        return response.data;
    } catch (error) {
        console.error("Create blog failed:", error);
        throw error;
    }
};

// Add this for image upload testing
export const uploadImageByFile = async (formData) => {
  try {
   
    
    const response = await axiosInstance.post('/blogs/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};