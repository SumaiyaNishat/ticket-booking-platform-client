import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TicketCard from "../../../Components/TicketCard/TicketCard";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

const LatestTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latestTickets");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="bg-teal-50">
      <div className="w-11/12 mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-2">Latest Tickets</h2>
        <p className="text-gray-600 text-center">
          Browse the latest tickets added by vendors and book your journey
          quickly and securely with TicketBari.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestTickets;
