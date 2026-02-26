import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["allTickets"],

    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tickets");

      return res.data;
    },
  });

  // approve ticket
  const handleApprove = async (id) => {
    await axiosSecure.patch(`/tickets/approve/${id}`);

    Swal.fire("Approved!", "Ticket approved successfully", "success");

    refetch();
  };

  // reject ticket
  const handleReject = async (id) => {
    await axiosSecure.patch(`/tickets/reject/${id}`);

    Swal.fire("Rejected!", "Ticket rejected", "error");

    refetch();
  };

  return (
    <div className="p-4 sm:p-8 lg:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Manage Tickets</h2>

      <div className="overflow-x-auto rounded-lg border border-base-300 bg-base-100">
        <table className="table table-zebra w-full text-xs sm:text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>No</th>
              <th>Ticket</th>
              <th className="hidden md:table-cell">Vendor</th>
              <th className="text-center hidden sm:table-cell">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center hidden sm:table-cell">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id} className="hover">
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img src={ticket.image} alt="" />
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold truncate max-w-[140px]">
                        {ticket.title}
                      </div>
                      <div className="text-xs opacity-60">
                        {ticket.transportType}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="hidden md:table-cell">
                  <div>
                    <div className="font-medium truncate max-w-[150px]">
                      {ticket.vendorName}
                    </div>
                    <div className="text-xs opacity-60 truncate max-w-[150px]">
                      {ticket.vendorEmail}
                    </div>
                  </div>
                </td>

                <td className="text-center whitespace-nowrap hidden sm:table-cell">
                  Tk {ticket.price}
                </td>

                <td className="text-center">{ticket.quantity}</td>

                <td className="text-center hidden sm:table-cell">
                  <span
                    className={`badge badge-sm
                      ${
                        ticket.status === "approved"
                          ? "badge-success"
                          : ticket.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                      }
                    `}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(ticket._id)}
                      className="btn btn-success btn-xs"
                      disabled={ticket.status === "approved"}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(ticket._id)}
                      className="btn btn-error btn-xs"
                      disabled={ticket.status === "rejected"}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
