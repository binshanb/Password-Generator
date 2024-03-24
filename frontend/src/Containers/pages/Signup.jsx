import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateField } from '../utils/formValidation';
import { authService } from '../services/authService'; // Adjust the path accordingly
import instance from '../services/api';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    // mobileNumber: '',
    first_name: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const showToast = (message, type = 'error') => {
    toast[type](message, {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    const fieldErrors = validateField(name, value, formData);
    setValidationErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((name) => {
      const fieldErrors = validateField(name, formData[name], formData);
      if (Object.keys(fieldErrors).length > 0) {
        newErrors[name] = fieldErrors[name];
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      Object.values(newErrors).forEach((error) => showToast(error));
      return;
    }
    try {
      const response = await instance.post('/api/users/register/', {
        email: formData.email,
        first_name: formData.first_name,
        password: formData.password,
      });

      const data = response.data;

      // Handle the registration response
      if (response.status === 201) {
        // Registration successful
        console.log('Registration successful:', data);
        showToast('Registration successful', 'success');
      } else {
        // Registration failed
        console.error('Registration failed:', data);
        showToast('Registration failed: ' + data.error);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Registration failed:', error.message);
      showToast('Registration failed: ' + error.message);
    }

  }
  //   try {
  //     // Use authService to register user
  //     const response = await authService.register(formData);

  //     if (response.status === 201) {
  //       console.log('Registration successful:', response.data);
  //       showToast('Registration successful', 'success');
  //     } else {
  //       console.error('Registration failed:', response.data);
  //       showToast('Registration failed: ' + response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('Registration failed:', error.message);
  //     showToast('Registration failed: ' + error.message);
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-500">
    <div className="bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-semibold text-center mb-6">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleInputChange}
          />
          {validationErrors.email && <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>}
        </div>
        {/* <div className="mb-4">
          <input
            type="text"
            name="mobileNumber"
            placeholder="Enter Phone Number"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleInputChange}
          />
          {validationErrors.mobileNumber && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.mobileNumber}</p>
          )}
        </div> */}
        <div className="mb-4">
          <input
            type="text"
            name="first_name"
            placeholder="Enter Name"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleInputChange}
          />
          {validationErrors.first_name && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.first_name}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleInputChange}
          />
          {validationErrors.password && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleInputChange}
          />
          {validationErrors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.confirmPassword}</p>
          )}
        </div>
        <div className="mb-2 flex items-center">
          <input type="checkbox" className="mr-2" id="check" />
          <label htmlFor="check" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>
        <div className="mt-4">
          <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-md">
            Sign Up
          </button>
        </div>
        <p className="text-sm text-right mt-2">
          Already have an account? <Link to="/login" className="text-purple-700">Sign In</Link>
        </p>
      </form>
    </div>
  </div>
  );
}

export default Signup;
