import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TicketCard from "../../../Components/TicketCard/TicketCard";

const LatestTickets = () => {

  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], loading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latestTickets");
      return res.data;
    },
  });

 if(loading){
        return<div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

  return (
    <div className="bg-teal-50">
      <div className="w-11/12 mx-auto py-10">

      <h2 className="text-3xl font-bold text-center mb-10">
        Latest Tickets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {tickets.map(ticket => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
          />
        ))}

      </div>

    </div>
    </div>
  );
};

export default LatestTickets;
