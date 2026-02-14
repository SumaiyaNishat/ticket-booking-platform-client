import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const RequestedBookings = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();


  const { data: bookings = [], loading } = useQuery({

    queryKey: ["requestedBookings", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {

      const res = await axiosSecure.get(
        `/bookings?vendorEmail=${user.email}`
      );

      return res.data;

    }

  });


  const handleAccept = (id) => {

    axiosSecure.patch(`/bookings/accept/${id}`)
      .then(res => {

        if (res.data.modifiedCount > 0) {

          queryClient.invalidateQueries(["requestedBookings"]);

          Swal.fire(
            "Success",
            "Booking Accepted",
            "success"
          );

        }

      });

  };


  const handleReject = (id) => {

    axiosSecure.patch(`/bookings/reject/${id}`)
      .then(res => {

        if (res.data.modifiedCount > 0) {

          queryClient.invalidateQueries(["requestedBookings"]);

          Swal.fire(
            "Success",
            "Booking Rejected",
            "success"
          );

        }

      });

  };


  if (loading) {

    return <p className="text-center mt-10">Loading...</p>;

  }


  return (

    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        Requested Bookings
      </h2>


      <div className="overflow-x-auto">

        <table className="table table-zebra">

          <thead>
            <tr>
              <th>User Email</th>
              <th>Ticket Title</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>

            {bookings.map(booking => (

              <tr key={booking._id}>

                <td>
                  {booking.userEmail}
                </td>

                <td>
                  {booking.ticketTitle}
                </td>

                <td>
                  {booking.bookingQuantity}
                </td>

                <td>
                  Tk {booking.unitPrice * booking.bookingQuantity}
                </td>

                <td>

                  <span className={`
                    badge
                    ${booking.status === "pending" && "badge-warning"}
                    ${booking.status === "accepted" && "badge-success"}
                    ${booking.status === "rejected" && "badge-error"}
                  `}>
                    {booking.status}
                  </span>

                </td>


                <td>

                  {booking.status === "pending" && (

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleAccept(booking._id)}
                        className="btn btn-success btn-sm"
                      >
                        Accept
                      </button>


                      <button
                        onClick={() => handleReject(booking._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>

                    </div>

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
