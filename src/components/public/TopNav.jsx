import React from 'react'
import logo from '../../assets/img/logo-white.png'
import ThemeSwitcher from '../ui/ThemeSwitcher'
import Button from '../ui/Button'

export default function TopNav() {
  return (
    <>
        <div className="navbar bg-transparent py-5 container mx-auto px-4 sm:px-6">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 text-[#FDFAD0] mt-3 w-52 p-2 shadow font-bold">
                    <li>
                        <a>Accueil</a>
                    </li>
                    <li>
                        <a>A Propos</a>
                    </li>
                    <li>
                        <a>Services</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                </ul>
                </div>
                <a href='/'><img className="rounded-md" src={logo} alt="logo" width={50} /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium text-[1rem] text-[#FDFAD0]">
                    <li>
                        <a>Accueil</a>
                    </li>
                    <li>
                        <a>A Propos</a>
                    </li>
                    <li>
                        <a>Services</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-5 items-center">
                <ThemeSwitcher />
                <Button className="btn btn-secondary">Nous Rejoindre</Button>
            </div>
        </div>
    </>
  )
}
