import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: '/profile',
    element: <Profile />
  }
]);

const App = () => {
  return (
    <div className="font-nunito flex-col">
      <div className="flex-1">
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
