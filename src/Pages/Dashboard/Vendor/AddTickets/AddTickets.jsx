import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const AddTickets = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets"],

    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const froms = [...new Set(tickets.map((t) => t.from))];

  const tos = [...new Set(tickets.map((t) => t.to))];

  const handleAddTickets = async (data) => {
    try {
      // upload image
      const imageFile = data.image[0];

      const formData = new FormData();

      formData.append("image", imageFile);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

      const imageRes = await axios.post(imageAPI, formData);

      const imageURL = imageRes.data.data.url;

      // ticket object
      const ticketData = {
        title: data.title,

        from: data.from,

        to: data.to,

        transportType: data.transportType,

        price: Number(data.price),

        quantity: Number(data.quantity),

        departureDate: data.departureDate,

        departureTime: data.departureTime,

        perks: data.perks || [],

        image: imageURL,

        vendorName: user.displayName,

        vendorEmail: user.email,

        status: "pending",

        isAdvertised: false,

        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/tickets", ticketData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",

          title: "Ticket Added",

          text: "Waiting for admin approval",

          timer: 2000,

          showConfirmButton: false,
        });

        reset();
      }
    } catch (error) {
      console.error(error);

      Swal.fire("Error", "Ticket add failed", "error");
    }
  };

  return (
    <div className="pt-10 pb-10 bg-gray-200">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Add Ticket</h2>

        <form onSubmit={handleSubmit(handleAddTickets)} className="space-y-3">
          <input
            {...register("title", { required: true })}
            placeholder="Ticket Title"
            className="input w-full"
          />

          {errors.title && <p className="text-red-500">Title required</p>}

          <div className="flex gap-3">
            <select
              {...register("from", { required: true })}
              className="select w-full"
            >
              <option value="">From</option>

              {froms.map((f, i) => (
                <option key={i}>{f}</option>
              ))}
            </select>

            <select
              {...register("to", { required: true })}
              className="select w-full"
            >
              <option value="">To</option>

              {tos.map((t, i) => (
                <option key={i}>{t}</option>
              ))}
            </select>
          </div>

          <select
            {...register("transportType", { required: true })}
            className="select w-full"
          >
            <option value="">Select Transport</option>

            <option>Bus</option>

            <option>Train</option>

            <option>Launch</option>

            <option>Plane</option>
          </select>

          <div className="flex gap-3">
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price"
              className="input w-full"
            />

            <input
              type="number"
              {...register("quantity", { required: true })}
              placeholder="Quantity"
              className="input w-full"
            />
          </div>

          <div className="flex gap-3">
            <input
              type="date"
              {...register("departureDate", { required: true })}
              className="input w-full"
            />

            <input
              type="time"
              {...register("departureTime", { required: true })}
              className="input w-full"
            />
          </div>

          <div className="flex gap-4">
            <label>
              <input type="checkbox" value="AC" {...register("perks")} />
              AC
            </label>

            <label>
              <input type="checkbox" value="WiFi" {...register("perks")} />
              WiFi
            </label>

            <label>
              <input type="checkbox" value="Breakfast" {...register("perks")} />
              Breakfast
            </label>
          </div>

          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input w-full"
          />

          <input
            value={user.displayName}
            readOnly
            className="input w-full bg-gray-100"
          />

          <input
            value={user.email}
            readOnly
            className="input w-full bg-gray-100"
          />

          <button className="btn btn-neutral w-full">Add Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default AddTickets;
