import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Payment = () => {
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // load booking info
  useEffect(() => {
    axiosSecure
      .get(`/booking/${bookingId}`)
      .then((res) => {
        setBooking(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [bookingId, axiosSecure]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await axiosSecure.post("/create-checkout-session", {
        bookingId: booking._id,
        ticketId: booking.ticketId,
        ticketTitle: booking.ticketTitle,
        bookingQuantity: booking.bookingQuantity,
        unitPrice: booking.unitPrice,
        userEmail: booking.userEmail,
      });

      // redirect to Stripe hosted page
      window.location.replace(res.data.url);
    } catch (error) {
      console.error(error);

      Swal.fire("Error", "Payment session failed", "error");
    }

    setLoading(false);
  };

  if (!booking) {
    return <p className="text-center mt-10">Loading payment info...</p>;
  }

  const total = booking.unitPrice * booking.bookingQuantity;

  return (
    <div className="max-w-md mx-auto mt-10 card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold">Payment Page</h2>

        <p>
          Ticket: <strong>{booking.ticketTitle}</strong>
        </p>

        <p>
          Route: {booking.from}
          {" → "}
          {booking.to}
        </p>

        <p>Quantity: {booking.bookingQuantity}</p>

        <p className="text-lg font-semibold">Total Amount: Tk {total}</p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="btn btn-primary mt-4"
        >
          {loading ? "Redirecting..." : "Confirm Payment"}
        </button>

        <button
          onClick={() => navigate("/dashboard/myBookedTickets")}
          className="btn btn-outline mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Payment;
