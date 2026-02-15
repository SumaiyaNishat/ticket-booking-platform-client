import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
    return <div className="text-center mt-10">loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Actions</th>
            </tr>
          </thead>

          {/* body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>{user.name || user.displayName}</td>

                <td>{user.email}</td>

                {/* role badge */}
                <td>
                  <span
                    className={`badge
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

                {/* action buttons */}
                <td className="space-x-2">
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
