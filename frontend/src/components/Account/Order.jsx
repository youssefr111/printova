import { useContext } from 'react';
import { format } from 'date-fns';
import PartContext from '../../context/PartContext';
import OrderItem from './OrderItem';

const Order = ({ order }) => {
    const { parts } = useContext(PartContext);

  return (
    <div className="flex flex-wrap m-2 gap-y-4 pb-4 md:pb-5 rounded-lg border my-4 text-center lg:text-start items-center border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
      
      <div className='flex flex-wrap flex-row w-full justify-center gap-6 lg:justify-between items-center mb-4'>
        <dl className="">
            <dt className="text-sm lg:text-base font-semibold text-black dark:text-white">Order Id: </dt>
            <dd className="text-xs lg:text-sm text-gray-500 dark:text-white">{order ? order.orderId : "Unknown"}</dd>
        </dl>
        <dl className="">
            <dt className="text-sm lg:text-base font-semibold text-black dark:text-white">Created At: </dt>
            <dd className="text-xs text-gray-500 dark:text-white">{order ? format(new Date(order.createdAt), "PPpp") : "Unknown"}</dd>
        </dl>
        <dl className="">
            <dt className="text-sm lg:text-base font-semibold text-black dark:text-white">Completed At: </dt>
            <dd className="text-xs text-gray-500 dark:text-white">{order ? format(new Date(order.completedAt), "PPpp") : "Unknown"}</dd>
        </dl>
        <dl className="">
            <dt className="text-sm lg:text-base font-semibold text-black dark:text-white">Order Status: </dt>
            <dd className="text-xs lg:text-sm text-gray-500 dark:text-white">{order && order.orderStatus ? order.orderStatus : "Unknown"}</dd>
        </dl>
        <dl className="">
            <dt className="text-sm lg:text-base font-semibold text-black dark:text-white">Delivery Fee: </dt>
            <dd className="text-xs lg:text-sm text-gray-500 dark:text-white">{order && order.servicePrice ? `${order.servicePrice} EGP` : "Unknown"}</dd>
        </dl>
        <dl className="">
            <dt className="text-sm lg:text-base font-semibold text-black dark:text-white">Total Amount: </dt>
            <dd className="text-xs lg:text-sm text-gray-500 dark:text-white">{order && order.totalAmount ? `${order.totalAmount} EGP` : "Unknown"}</dd>
        </dl>
      </div>


      <div className='flex flex-row w-full'>
        {order.items.map((item, index) => (
          <OrderItem key={index} item={item} part={parts.find(p => p.partId === item.partId)} />
        ))}
      </div>

    </div>
  )
}

export default Order