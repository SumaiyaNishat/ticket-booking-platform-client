import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyBookedTickets = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], loading } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myBookings?userEmail=${user.email}`
      );
      return res.data;
    },
  });

  const handlePayment = (booking) => {

    const isExpired =
      new Date(`${booking.departureDate}T${booking.departureTime}`) < new Date();

    if (isExpired) {
      Swal.fire("Error", "Departure time already passed", "error");
      return;
    }

  };

  return (
    <div className="container mx-auto py-10 px-4">

      <h2 className="text-3xl font-bold mb-8">
        My Booked Tickets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {bookings.map((booking) => {

          const isExpired =
            new Date(`${booking.departureDate}T${booking.departureTime}`) < new Date();

          const showCountdown =
            booking.status !== "rejected" && !isExpired;

          return (
            <div key={booking._id} className="card bg-base-100 shadow-xl">

              <figure>
                <img
                  src={booking.image}
                  alt={booking.ticketTitle}
                  className="h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body">

                <h2 className="card-title">
                  {booking.ticketTitle}
                </h2>

                <p className="font-semibold">
                 From: <span>{booking.from}</span> To: <span>{booking.to}</span>
                </p>

                <p>
                  Departure: {booking.departureDate} at {booking.departureTime}
                </p>

                <p>
                  Quantity: {booking.bookingQuantity}
                </p>

                <p>
                  Total: Tk {booking.unitPrice * booking.bookingQuantity}
                </p>

                {/* Status */}
                <div>
                  <span className={`badge
                    ${booking.status === "pending" && "badge-warning"}
                    ${booking.status === "accepted" && "badge-info"}
                    ${booking.status === "rejected" && "badge-error"}
                    ${booking.status === "paid" && "badge-success"}
                  `}>
                    {booking.status}
                  </span>
                </div>

                {showCountdown && (
                  <div className="text-sm text-gray-500">
                    Departure Soon...
                  </div>
                )}

                {/* Pay Button */}
                {booking.status === "accepted" && !isExpired && (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="btn btn-primary mt-4"
                  >
                    Pay Now
                  </button>
                )}

                {booking.status === "rejected" && (
                  <p className="text-red-500 mt-2">
                    Booking was rejected by vendor.
                  </p>
                )}

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default MyBookedTickets;
