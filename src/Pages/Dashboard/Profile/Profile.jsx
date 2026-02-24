import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["profile", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user.email}`);

      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="pt-6">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title">{profile?.name || user?.displayName}</h2>

          <p>{profile?.email}</p>

          <div className="badge bg-teal-700 text-white mt-2">Role: {profile?.role}</div>

         
        </div>
      </div>
    </div>
  );
};

export default Profile;
