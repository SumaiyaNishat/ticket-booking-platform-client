import React from 'react'
import Container from '../../Shared/Container'
import TicketCard from '../../../Components/TicketCard/TicketCard'

const AdvertisementSection = () => {
  return (
    
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        <TicketCard></TicketCard>
        <TicketCard></TicketCard>
        <TicketCard></TicketCard>
        <TicketCard></TicketCard>
        <TicketCard></TicketCard>
        <TicketCard></TicketCard>
        </div>
    
  )
}

export default AdvertisementSection