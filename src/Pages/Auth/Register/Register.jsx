import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordShow, passwordSetShow] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        
        const formData = new FormData();
        formData.append("image", profileImg);
        const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
        axios.post(imageAPI_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          // create user in the database
          const userInfo = {
            email: data.email,
            name: data.name,
            photoURL: photoURL,
          }
          axiosSecure.post('/users', userInfo)
          .then(res =>{
            if(res.data.insertedId){
              console.log('user create in the database')
            }
          })

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              toast.success("Registration successful! Please login.");
              navigate(location.state || "/login");
            })
            .catch((error) => toast.error("Registration failed!"));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to TicketBari</h3>
      <p className="text-center">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 text-left">Name is required.</p>
          )}

          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your photo"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 text-left">Photo Url is required.</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
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
              className="input input-bordered"
              placeholder="Enter password"
            />
            <span
              onClick={() => passwordSetShow(!passwordShow)}
              className="absolute right-8 top-[34px] cursor-pointer"
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

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link className="text-blue-400 underline " to="/login">
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
