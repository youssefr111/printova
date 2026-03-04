import { useState } from "react";

const Section = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-md mb-6">
      
      <div onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center cursor-pointer select-none">
        <h2 className="text-xl font-semibold">{title}</h2>

        <span className={`transition-transform duration-300 text-sm ${ isOpen ? "rotate-0" : "rotate-90" }`}>
          ▼
        </span>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "mt-6" : "max-h-0 opacity-0"}`}>
        {isOpen && children}
      </div>
    </div>
  );
};

export default Section;