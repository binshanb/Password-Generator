
import instance from "./api";

const register = async (formData) => {
  try {
    const response = await instance.post('/api/users/register/', {
      email: formData.email,
    //   phone_number: formData.mobileNumber,
      first_name: formData.first_name,
      password: formData.password,
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authService = {
  register,
};
