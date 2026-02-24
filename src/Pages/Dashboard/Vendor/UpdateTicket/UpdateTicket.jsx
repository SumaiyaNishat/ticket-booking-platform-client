import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../Components/LoadingSpinner/LoadingSpinner";

const UpdateTicket = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  // fetch ticket data
  const { data: ticket = {}, isLoading } = useQuery({
    queryKey: ["ticket", id],

    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);

      reset(res.data);

      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  
  const onSubmit = async (data) => {
    const res = await axiosSecure.patch(`/ticket/${id}`, data);

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Ticket Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/dashboard/myAddedTickets");
    }
  };

  return (
    <div className="bg-teal-50 p-5">
      <div className="max-w-xl mx-auto p-6 card bg-base-100 shadow rounded">
        <h2 className="text-2xl text-center font-bold mb-4">Update Ticket</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="label font-semibold">Ticket Title</label>
            <input
              {...register("title")}
              className="input input-bordered w-full"
              placeholder="Enter ticket title"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label font-semibold">From (Location)</label>
              <input
                {...register("from")}
                className="input input-bordered w-full"
                placeholder="From"
              />
            </div>

            <div>
              <label className="label font-semibold">To (Location)</label>
              <input
                {...register("to")}
                className="input input-bordered w-full"
                placeholder="To"
              />
            </div>
          </div>

          <div>
            <label className="label font-semibold">Transport Type</label>
            <select
              {...register("transportType")}
              className="select select-bordered w-full"
            >
              <option value="">Select Transport</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
              <option value="Plane">Plane</option>
            </select>
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label font-semibold">Price (per unit)</label>
              <input
                {...register("price")}
                type="number"
                className="input input-bordered w-full"
                placeholder="Price"
              />
            </div>

            <div>
              <label className="label font-semibold">Ticket Quantity</label>
              <input
                {...register("quantity")}
                type="number"
                className="input input-bordered w-full"
                placeholder="Quantity"
              />
            </div>
          </div>

          {/* Perks */}
          <div>
            <label className="label font-semibold">Perks</label>

            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center gap-2">
                <input type="checkbox" value="AC" {...register("perks")} />
                AC
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value="WiFi" {...register("perks")} />
                WiFi
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Breakfast"
                  {...register("perks")}
                />
                Breakfast
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value="Cabin" {...register("perks")} />
                Cabin
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label font-semibold">Departure Date</label>
              <input
                type="date"
                {...register("departureDate")}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Departure Time</label>
              <input
                type="time"
                {...register("departureTime")}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <button className="btn bg-teal-600 text-white w-full hover:bg-teal-300">
            Update Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTicket;
