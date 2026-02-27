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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

  <h2 className="text-2xl text-center sm:text-3xl font-bold mb-6">
    Advertise Tickets
  </h2>

  <div className="overflow-x-auto rounded-lg border border-base-300 bg-base-100">

    <table className="table table-zebra w-full text-sm">

      <thead className="bg-base-200">
        <tr>
          <th className="whitespace-nowrap">Title</th>
          <th className="whitespace-nowrap text-center hidden sm:table-cell">
            Price
          </th>
          <th className="whitespace-nowrap text-center">
            Advertise
          </th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket._id} className="hover">

            <td className="max-w-[200px] truncate">
              {ticket.title}
            </td>

           
            <td className="text-center hidden sm:table-cell">
              Tk {ticket.price}
            </td>

            
            <td className="text-center">
              <button
                onClick={() => handleAdvertise(ticket)}
                className={`btn btn-xs sm:btn-sm ${
                  ticket.isAdvertised
                    ? "btn-success"
                    : "btn-outline"
                }`}
              >
                {ticket.isAdvertised
                  ? "Unadvertise"
                  : "Advertise"}
              </button>
            </td>

          </tr>
        ))}
      </tbody>

    </table>

  </div>

</div>
  );
};

export default AdvertiseTickets;
