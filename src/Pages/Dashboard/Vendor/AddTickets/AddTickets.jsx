import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../Components/LoadingSpinner/LoadingSpinner";

const AddTickets = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const defaultDistricts = [
    "Dhaka",
    "Chittagong",
    "Cox's Bazar",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
    "Mymensingh",
    "Comilla",
    "Narayanganj",
  ];

  const selectedFrom = watch("from");
  const selectedTo = watch("to");

  const froms = [
    ...new Set([...defaultDistricts, ...tickets.map((t) => t.from)]),
  ].filter((district) => district !== selectedTo);

  const tos = [
    ...new Set([...defaultDistricts, ...tickets.map((t) => t.to)]),
  ].filter((district) => district !== selectedFrom);

  const handleAddTickets = async (data) => {
    try {
      const imageFile = data.image[0];

      const formData = new FormData();
      formData.append("image", imageFile);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

      const imageRes = await axios.post(imageAPI, formData);

      const imageURL = imageRes.data.data.url;

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
          timer: 1000,
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
    <div className="pt-10 pb-10 bg-teal-50">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl text-center font-bold mb-4">Add Ticket</h2>
        <p className="text-gray-600 text-center mb-8">
          Fill in the form below to add a new ticket. Make sure all <br />{" "}
          information is accurate. Your ticket will be pending until admin
          approval.
        </p>

        <form onSubmit={handleSubmit(handleAddTickets)} className="space-y-4">
          <div>
            <label className="label font-semibold">Ticket Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="Enter ticket title"
              className="input w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title required</p>
            )}
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <label className="label font-semibold">From (Location)</label>
              <select
                {...register("from", { required: true })}
                className="select w-full"
              >
                <option value="">Select departure location</option>
                {froms.map((f, i) => (
                  <option key={i} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="label font-semibold">To (Location)</label>
              <select
                {...register("to", { required: true })}
                className="select w-full"
              >
                <option value="">Select destination</option>
                {tos.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label font-semibold">Transport Type</label>
            <select
              {...register("transportType", { required: true })}
              className="select w-full"
            >
              <option value="">Select transport type</option>
              <option>Bus</option>
              <option>Train</option>
              <option>Launch</option>
              <option>Plane</option>
            </select>
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <label className="label font-semibold">Price (per unit)</label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Enter price"
                className="input w-full"
              />
            </div>

            <div className="w-full">
              <label className="label font-semibold">Ticket Quantity</label>
              <input
                type="number"
                {...register("quantity", { required: true })}
                placeholder="Enter quantity"
                className="input w-full"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <label className="label font-semibold">Departure Date</label>
              <input
                type="date"
                {...register("departureDate", { required: true })}
                className="input w-full"
              />
            </div>

            <div className="w-full">
              <label className="label font-semibold">Departure Time</label>
              <input
                type="time"
                {...register("departureTime", { required: true })}
                className="input w-full"
              />
            </div>
          </div>

          <div>
            <label className="label font-semibold">Perks</label>

            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center gap-1">
                <input type="checkbox" value="AC" {...register("perks")} />
                AC
              </label>

              <label className="flex items-center gap-1">
                <input type="checkbox" value="WiFi" {...register("perks")} />
                WiFi
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="Breakfast"
                  {...register("perks")}
                />
                Breakfast
              </label>

              <label className="flex items-center gap-1">
                <input type="checkbox" value="Cabin" {...register("perks")} />
                Cabin
              </label>
            </div>
          </div>

          <div>
            <label className="label font-semibold">Ticket Image</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input w-full"
            />
          </div>

          <div>
            <label className="label font-semibold">Vendor Name</label>
            <input
              value={user.displayName}
              readOnly
              className="input w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label font-semibold">Vendor Email</label>
            <input
              value={user.email}
              readOnly
              className="input w-full bg-gray-100"
            />
          </div>

          <button className="btn bg-teal-700 text-white w-full">
            Add Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTickets;
