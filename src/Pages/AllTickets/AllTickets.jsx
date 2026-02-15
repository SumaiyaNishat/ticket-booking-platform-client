import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],

    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");

      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">All Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="card bg-base-100 shadow-lg">
            <figure>
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{ticket.title}</h2>

              <p>
                {ticket.from} → {ticket.to}
              </p>

              <p>Transport: {ticket.transportType}</p>

              <p>Price: Tk {ticket.price}</p>

              <p>Available: {ticket.quantity}</p>

              {/* perks */}
              <div className="flex flex-wrap gap-2">
                {ticket.perks?.map((perk, i) => (
                  <span key={i} className="badge badge-outline">
                    {perk}
                  </span>
                ))}
              </div>

              <Link to={`/ticket/${ticket._id}`}>
                <button className="btn btn-primary w-full mt-3">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
