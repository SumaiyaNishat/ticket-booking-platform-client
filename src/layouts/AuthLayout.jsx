import React from 'react'
import { Link, Outlet } from 'react-router'
import images from '../assets/images.jpg';
import { FaBusAlt } from 'react-icons/fa';

const AuthLayout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <Link to="/"><div className='flex items-end gap-5'>
         <FaBusAlt className="text-2xl text-yellow-900" />
        <h3 className='text-3xl  text-yellow-900 font-semibold -ms-2.5'>Ticket<span className=" text-orange-700">Bari</span></h3>
    </div>
    </Link>
        <div>
            <Outlet></Outlet>
        </div>
        <div>
            <img src={images} alt="" />
        </div>
    </div>
  )
}

export default AuthLayout