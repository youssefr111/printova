import React from 'react';
import logo from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center w-full py-2 lg:py-10 bg-linear-to-b from-[#5524B7] to-[#380B60] text-white/70">
      <img className="size-24 lg:size-32" src={logo} alt='logo' />
        <p className="text-sm lg:text-base my-2 text-center">Copyright © {currentYear} <a href="/">Printova</a>. All rights reservered.</p>
    </footer>
  )
}

export default Footer;