import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordShow, passwordSetShow] = useState(false);
  const { signInUser, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("after login", data);

    signInUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        setUser(result.user);

        const token = await result.user.getIdToken();
        localStorage.setItem("accessToken", token);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back to TicketBari!",
          timer: 1000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate(location?.state || "/");
        }, 2000);
      })

      .catch((error) => {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-4 sm:p-6">
      <h3 className="text-2xl text-center">Welcome Back TicketBari</h3>
      <p className="text-center">Please Login</p>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-left">Email is required</p>
          )}

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              type={passwordShow ? "text" : "password"}
              {...register("password", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter password"
            />

            <span
              onClick={() => passwordSetShow(!passwordShow)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {passwordShow ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-left">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password Must have at least one uppercase, at least one lowercase,
              at least one number, add at least one special character
            </p>
          )}

          <div className="flex">
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4 w-full">Login</button>
        </fieldset>
        <p>
          New to TicketBari{" "}
          <Link className="text-blue-400 underline" to="/register">
            Register
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
