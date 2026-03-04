import React, { useState, useMemo } from 'react';
import { FaRegEdit } from "react-icons/fa";
import Order from './Order';
import Maintenance from './Maintenance';
import AccountInformation from './AccountInformation';

const AccountFeed = ({ user, orders, maintenances }) => {
    const [selectedService, setSelectedService] = useState("Orders");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [isEditing, setIsEditing] = useState(false);

    const ORDER_STATUSES = [
        { value: "PENDING", label: "Pending" },
        { value: "COMPLETED", label: "Completed" },
        { value: "CANCELLED", label: "Cancelled" },
    ];

    const MAINTENANCE_STATUSES = [
        { value: "SCHEDULED", label: "Scheduled" },
        { value: "COMPLETED", label: "Completed" },
        { value: "CANCELLED", label: "Cancelled" },
    ];

    const statusOptions =
    selectedService === "Orders"
        ? ORDER_STATUSES
        : MAINTENANCE_STATUSES;

    const filteredData = useMemo(() => {
        const source =
            selectedService === "Orders" ? orders : maintenances;

        if (!source) return [];

        if (selectedStatus === "ALL") return source;

        return source.filter((item) =>
            (item.orderStatus || item.maintenanceStatus)
                ?.toUpperCase() === selectedStatus
        );
    }, [orders, maintenances, selectedService, selectedStatus]);

  return (
    <div className="flex size-full bg-white dark:bg-gray-900 md:py-8">
        <div className="flex flex-col w-full mx-auto my-4 lg:my-0 max-w-5xl px-4 2xl:px-0 ">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Account Information
                </h2>

                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="flex items-center cursor-pointer gap-2 text-sm text-blue-600 hover:text-blue-800 transition">
                        <FaRegEdit />Edit
                    </button>
                )}
            </div>

            <AccountInformation user={user} isEditing={isEditing} setIsEditing={setIsEditing} />

            <div className='flex flex-col w-full mt-10'>
                <div className="flex flex-col lg:flex-row w-full justify-between items-center">
                    
                    <div className="sm:flex sm:items-center my-4">
                        <label htmlFor="service-type" className="sr-only">Select service type</label>

                        <select id="service-type" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="px-6 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                            <option value="Orders">Orders</option>
                            <option value="Maintenances">Maintenances</option>
                        </select>
                    </div>

                    <div className="sm:flex sm:items-center">
                        <label htmlFor="service-status" className="sr-only">Select service status</label>

                        <select
                            id="service-status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-6 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="ALL">All</option>

                            {statusOptions.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h2 className="my-4 text-xl font-semibold text-gray-900 dark:text-white md:mb-6">{selectedService === "Orders" ? "Order History" : "Maintenance History"}</h2>

                    {filteredData.length > 0 ? (
                        filteredData.map((item) =>
                            selectedService === "Orders" ? (
                                <Order key={item.orderId} order={item} />
                            ) : (
                                <Maintenance key={item.maintenanceId} maintenance={item} />
                            )
                        )
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            No {selectedService.toLowerCase()} found.
                        </p>
                    )}
            </div>
        </div>
    </div>
  )
}

export default AccountFeed;