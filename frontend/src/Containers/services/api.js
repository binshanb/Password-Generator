import axios from "axios";
import { baseUrl } from "../utils/urls";

const token = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).access
    : null;
const instance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;