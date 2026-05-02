import React, { useState } from 'react';
import Tabs from "../ui/Tabs";
import DeliverySection from "./Sections/DeliverySection";

const DeliveryDashboard = () => {
    const [activeTab, setActiveTab] = useState("delivery");

    const tabs = [
        { id: "delivery", label: "Delivery" },
    ];

    const sections = {
        delivery: <DeliverySection />,
    };

  return (
    <main className='flex flex-col bg-[#f7f7f8] dark:text-white grow w-full mt-20 dark:bg-indigo-950 z-50 font-family-poppins px-20'>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

        <div className="mt-4">
            {sections[activeTab]}
        </div>
    </main>
  )
}

export default DeliveryDashboard;