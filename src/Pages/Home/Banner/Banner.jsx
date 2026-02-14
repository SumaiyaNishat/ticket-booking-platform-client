import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from 'react-router';


const slides = [
  {
    id: 1,
    image:"https://i.ibb.co.com/kgh79zxD/ss.png",
    title: "Book Tickets Easily Across Bangladesh",
    subtitle: "Bus, Train, Launch & Flight Tickets in One Platform"
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/nsbf26K3/Make-Plane-Travel-More-Comfortable.png",
    title: "Travel Smart, Travel Comfortably",
    subtitle: "Verified Vendors & Secure Booking Experience"
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/zVPSCC8j/tickets-online-concept-colored-flat-vector-illustration-isolated-612079-4820.jpg",
    title: "Your Journey Starts Here",
    subtitle: "Fast Booking & Instant Confirmation"
  }
];

const Banner = () => { 
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3500 }}
      loop={true}
      pagination={{ clickable: true }}
      className="w-full"
    >
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <div
            className="h-[60vh] md:h-[80vh] bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >

            <div className="relative z-10 text-center text-white px-4 max-w-3xl">
              <h1 className="text-3xl text-black md:text-4xl font-bold ">
                {slide.title}
              </h1>
              <p className="mt-4 text-base text-black md:text-lg opacity-90">
                {slide.subtitle}
              </p>
              <Link to="/alltickets">
                <button className="mt-6 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 transition">
                  Explore Tickets
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default Banner;