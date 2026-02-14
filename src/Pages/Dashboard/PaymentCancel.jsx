import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const PaymentCancel = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "Payment Cancelled",
      text: "Your payment was not completed.",
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      navigate("/dashboard/myBookedTickets");
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="card bg-base-100 shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-red-600">Payment Cancelled. Please try again.</h2>

        <p className="mt-2">Redirecting back...</p>
      </div>
    </div>
  );
};

export default PaymentCancel;
