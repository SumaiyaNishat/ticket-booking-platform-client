import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["allTickets"],

    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");

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
    <div className="overflow-x-auto">
      <h2 className="text-3xl font-bold mb-4">Manage Tickets</h2>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Ticket</th>
            <th>Vendor</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <th>{index + 1}</th>

              {/* ticket info */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={ticket.image} alt="" />
                    </div>
                  </div>

                  <div>
                    <div className="font-bold">{ticket.title}</div>

                    <div className="text-sm opacity-50">
                      {ticket.transportType}
                    </div>
                  </div>
                </div>
              </td>

              {/* vendor */}
              <td>
                <div>
                  <div className="font-bold">{ticket.vendorName}</div>

                  <div className="text-sm opacity-50">{ticket.vendorEmail}</div>
                </div>
              </td>

              <td>Tk {ticket.price}</td>

              <td>{ticket.quantity}</td>

              <td>
                <span
                  className={`badge
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

              <td className="space-x-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTickets;
