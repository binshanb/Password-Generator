import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar  from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import Routers from "./Containers/routes/Routers";

function App() {
  return (
    <div className="">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Navbar/>
    <Routers />

    <Footer />
    </div>
  );
}

export default App;
