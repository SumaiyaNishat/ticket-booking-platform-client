import React from 'react'
import Banner from '../Banner/Banner'
import TicketCard from '../../../Components/TicketCard/TicketCard'
import AdvertisementSection from '../AdvertisementSection/AdvertisementSection'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div>
       <AdvertisementSection></AdvertisementSection>
      </div>
    </div>
  )
}

export default Home