import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        if (!bookingId) {
          Swal.fire("Error", "Booking ID missing", "error");

          navigate("/dashboard/myBookedTickets");
          return;
        }

        const res = await axiosSecure.patch(`/bookings/pay/${bookingId}`);

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your ticket has been confirmed.",
            timer: 2000,
            showConfirmButton: false,
          });

          // redirect after 2 seconds
          setTimeout(() => {
            navigate("/dashboard/myBookedTickets");
          }, 2000);
        }
      } catch (error) {
        console.error(error);

        Swal.fire("Error", "Payment update failed", "error");
      } finally {
        setLoading(false);
      }
    };

    updatePaymentStatus();
  }, [bookingId, axiosSecure, navigate]);

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="card bg-base-100 shadow-xl p-8 text-center">
        {loading ? (
          <>
            <span className="loading loading-spinner loading-lg"></span>

            <p className="mt-4 text-lg">Confirming your payment...</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful
            </h2>

            <p className="mt-2">Redirecting to your bookings...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
