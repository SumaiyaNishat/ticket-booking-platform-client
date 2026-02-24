import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AllTickets from "../Pages/AllTickets/AllTickets";
import TicketsDetails from "../Pages/TicketsDetails/TicketsDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
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
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AdvertiseTickets from "../Pages/Dashboard/Admin/AdvertiseTickets";
import Revenue from "../Pages/Dashboard/Vendor/Revenue/Revenue";

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
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/addtickets",
        element: (
          <VendorRoute>
            <AddTickets></AddTickets>
          </VendorRoute>
        ),
      },
      {
        path: "/dashboard/myAddedTickets",
        element: (
          <VendorRoute>
            <MyAddedTickets></MyAddedTickets>
          </VendorRoute>
        ),
      },
      {
        path: "/dashboard/requestedBookings",
        element: (
          <VendorRoute>
            <RequestedBookings></RequestedBookings>
          </VendorRoute>
        ),
      },
      {
        path: "/dashboard/revenue",
        element: (
          <VendorRoute>
            <Revenue></Revenue>
          </VendorRoute>
        ),
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
        path: "/dashboard/manageTickets",
        element: (
          <AdminRoute>
            <ManageTickets></ManageTickets>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/advertiseTickets",
        element: (
          <AdminRoute>
            <AdvertiseTickets></AdvertiseTickets>
          </AdminRoute>
        ),
      },
    ],
  },
]);
