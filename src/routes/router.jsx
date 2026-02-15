import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AllTickets from "../Pages/AllTickets/AllTickets";
import TicketsDetails from "../Pages/TicketsDetails/TicketsDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Vendor from "../Pages/Dashboard/Vendor/Vendor/Vendor";
import AddTickets from "../Pages/Dashboard/Vendor/AddTickets/AddTickets";
import DashboardLayout from "../layouts/DashboardLayout";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddTickets/MyAddTickets";
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBookings/RequestedBookings";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets";

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
        path: "allTickets",
        element: <AllTickets></AllTickets>,
      },
      {
        path: "/ticket/:id",
        element: (
          <PrivateRoute>
            <TicketsDetails></TicketsDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "vendor",
        element: (
          <PrivateRoute>
            <Vendor></Vendor>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/addtickets",
        element: (
          <PrivateRoute>
            <AddTickets></AddTickets>
          </PrivateRoute>
        ),
        loader: () => fetch("/tickets.json").then((res) => res.json()),
      },
      {
        path: "/dashboard/myAddedTickets",
        element: <MyAddedTickets></MyAddedTickets>,
      },
      {
        path: "/dashboard/requestedBookings",
        element: <RequestedBookings></RequestedBookings>,
      },
      {
        path: "/dashboard/myBookedTickets",
        element: <MyBookedTickets></MyBookedTickets>,
      },
      {
        path: "payment/:bookingId",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-Cancel",
        element: <PaymentCancel></PaymentCancel>,
      },
      {
        path: "/dashboard/transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },
      {
        path:"/dashboard/manageTickets",
        element:<ManageTickets></ManageTickets>
      }
    ],
  },
]);
