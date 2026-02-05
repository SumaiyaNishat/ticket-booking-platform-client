import React from 'react'

import { Link } from "react-router";

const TicketCard = ({ ticket }) => {
  const {
    _id,
    image,
    title,
    price,
    quantity,
    transportType,
    perks
  } = ticket || {};

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src=""
        alt=""
        className="h-48 w-full object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1"></h3>

        <p className="text-sm text-gray-500 mb-2">
          Transport: <span className="font-medium"></span>
        </p>

        <p className="text-sm mb-1">
          Price: <span className="font-semibold">tk 500</span> / ticket
        </p>

        <p className="text-sm mb-3">
          Available: 50
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {perks?.map((perk, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-gray-100 rounded"
            >
              {perk}
            </span>
          ))}
        </div>

        <Link to={`/ticket/${_id}`} className="mt-auto">
          <button className="w-full py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
