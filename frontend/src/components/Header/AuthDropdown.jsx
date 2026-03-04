import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUser, FaPen } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const AuthDropdown = ({ user, logout, hasRole }) => {
    const navigate = useNavigate();

  return (
    <>
        <div className='absolute right-0 mt-9 w-48 bg-white rounded-lg shadow-xl overflow-hidden'>
            {user && <div className="flex flex-row cursor-pointer *:block px-4 py-3 text-gray-700 hover:bg-blue-100 transition-colors" onClick={() => navigate('/account')}>
                <FaUser className="text-blue-600 self-center mr-1" />
                Account
            </div>}

            {user && (hasRole("ADMIN") || hasRole("MANAGER") || hasRole("DELIVERY") || hasRole("TECHNICIAN")) && (
                <div className="flex flex-row cursor-pointer *:block px-4 py-3 text-gray-700 hover:bg-blue-100 transition-colors" onClick={() => navigate('/dashboard')}>
                    <MdDashboard className="text-blue-600 self-center mr-1" />
                    Dashboard
                </div>
            )}

            {!user && <div className="flex flex-row cursor-pointer *:block px-4 py-3 text-gray-700 hover:bg-blue-100 transition-colors" onClick={() => navigate('/register')}>
                <FaPen className="text-blue-600 self-center mr-1" />
                Sign up
            </div>}

            {user && <div className="flex flex-row cursor-pointer w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 transition-colors border-t border-gray-100" onClick={logout}>
                <FaSignOutAlt className="text-red-600 self-center mr-1" />
                Logout
            </div>}
        </div>
    </>
  )
}

export default AuthDropdown;