import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { IoMdClock } from "react-icons/io";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { data: ticket = {}, loading } = useQuery({
    queryKey: ["ticketDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  if (loading)
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  const {
    title,
    from,
    to,
    image,
    price,
    quantity: availableQuantity,
    transportType,
    perks,
    departureDate,
    departureTime,
    vendorEmail,
  } = ticket;

  useEffect(() => {
    if (!departureDate || !departureTime) return;

    const interval = setInterval(() => {
      const departure = new Date(`${departureDate}T${departureTime}`);
      const now = new Date();
      const diff = departure - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setCountdown({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [departureDate, departureTime]);

  const isExpired = new Date(`${departureDate}T${departureTime}`) < new Date();

  const handleBooking = () => {
    if (quantity > availableQuantity) {
      Swal.fire("Error", "Quantity exceeds available tickets", "error");
      return;
    }

    const bookingData = {
      ticketId: id,
      ticketTitle: title,
      image: image,
      vendorEmail,
      userName: user.displayName,
      userEmail: user.email,
      bookingQuantity: quantity,
      unitPrice: price,
      totalPrice: price * quantity,
      from: from,
      to: to,
    };

    axiosSecure.post("/bookings", bookingData).then((res) => {
      if (res.data.insertedId) {
        queryClient.invalidateQueries(["myBookings", user?.email]);
        Swal.fire("Success!", "Booking Requested", "success");
        document.getElementById("booking_modal").close();
        navigate("/dashboard/myBookedTickets");
      }
    });
  };

  return (
    <div className="bg-teal-100 py-10">
      <div className="w-11/12 mx-auto">
        <div className="card bg-base-100 shadow-xl w-full lg:w-10/12  mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between items-center">
            <img src={image} alt="" className="w-full max-w-md lg:max-w-sm mx-auto" />

            <div className="card-body pb-10 w-full">
              <h2 className="card-title text-3xl">{title}</h2>

              <div>
                <p className=" text-lg pt-2">
                  <span className="font-semibold">From: </span>
                  {from}
                </p>
                <p className=" text-lg pt-2">
                  <span className="font-semibold">To: </span>
                  {to}
                </p>
              </div>

              <p className=" text-lg pt-2">
                <span className="font-semibold">Transport:</span>{" "}
                {transportType}
              </p>

              <div className="flex">
                <p className="text-lg text-left">
                  <span className="font-semibold">Price:</span> Tk {price}
                </p>

                <p className="text-lg">
                  <span className="font-semibold">Available:</span>{" "}
                  {availableQuantity}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {perks?.map((perk, i) => (
                  <div key={i} className="badge badge-outline">
                    {perk}
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="grid grid-flow-col gap-4 text-center auto-cols-max">
                  <IoMdClock className="w-8 h-8" />
                  <p className="font-semibold text-xl mb-2 ">Departure In:</p>
                  <div className="flex flex-col">
                    <span className="countdown font-mono text-xl">
                      <span
                        style={{ "--value": String(countdown.hours) }}
                      ></span>
                    </span>
                    hours
                  </div>
                  <div className="flex flex-col">
                    <span className="countdown font-mono text-xl">
                      <span
                        style={{ "--value": String(countdown.minutes) }}
                      ></span>
                    </span>
                    min
                  </div>
                  <div className="flex flex-col">
                    <span className="countdown font-mono text-xl">
                      <span
                        style={{ "--value": String(countdown.seconds) }}
                      ></span>
                    </span>
                    sec
                  </div>
                </div>
              </div>

              <p className="text-lg">
                <span className="font-semibold">VendorEmail:</span> {vendorEmail}
              </p>

              <div className="card-actions justify-end mt-6">
                <button
                  disabled={isExpired || availableQuantity === 0}
                  onClick={() =>
                    document.getElementById("booking_modal").showModal()
                  }
                  className={`btn btn-primary ${
                    (isExpired || availableQuantity === 0) && "btn-disabled"
                  }`}
                >
                  {availableQuantity === 0
                    ? "Sold Out"
                    : isExpired
                      ? "Departure Passed"
                      : "Book Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* modal */}
        <dialog id="booking_modal" className="modal">
          <div className="modal-box max-w-lg p-15">
            <h3 className="font-bold text-2xl mb-4">Confirm Your Booking</h3>

            <div className="space-y-2 text-left">
              <p className="text-sm">
                Departure: {departureDate} at {departureTime}
              </p>
              <p>
                Unit Price:
                <span className="font-semibold"> Tk {price}</span>
              </p>

              <p>
                Available Seats:
                <span className="font-semibold"> {availableQuantity}</span>
              </p>

              <div className="form-control flex gap-2">
                <label className="label">
                  <span className="label-text">Select Quantity:</span>
                </label>

                <input
                  type="number"
                  min="1"
                  max={availableQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="input input-bordered w-full"
                />
              </div>

              {quantity > availableQuantity && (
                <p className="text-red-500 text-sm">
                  Sorry, the number of tickets you chose isn’t available.
                </p>
              )}

              <div className="divider"></div>

              <p className="text-lg font-semibold text-right">
                Total Price: Tk {price * quantity}
              </p>
            </div>

            <div className="modal-action">
              <Link
                to=""
                disabled={quantity > availableQuantity}
                onClick={handleBooking}
                className="btn btn-success"
              >
                Confirm Booking
              </Link>

              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TicketDetails;
