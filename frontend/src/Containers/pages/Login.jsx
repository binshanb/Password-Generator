import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../services/api";
import { setCredentials } from "../../redux/userSlice";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {

    // Add your condition here
    const shouldNavigate = userInfo;

    if (shouldNavigate) {
      console.log("Navigating to home");
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const showToast = (message, type = "error") => {
    toast[type](message, {
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post(`/api/users/token/`, formData);

      try {
        // Decoding access token
        const decodedAccessToken = jwtDecode(res.data.access);

        dispatch(
          setCredentials({ user_id: decodedAccessToken.user_id, ...res.data })
        );
        showToast("Login Successful",'success')
        navigate("/tutor/lives");

      } catch (decodeError) {
        console.error("Error decoding token:", decodeError.message);
        showToast("Error decoding token", "error");
      }
    } catch (error) {
      console.error("API request error:", error);
      showToast(
        error?.response?.data || error.error || "Error in API request",
        "error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-500">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h3 className="text-2xl font-semibold text-center mb-6">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border rounded-md"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border rounded-md"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2 flex items-center">
            <input type="checkbox" className="mr-2" id="check" />
            <label htmlFor="check" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-md"
            >
              Sign In
            </button>
          </div>
          <p className="text-sm text-right mt-2">
            Create an account?{" "}
            <Link to="/signup" className="text-purple-700">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
