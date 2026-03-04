import React, { useContext } from 'react'
import Missing from '../components/General/Missing';
import useTitle from '../hooks/useTitle';
import useAuth from '../hooks/useAuth';
import AccountFeed from '../components/Account/AccountFeed';
import Loading from '../components/General/Loading';
import OrderContext from '../context/OrderContext.jsx';
import MaintenanceContext from '../context/MaintenanceContext.jsx';

const Account = () => {
    const { user } = useAuth()
    const { orders } = useContext(OrderContext)
    const { maintenances } = useContext(MaintenanceContext)

    const pageTitle = user && user.firstName ? `@${user.firstName}` : 'Account'
    useTitle(`${pageTitle} - Printova`)

  return (
    <main className='flex flex-col bg-[#f7f7f8] grow w-full mt-20 dark:bg-[#0e0e10] z-50 font-family-poppins'>

      <AccountFeed user={user} orders={orders} maintenances={maintenances} />

    </main>
  )
}

export default Account