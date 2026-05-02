import React from 'react';
import MaintenanceFeed from '../components/Maintenance/MaintenanceFeed';
import useTitle from '../hooks/useTitle';

const Maintenance = () => {
  useTitle('Book Maintenance - Printova')

  return (
    <main className='dark:bg-indigo-950'>
      
      <MaintenanceFeed />

    </main>
  )
}

export default Maintenance;