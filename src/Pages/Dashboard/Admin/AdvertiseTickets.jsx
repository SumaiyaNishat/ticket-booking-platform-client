import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],

    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");

      return res.data;
    },
  });

  const handleAdvertise = async (ticket) => {
    const res = await axiosSecure.patch(`/tickets/advertise/${ticket._id}`);

    if (res.data.success) {
      Swal.fire("Updated!", "Advertise status changed", "success");

      queryClient.invalidateQueries(["approvedTickets"]);
    } else {
      Swal.fire("Error", res.data.message, "error");
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Advertise Tickets</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>

            <th>Price</th>

            <th>Advertise</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>

              <td>{ticket.price}</td>

              <td>
                <button
                  onClick={() => handleAdvertise(ticket)}
                  className={`btn btn-sm ${
                    ticket.isAdvertised ? "btn-success" : "btn-outline"
                  }`}
                >
                  {ticket.isAdvertised ? "Unadvertise" : "Advertise"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseTickets;
