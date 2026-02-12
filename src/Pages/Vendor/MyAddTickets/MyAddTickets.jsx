import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdBrowserUpdated } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["myAddedTickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets?vendorEmail=${user.email}`);
      return res.data;
    },
  });

  const handleTicketDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/ticket/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount > 0) {
            queryClient.invalidateQueries(["myAddedTickets", user?.email]);

            Swal.fire({
              title: "Deleted!",
              text: "Ticket deleted successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="ml-5">
      <h2 className="text-2xl font-bold mb-6">My Added Tickets</h2>

      <h2 className="text-2xl font-bold mb-6 text-left ">
        All of my added tickets : {tickets.length}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="card bg-base-100 shadow-sm w-96 rounded p-4 "
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="text-lg font-semibold mt-2">{ticket.title}</h3>

            <p className="flex justify-center items-center gap-2">
              <span className="font-semibold">From: </span>
              {ticket.from} <FaArrowRight className="w-3" />{" "}
              <span className="font-semibold">To: </span>
              {ticket.to}
            </p>
            <p>
              <span className="font-semibold px-2">TransportType:</span>
              {ticket.transportType}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {ticket.perks?.map((perk, i) => (
                <span key={i} className="badge badge-outline">
                  {perk}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <p>
                <span className="font-semibold">Price:</span> Tk {ticket.price}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span
                  className={`badge ${
                    ticket.status === "pending"
                      ? "badge-warning"
                      : ticket.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                  }`}
                >
                  {ticket.status}
                </span>
              </p>
            </div>

           
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-sm bg-blue-400"
                disabled={ticket.status === "rejected"}
              >
                <MdBrowserUpdated />
                Update
              </button>

              <button
                onClick={() => handleTicketDelete(ticket._id)}
                className="btn btn-sm bg-red-400"
                disabled={ticket.status === "rejected"}
              >
                <TiDelete />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedTickets;
