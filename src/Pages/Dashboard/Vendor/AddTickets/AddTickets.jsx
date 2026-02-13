import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

const AddTickets = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const tickets = useLoaderData();
  const fromsDuplicate = tickets.map((t) => t.from);
  const froms = [...new Set(fromsDuplicate)];

  const tosDuplicate = tickets.map((tt) => tt.to);
  const tos = [...new Set(tosDuplicate)];

  const handleAddTickets = async (data) => {
    try {
      // 1. Get image file
      const imageFile = data.image[0];

      // 2. Prepare form data
      const formData = new FormData();
      formData.append("image", imageFile);

      // 3. Upload to imgbb
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

      const res = await axios.post(image_API_URL, formData);
      const imageURL = res.data.data.url;

      // 4. Create ticket object
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
      };

      console.log("Final ticket data:", ticketData);

      axiosSecure.post("/tickets", ticketData).then((res) => {
        console.log("after adding tickets", res.data);
        Swal.fire({
          icon: "success",
          title: "Ticket Added!",
          text: "Your ticket is now pending approval.",
          timer: 2000,
          showConfirmButton: false,
        });
      });
    } catch (error) {
      console.error("Ticket upload failed:", error);
    }
  };

  return (
    <div className="pt-10 bg-amber-50">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Add Ticket</h2>

        <form onSubmit={handleSubmit(handleAddTickets)} className="space-y-3">
          <input
            {...register("title", { required: true })}
            placeholder="Ticket Title"
            className="input w-full"
          />
          {errors.title?.type === "required" && (
            <p className="text-red-500 text-left">Ticket title is required.</p>
          )}

          <div className="flex gap-3">
            <select
              {...register("from")}
              defaultValue="Pickup point"
              className="select"
            >
              <option value="">From</option>
              <option disabled={true}>Pick a District</option>
              {froms.map((f, i) => (
                <option key={i} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <select
              {...register("to")}
              defaultValue="Pickup point"
              className="select"
            >
              <option value="">To</option>
              <option disabled={true}>Pick a District</option>
              {tos.map((o, i) => (
                <option key={i} value={o}>
                  {o}
                </option>
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
              placeholder="Price per unit"
              className="input w-full"
            />
            <input
              type="number"
              {...register("quantity", { required: true })}
              placeholder="Ticket Quantity"
              className="input w-full"
            />
          </div>

          <div className="flex gap-3">
            <div className="w-full text-left">
              <label className="label">Departure Date</label>
              <input
                type="date"
                {...register("departureDate", { required: true })}
                className="input w-full"
              />
            </div>

            <div className="w-full text-left">
              <label className="label">Departure Time</label>
              <input
                type="time"
                {...register("departureTime", { required: true })}
                className="input w-full"
              />
            </div>
          </div>

          {/* Perks */}
          <div className="flex gap-4">
            <label>
              <input type="checkbox" value="AC" {...register("perks")} /> AC
            </label>
            <label>
              <input type="checkbox" value="Breakfast" {...register("perks")} />{" "}
              Breakfast
            </label>
            <label>
              <input type="checkbox" value="WiFi" {...register("perks")} /> WiFi
            </label>
          </div>

          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input w-full"
          />

          {/* Readonly Vendor Info */}
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
