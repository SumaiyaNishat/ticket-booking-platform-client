import React, { useEffect, useState } from "react";
import { FaBusAlt, FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive ? "bg-teal-500 text-white rounded-xl px-3 py-1" : "px-3 py-1";

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-teal-500 hover:bg-teal-300 rounded-xl" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allTickets"
          className={({ isActive }) =>
            isActive ? "bg-teal-500 hover:bg-teal-300 rounded-2xl" : ""
          }
        >
          All Tickets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "bg-teal-500 hover:bg-teal-300 rounded-2xl" : ""
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-200 shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-3">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-teal-600"
          >
            <FaBusAlt />
            TicketBari
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{links}</ul>
        </div>

        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="hidden md:block font-medium">
                  {user.displayName}
                </span>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-44 z-[100]"
              >
                <li>
                  <Link to="/dashboard/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                className="btn bg-teal-500 text-white rounded-full px-5"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn bg-teal-400 text-white rounded-full px-5 hidden sm:flex"
                to="/register"
              >
                Register
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-xl"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
