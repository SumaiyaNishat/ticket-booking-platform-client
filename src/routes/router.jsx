import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AllTickets from "../Pages/AllTickets/AllTickets";
import TicketsDetails from "../Pages/TicketsDetails/TicketsDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";


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
  }
]);