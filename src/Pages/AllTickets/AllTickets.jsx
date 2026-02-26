import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TicketCard from "../../Components/TicketCard/TicketCard";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  const [debouncedFrom, setDebouncedFrom] = useState("");
  const [debouncedTo, setDebouncedTo] = useState("");

  const [transportFilter, setTransportFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  const handleSearch = () => {
    setDebouncedFrom(fromSearch);
    setDebouncedTo(toSearch);

    setCurrentPage(1);
  };

  // fetch tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: [
      "tickets",
      debouncedFrom,
      debouncedTo,
      transportFilter,
      sortOrder,
    ],

    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets`);
       console.log(res.data);
      return res.data;
    },
  });

  const indexOfLast = currentPage * ticketsPerPage;
  const indexOfFirst = indexOfLast - ticketsPerPage;



const filteredTickets = tickets.filter((ticket) => {

  const fromMatch = debouncedFrom
    ? ticket.from?.toLowerCase().includes(debouncedFrom.toLowerCase())
    : true;

  const toMatch = debouncedTo
    ? ticket.to?.toLowerCase().includes(debouncedTo.toLowerCase())
    : true;

  const transportMatch = transportFilter
    ? ticket.transportType === transportFilter
    : true;

  return fromMatch && toMatch && transportMatch;

});


const sortedTickets = [...filteredTickets].sort((a, b) => {

  if (sortOrder === "low") {
    return Number(a.price) - Number(b.price);
  }

  if (sortOrder === "high") {
    return Number(b.price) - Number(a.price);
  }

  return 0;

});

const currentTickets = sortedTickets.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(sortedTickets.length / ticketsPerPage);

  // loading spinner
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-5">All Tickets</h2>

      <div className="flex gap-2 justify-between items-center pt-10">
        <p className="font-bold">Tickets available: {tickets.length}</p>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered"
        >
          <option value="">Sort by price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div className="flex justify-between mt-5 mb-5">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="From"
            value={fromSearch}
            onChange={(e) => setFromSearch(e.target.value)}
            className="input input-bordered"
          />

          <input
            type="text"
            placeholder="To"
            value={toSearch}
            onChange={(e) => setToSearch(e.target.value)}
            className="input input-bordered"
          />

          <button onClick={handleSearch} className="btn bg-teal-600 text-white">
            Search
          </button>
        </div>
        <div>
          <select
            value={transportFilter}
            onChange={(e) => {
              setTransportFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-bordered"
          >
            <option value="">All Transport</option>

            <option value="Bus">Bus</option>

            <option value="Train">Train</option>

            <option value="Plane">Plane</option>

            <option value="Launch">Launch</option>
          </select>
        </div>
      </div>

      {/* tickets */}
      <div className="grid md:grid-cols-4 gap-4">
        {currentTickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number + 1)}
            className={`btn btn-sm ${
              currentPage === number + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
