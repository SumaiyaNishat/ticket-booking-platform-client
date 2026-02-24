import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TicketCard from "../../../Components/TicketCard/TicketCard";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],

    queryFn: async () => {
      const res = await axiosSecure.get("/advertisedTickets");

      return res.data;
    },
  });

  if (isLoading)
    return <LoadingSpinner></LoadingSpinner>

  return (
   <div className="bg-teal-50 py-10">
     <div className="w-10/12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Advertisement</h2>
      <p className="text-center">
TicketBari – Your trusted platform for easy, fast, and secure ticket booking anytime, anywhere.
</p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
   </div>
  );
};

export default AdvertisementSection;
