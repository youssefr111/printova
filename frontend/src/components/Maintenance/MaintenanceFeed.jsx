import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import MaintenanceContext from '../../context/MaintenanceContext.jsx';

const RegisterFeed = () => {
  const navigate = useNavigate()
  const { createMaintenance } = useContext(MaintenanceContext);
  const [form, setForm] = useState({});

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getMinTime = () => {
    if (!form.date) return "09:00";
    const today = new Date();
    const selectedDate = new Date(form.date);
    if (
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()
    ) {
      const nextHour = Math.min(today.getHours() + 1, 16); // cap at 16
      return Math.max(nextHour, 9).toString().padStart(2, "0") + ":00";
    }
    return "09:00";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date || !form.time) {
      alert("Please select a date and time");
      return;
    }

    const selectedDateTime = new Date(`${form.date}T${form.time}:00`);
    const now = new Date();

    if (selectedDateTime < now) {
      alert("Cannot select a past date/time");
      return;
    }

    const datetime = `${form.date}T${form.time}:00`;
    try {
      await createMaintenance({
        description: form.description,
        address: form.address,
        date: datetime
      });
      navigate("/account");
    } catch (err) {
      console.error("Failed to book maintenance:", err);
    }
  };

  const today = new Date();
  const minDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

  return (
    <div className="flex items-center my-44 bg-white dark:bg-gray-900">  
      <div className="container mx-auto max-w-md my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Book Maintenance</h1>
            <p className="text-gray-500 dark:text-gray-400">Book a maintenance service</p>
          </div>
          <div className="m-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleFormChange}
                  autoComplete="off"
                  required
                  className={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleFormChange}
                  autoComplete="off"
                  required
                  className={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleFormChange}
                  min={minDate}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                  Hour (minutes always 00, 9AM–4PM)
                </label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleFormChange}
                  min={getMinTime()}
                  max="16:00"
                  step={3600}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mb-6">
                <button type="submit" disabled={getMinTime() > "16:00"} className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:outline-none disabled:opacity-50 hover:bg-indigo-700 transition-colors cursor-pointer">
                  Book Maintenance
                </button>
              </div>

            </form>
            
          </div>
        </div>
    </div>
  );
};

export default RegisterFeed;