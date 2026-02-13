import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const RequestedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [] } = useQuery({
    queryKey: ["vendorBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?vendorEmail=${user.email}`);
      return res.data;
    },
  });

  const handleUpdateStatus = (id, status) => {
    axiosSecure.patch(`/bookings/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount > 0) {
        queryClient.invalidateQueries(["vendorBookings", user?.email]);

        Swal.fire({
          icon: "success",
          title: `Booking ${status}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Ticket</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  <p className="font-semibold">{booking.userName}</p>
                  <p className="text-sm text-gray-500">{booking.userEmail}</p>
                </td>

                <td>{booking.ticketTitle}</td>

                <td>{booking.bookingQuantity}</td>

                <td>Tk {booking.unitPrice * booking.bookingQuantity}</td>

                <td>
                  <span
                    className={`badge
                    ${booking.status === "pending" && "badge-warning"}
                    ${booking.status === "accepted" && "badge-success"}
                    ${booking.status === "rejected" && "badge-error"}
                  `}
                  >
                    {booking.status}
                  </span>
                </td>

                <td>
                  {booking.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleUpdateStatus(booking._id, "accepted")
                        }
                        className="btn btn-xs btn-success"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateStatus(booking._id, "rejected")
                        }
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">Action Completed</span>
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

export default RequestedBookings;
