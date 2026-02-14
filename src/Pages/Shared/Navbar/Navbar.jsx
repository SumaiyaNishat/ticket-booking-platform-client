import React from "react";
import { FaBusAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-yellow-200 hover:bg-yellow-300 rounded-xl" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allTickets"
          className={({ isActive }) =>
            isActive ? "bg-yellow-200 hover:bg-yellow-300 rounded-2xl" : ""
          }
        >
          All Tickets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "bg-yellow-200 hover:bg-yellow-300 rounded-2xl" : ""
          }
        >
          Dashboard
        </NavLink>
      </li>

    </>
  );
  return (
    <div className="navbar bg-base-200 shadow-sm mb-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          <FaBusAlt className="text-2xl " />
          <Link to="/" className="text-2xl  text-teal-600 font-bold">
            TicketBari
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src={user.photoURL} className="w-8 h-8 rounded-full" />
              <span>{user.displayName}</span>
            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 shadow rounded w-40 mt-2"
            >
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn rounded-4xl bg-teal-300 text-white">
            Login
          </Link>
        )}

        {!user && (
          <Link
            to="/register"
            className="btn rounded-4xl bg-teal-400 text-white"
          >
            Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
