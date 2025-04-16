import React from 'react';
import x from "../../assets/icons/x.png";
import f from "../../assets/icons/f.png";
import i from "../../assets/icons/i.png";
import l from "../../assets/icons/l.png";
import logo from "../../assets/img/logo-white.png";

function Footer() {
  return (
    <div className='container mx-auto px-4 sm:px-6'>
    <div className='flex flex-col md:flex-row justify-between gap-5 items-center'>
      <img src={logo} alt="logo" width="80" className='rounded-xl'/>
      <p className='font-semibold text-white text-center'>&copy; Copyrights, 2025 Tous droits reservés, <a className='text-primary' href="https://www.linkedin.com/in/marc-tatchou-85891a243/">Tatchou Marc</a></p>
      <div className='flex gap-5'>
        <a href=""><img src={l} alt="" width="30" /></a>
        <a href=""><img src={x} alt="" width="30"/></a>
        <a href=""><img src={i} alt="" width="30"/></a>
        <a href=""><img src={f} alt="" width="30"/></a>
      </div>
    </div>
    </div>
  )
}

export default Footer
