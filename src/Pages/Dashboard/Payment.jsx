import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Payment = () => {

  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [booking, setBooking] = useState(null);

  useEffect(() => {

    if (!bookingId) return;

    axiosSecure
      .get(`/booking/${bookingId}`)
      .then(res => {
        setBooking(res.data);
      })
      .catch(err => {
        console.error(err);
      });

  }, [bookingId, axiosSecure]);


  const handleFakePayment = () => {

    axiosSecure.patch(`/bookings/pay/${bookingId}`, {
      ticketId: booking.ticketId,
      bookingQuantity: booking.bookingQuantity,
    })
    .then(res => {

      if (res.data.success) {

        Swal.fire(
          "Success",
          "Payment completed successfully",
          "success"
        );

      }

    });

  };


  if (!booking) {
    return <p className="text-center mt-10">Loading...</p>;
  }


  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold mb-4">
        Payment Page
      </h2>
    
    <div className="max-w-md mx-auto mt-10 card bg-base-100 shadow-xl p-6">

      

      <p>
        Ticket: {booking.ticketTitle}
      </p>

      <p>
        Quantity: {booking.bookingQuantity}
      </p>

      <p>
        Total: Tk {booking.unitPrice * booking.bookingQuantity}
      </p>

      <button
        onClick={handleFakePayment}
        className="btn btn-success mt-4"
      >
        Confirm Payment
      </button>

    </div>
    </div>
  );
};

export default Payment;
