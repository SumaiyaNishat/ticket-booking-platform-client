import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // get all users
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const res = await axiosSecure.get("/users");

      return res.data;
    },
  });

  // make admin
  const handleMakeAdmin = async (userId) => {
    const res = await axiosSecure.patch(`/users/${userId}/role`, {
      role: "admin",
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", "User is now Admin", "success");

      refetch();
    }
  };

  // make vendor
  const handleMakeVendor = async (userId) => {
    const res = await axiosSecure.patch(`/users/${userId}/role`, {
      role: "vendor",
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", "User is now Vendor", "success");

      refetch();
    }
  };

  // mark fraud
  const handleFraud = async (userId) => {
    const res = await axiosSecure.patch(`/users/${userId}/fraud`);

    if (res.data.modifiedCount > 0) {
      Swal.fire("Fraud Marked!", "Vendor marked as fraud", "warning");

      refetch();
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="px-3 sm:px-6 lg:px-10 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto rounded-lg border border-base-300 bg-base-100">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th className="hidden md:table-cell">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <th>{index + 1}</th>

                <td className="font-medium">{user.name || user.displayName}</td>

                <td className="hidden md:table-cell truncate max-w-[200px]">
                  {user.email}
                </td>

                <td className="text-center">
                  <span
                    className={`badge badge-sm
                  ${
                    user.role === "admin"
                      ? "badge-error"
                      : user.role === "vendor"
                        ? "badge-warning"
                        : "badge-info"
                  }
                `}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-success"
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </button>

                    <button
                      onClick={() => handleMakeVendor(user._id)}
                      className="btn btn-xs btn-primary"
                      disabled={user.role === "vendor"}
                    >
                      Make Vendor
                    </button>

                    {user.role === "vendor" && (
                      <button
                        onClick={() => handleFraud(user._id)}
                        className="btn btn-xs btn-error"
                      >
                        Mark Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
