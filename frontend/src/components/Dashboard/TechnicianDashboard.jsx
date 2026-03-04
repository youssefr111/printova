import React, { useState } from 'react';
import Tabs from "../ui/Tabs";
import TechnicianSection from "./Sections/TechnicianSection";

const TechnicianDashboard = () => {
    const [activeTab, setActiveTab] = useState("technician");

    const tabs = [
        { id: "technician", label: "Technician" },
    ];

    const sections = {
        technician: <TechnicianSection />,
    };

  return (
    <main className='flex flex-col bg-[#f7f7f8] grow w-full mt-20 dark:bg-[#0e0e10] z-50 font-family-poppins px-20'>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

        <div className="mt-4">
            {sections[activeTab]}
        </div>
    </main>
  )
}

export default TechnicianDashboard;