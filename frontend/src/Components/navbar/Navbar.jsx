import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = true;
  const { userInfo } = useSelector((state) => state.auth);

  const handleNav = () => {
    setNav(!nav);
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

  const handleLogout = () => {
    dispatch(logout());
    showToast("Logout successfully", "success");
  };

  // Array containing navigation items
  const navItems = [{ id: 1, text: "Home" }];

  return (
    <div className="bg-purple-200 flex justify-between items-center h-16 max-w-[1240px] mx-auto px-4 text-gray-700">



      {/* Logo */}
      <div>
        {" "}
        <h1 className="w-full text-3xl font-bold text-[black]">
          Password Generator
        </h1>
      </div>

      {/* Mobile Navigation Icon */}
 
      {/* Mobile Navigation Toggle */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-4">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="hover:bg-purple-600 rounded-xl px-4 py-2 cursor-pointer duration-300 hover:text-black"
          >
            {item.text}
          </li>
        ))}
        {userInfo ? (
          <li>
            <button
              className="logout-buttons rounded-lg px-4 py-2 hover:bg-purple-600 duration-300 hover:text-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="border-b border-gray-600 hover:bg-purple-600 duration-300 hover:text-black px-4 py-2 rounded-xl"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "absolute top-0 left-0 w-[60%] h-full bg-[#000300] border-r border-gray-900 transition-all duration-500"
            : "absolute top-0 left-full -ml-60% transition-all duration-500"
        }
      >
        {/* Mobile Logo */}
        <h1 className="text-3xl font-bold text-[#00df9a] mx-4 my-6 md:hidden">
          Password Generator
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="hover:bg-[#00df9a] rounded-xl px-4 py-2 cursor-pointer duration-300 hover:text-black border-b border-gray-600"
          >
            {item.text}
          </li>
        ))}
        {userInfo ? (
          <li>
            <button
              className="hover:bg-[#00df9a] rounded-xl px-4 py-2 cursor-pointer duration-300 hover:text-black border-b border-gray-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="hover:bg-[#00df9a] rounded-xl px-4 py-2 cursor-pointer duration-300 hover:text-black border-b border-gray-600"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
