import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import { GoTriangleDown } from "react-icons/go";
import { FaLock, FaShoppingCart, FaWrench } from "react-icons/fa";
import AuthDropdown from './AuthDropdown';
import AuthContext from '../../context/AuthContext.jsx';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, hasRole, logout, isLoading } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className='flex fixed top-0 w-full h-20 px-2 lg:px-4 justify-between lg:justify-evenly bg-indigo-500 z-9999 border-opacity-10 items-center select-none'>

        <img className="cursor-pointer h-full w-auto" src={logo} alt='logo' onClick={() => navigate("/")}/>

        <div className="flex items-center gap-3">
          <div className='text-white rounded-full cursor-pointer hover:bg-indigo-900/40 p-2 mr-4' onClick={() => navigate("/checkout")}>
            <FaShoppingCart className='size-5' />
          </div>

          <div className='text-white rounded-full cursor-pointer hover:bg-indigo-900/40 p-2' onClick={() => navigate("/maintenance")}>
            <FaWrench className='size-5' />
          </div>

          <div className='flex relative group ml-6' ref={dropdownRef}>

            <div className='flex bg-white rounded-full items-center p-4 w-24 text-[11px] h-7.5 gap-2 lg:text-[13px] leading-5 font-medium appearance-none hover:cursor-pointer focus:cursor-pointer' onClick={() => setDropdownVisible((prev) => !prev)} >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-2 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
              ) :
              user ? 
                (
                  <div className='flex flex-row w-full text-center justify-center items-center text-indigo-800'>
                    <p className='truncate'>{user.firstName}</p>
                    <GoTriangleDown className='ml-2' />
                  </div>
                )
                : 
                (
                <div className='flex flex-row text-center justify-center items-center text-indigo-800'>
                  <FaLock className='self-center mr-1' />
                  <Link to='login' onClick={() => setDropdownVisible(false)}>Login</Link>
                  <GoTriangleDown className='ml-2' />
                </div>
                )
              }
            </div>

            {dropdownVisible && <AuthDropdown user={user} logout={logout} hasRole={hasRole} />}

          </div>
        </div>

      </header>
    </>
  )
}

export default Header;