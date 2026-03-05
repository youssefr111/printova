import { useContext, useEffect } from 'react';
import CheckoutFeed from '../components/Checkout/CheckoutFeed.jsx';
import CartContext from '../context/CartContext.jsx';
import Loading from '../components/General/Loading.jsx';
import Missing from '../components/General/Missing.jsx';
import ServiceContext from '../context/ServiceContext.jsx';
import useTitle from '../hooks/useTitle';
import useAuth from '../hooks/useAuth.jsx';

const Checkout = () => {
    useTitle('Checkout - Printova')

    const { user } = useAuth()

    const { cart, fetchCart } = useContext(CartContext);
    const { services, fetchServices } = useContext(ServiceContext);

    useEffect(() => {
      if (user) {
        fetchCart();
        fetchServices();
      }
    }, [user, fetchCart, fetchServices]);

  return (
    <main className='flex flex-col bg-[#f7f7f8] grow w-full mt-20 dark:bg-[#0e0e10] z-50 font-family-poppins'>
      <CheckoutFeed cart={cart} services={services} />
    </main>
  )
}

export default Checkout;