import React from "react";
import { FaShieldAlt, FaTicketAlt, FaHeadset, FaMoneyBillWave } from "react-icons/fa";

const Choose = () => {
  return (
    <div className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-5">

        <h2 className="text-3xl font-bold text-center mb-2">
          Why Choose TicketBari?
        </h2>
        <p className="text-center">
TicketBari offers a fast, secure, and user-friendly ticket booking experience. Users can easily find and book tickets,<br/> while vendors can manage and update ticket details through a powerful dashboard. 
</p>

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          
          <div className="bg-base-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-4xl text-teal-500 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">
              Secure Booking
            </h3>
            <p className="text-center text-gray-500">
              Your payments and personal data are fully protected with secure authentication and payment system.
            </p>
          </div>

          {/* Easy Ticket Booking */}
          <div className="bg-base-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaTicketAlt className="text-4xl text-teal-500 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">
              Easy Ticket Booking
            </h3>
            <p className="text-center text-gray-500">
              Book bus, train, launch or plane tickets easily with just few clicks anytime.
            </p>
          </div>

          {/* Trusted Vendors */}
          <div className="bg-base-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaMoneyBillWave className="text-4xl text-teal-500 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">
              Trusted Vendors
            </h3>
            <p className="text-center text-gray-500">
              All vendors are verified and approved by admin to ensure reliable service.
            </p>
          </div>

          {/* 24/7 Support */}
          <div className="bg-base-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaHeadset className="text-4xl text-teal-500 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">
              24/7 Customer Support
            </h3>
            <p className="text-center text-gray-500">
              Our support team is always ready to help you anytime.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Choose;