import React from 'react'
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const AddTickets = () => {
const { user } = useAuth();
    const { register, handleSubmit, formState:{errors}, reset } = useForm();

    const tickets = useLoaderData();
    const fromsDuplicate = tickets.map(t => t.from)
    const froms = [...new Set (fromsDuplicate)];

    const tosDuplicate = tickets.map(tt => tt.to)
    const tos = [...new Set (tosDuplicate)];

    

    const handleAddTickets = (data) =>{
      console.log(data);
    }
  return (
    <div className='pt-10 bg-amber-50'>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Ticket</h2>

      <form onSubmit={handleSubmit(handleAddTickets)} className="space-y-3">
        
        <input {...register("title", { required: true })} placeholder="Ticket Title" className="input w-full" />

        <div className="flex gap-3">
         
          <select {...register('from')} defaultValue="Pickup point" className="select">
            <option value="">From</option>
                <option disabled={true}>Pick a District</option>
                {
                  froms.map((f, i) =>  <option key={i} value={f}>{f}</option> )
                }
              </select>
             

              
          <select {...register('To')} defaultValue="Pickup point" className="select">
                <option value="">To</option>
                <option disabled={true}>Pick a District</option>
                {
                  tos.map((o, i) =>  <option key={i} value={o}>{o}</option> )
                }
              </select>
              
              
</div> 
        

        <select {...register("transport", { required: true })} className="select w-full">
          <option value="">Select Transport</option>
          <option>Bus</option>
          <option>Train</option>
          <option>Launch</option>
          <option>Plane</option>
        </select>

        <div className="flex gap-3">
          <input type="number" {...register("price", { required: true })} placeholder="Price per unit" className="input w-full" />
          <input type="number" {...register("quantity", { required: true })} placeholder="Ticket Quantity" className="input w-full" />
        </div>

        <div className="flex gap-3">
  <div className="w-full">
    <label className="label">Departure Date</label>
    <input
      type="date"
      {...register("departureDate", { required: true })}
      className="input w-full"
    />
  </div>

  <div className="w-full">
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
          <label><input type="checkbox" value="AC" {...register("perks")} /> AC</label>
          <label><input type="checkbox" value="Breakfast" {...register("perks")} /> Breakfast</label>
          <label><input type="checkbox" value="WiFi" {...register("perks")} /> WiFi</label>
        </div>

        <input type="file" {...register("image", { required: true })} className="file-input w-full" />

        {/* Readonly Vendor Info */}
        <input value={user.displayName} readOnly className="input w-full bg-gray-100" />
        <input value={user.email} readOnly className="input w-full bg-gray-100" />

        <button className="btn btn-neutral w-full">Add Ticket</button>
      </form>
    </div>
    </div>
  )
}

export default AddTickets