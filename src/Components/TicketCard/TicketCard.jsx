import React from "react";
import { Link } from "react-router";

const TicketCard = ({ ticket }) => {
  const { _id, image, title, from, to, price, quantity, transportType, perks } =
    ticket || {};

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={image}
        alt={title}
        className="h-48 w-full p-3 rounded-xl object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg text-center  font-semibold mb-1">{title}</h3>

        <div className="flex justify-between gap-4 py-2">
          <p>
            <span className="font-semibold">From: </span>
            {from}
          </p>
          <p>
            <span className="font-semibold ">To: </span>
            {to}
          </p>
        </div>

        <p className="mb-2"><span className="font-semibold">TransportType: </span>
           {transportType}
        </p>

        
          <p className="text-sm mb-1">
          Price: <span className="font-semibold">Tk {price}</span> / ticket
        </p>

        <p className="text-sm mb-4">Available: {quantity}</p>
       

        <div className="flex flex-wrap gap-2 mb-4">
          {perks?.map((perk, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
              {perk}
            </span>
          ))}
        </div>

        <Link to={`/ticket/${_id}`} className="mt-auto">
          <button className="w-full py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-400 cursor-pointer transition">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
