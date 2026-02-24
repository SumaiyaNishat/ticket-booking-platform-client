import React from 'react'
import Banner from '../Banner/Banner'
import TicketCard from '../../../Components/TicketCard/TicketCard'
import AdvertisementSection from '../AdvertisementSection/AdvertisementSection'
import PopularRoutes from '../PopularRoutes/PopularRoutes'
import LatestTickets from '../LatestTickets/LatestTickets'
import Choose from '../Choose/Choose'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div>
       <AdvertisementSection></AdvertisementSection>
      </div>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
      <Choose></Choose>
    </div>
  )
}

export default Home