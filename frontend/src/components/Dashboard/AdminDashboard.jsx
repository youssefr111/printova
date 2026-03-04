import React, { useState } from 'react';
import Tabs from "../ui/Tabs";
import AuthSection from "./Sections/AuthSection";
import UsersSection from "./Sections/UsersSection";
import RolesSection from "./Sections/RolesSection";
import CategoriesSection from "./Sections/CategoriesSection";
import SuppliersSection from "./Sections/SuppliersSection";
import ServicesSection from "./Sections/ServicesSection";
import PartsSection from "./Sections/PartsSection";
import PartPricesSection from "./Sections/PartPricesSection";
import StockSection from "./Sections/StockSection";
import PaymentMethodsSection from "./Sections/PaymentMethodsSection";
import PaymentsSection from "./Sections/PaymentsSection";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("auth");

    const tabs = [
        { id: "auth", label: "Authentication" },
        { id: "users", label: "Users" },
        { id: "roles", label: "Roles" },
        { id: "categories", label: "Categories" },
        { id: "suppliers", label: "Suppliers" },
        { id: "services", label: "Services" },
        { id: "parts", label: "Parts" },
        { id: "partPrices", label: "Part Prices" },
        { id: "stock", label: "Stock" },
        { id: "paymentMethods", label: "Payment Methods" },
        { id: "payment", label: "Payment" },
    ];

    const sections = {
        auth: <AuthSection />,
        users: <UsersSection />,
        roles: <RolesSection />,
        categories: <CategoriesSection />,
        suppliers: <SuppliersSection />,
        services: <ServicesSection />,
        parts: <PartsSection />,
        partPrices: <PartPricesSection />,
        stock: <StockSection />,
        paymentMethods: <PaymentMethodsSection />,
        payment: <PaymentsSection />,
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

export default AdminDashboard;