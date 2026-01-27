import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AllTickets from "../Pages/AllTickets/AllTickets"

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
      }
      
    ]
  },
]);