import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import Login from "../pages/Login";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import UpdateBlog from "../pages/UpdateBlog";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const AppRouter = () => {

  const { currentUser } = useContext(AuthContext);
  function PrivateRouter() {
    let location = useLocation();
    if (!currentUser) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
  }

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element ={<Dashboard/>} />
        <Route path="/login" element ={<Login/>} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRouter />}>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/NewBlog/:id" element ={<NewBlog />} />
          <Route path="/Profile/:id" element ={<Profile />} />
          <Route path="/UpdateBlog/:id" element ={<UpdateBlog />} />
        </Route>

       </Routes>

    </Router>
  );
};

export default AppRouter;
