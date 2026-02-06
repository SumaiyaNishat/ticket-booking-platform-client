import React from 'react'
import Banner from '../Banner/Banner'
import TicketCard from '../../../Components/TicketCard/TicketCard'
import AdvertisementSection from '../AdvertisementSection/AdvertisementSection'
import PopularRoutes from '../PopularRoutes/PopularRoutes'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div>
       <AdvertisementSection></AdvertisementSection>
      </div>
      <PopularRoutes></PopularRoutes>
    </div>
  )
}

export default Home