import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: "Your payment has been completed.",
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
        <h2 className="text-3xl font-bold text-green-600">
          Payment Successful
        </h2>

        <p className="mt-2">Redirecting to your booked tickets...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
