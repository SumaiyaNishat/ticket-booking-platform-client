import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AllTickets from "../Pages/AllTickets/AllTickets";
import TicketsDetails from "../Pages/TicketsDetails/TicketsDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Vendor from "../Pages/Vendor/Vendor/Vendor";
import AddTickets from "../Pages/Vendor/AddTickets/AddTickets";
import DashboardLayout from "../layouts/DashboardLayout";
import MyAddedTickets from "../Pages/Vendor/MyAddTickets/MyAddTickets";


export const router = createBrowserRouter([
  {
    path: "/",
     element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path:"allTickets",
        element: <AllTickets></AllTickets>
      },
      {
        path:"/ticket/:id",
        element: <TicketsDetails></TicketsDetails>
      },
      {
        path: 'vendor',
        element:<PrivateRoute><Vendor></Vendor></PrivateRoute>
      }
      
    ]
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }

    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: '/dashboard/addtickets',
        element:<PrivateRoute><AddTickets></AddTickets></PrivateRoute>,
        loader: () => fetch("/tickets.json").then((res) => res.json()),
      },
      {
        path: '/dashboard/myAddedTickets',
        element: <MyAddedTickets></MyAddedTickets>
      }
      
    ]
  }
]);