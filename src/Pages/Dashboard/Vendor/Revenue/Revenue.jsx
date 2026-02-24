import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TbMoneybag } from "react-icons/tb";
import { FaTicketSimple } from "react-icons/fa6";
import { LuTicketCheck } from "react-icons/lu";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import LoadingSpinner from "../../../../Components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";

const Revenue = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["vendorRevenue"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/vendor/revenue-overview");

      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const chartData = [
    {
      name: "Overview",
      Revenue: data.totalRevenue || 0,
      Sold: data.totalTicketsSold || 0,
      Added: data.totalTicketsAdded || 0,
    },
  ];

  return (
    <div className="p-6 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-6">Revenue Overview</h2>

      {/* cards */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow p-5">
          <div className="flex items-center gap-1 text-lg">
            <TbMoneybag />
            <h3 className="text-xl">Total Revenue</h3>
          </div>
          <p className="text-xl font-bold">Tk {data.totalRevenue || 0}</p>
        </div>

        <div className="card bg-gradient-to-l from-sky-300 to-teal-600 text-white shadow p-4">
          <div className="flex items-center gap-1 text-lg">
            <FaTicketSimple />
            <h3 className="text-xl">Total Tickets Sold</h3>
          </div>
          <p className="text-2xl font-bold">{data.totalTicketsSold || 0}</p>
        </div>

        <div className="card bg-gradient-to-r from-orange-400 to-teal-500 text-white shadow p-4">
          <div className="flex items-center gap-1 text-lg">
            <LuTicketCheck />
            <h3 className="text-xl">Total Tickets Added</h3>
          </div>
          <p className="text-2xl font-bold">{data.totalTicketsAdded || 0}</p>
        </div>
      </div>

      <div className="card bg-base-100 shadow p-4">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                color: "#fff",
                borderRadius: "8px",
                border: "none",
              }}
            />

            <Bar dataKey="Revenue" fill="#14b8a6" radius={[10, 10, 0, 0]} />

            <Bar dataKey="Sold" fill="#3b82f6" radius={[10, 10, 0, 0]} />

            <Bar dataKey="Added" fill="#f59e0b" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Revenue;
