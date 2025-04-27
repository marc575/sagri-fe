import React from 'react';
import logo from '../../assets/img/logo-light.png'
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';

function TopNav() {
  const { user, logout } = useAuth();

  return (
    <div className='bg-[#FDFAD0] shadow-sm'>
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <a className="text-xl" href='/blog'><img src={logo} alt="logo" width="50"/> </a>
        </div>
        <div className="flex gap-2">
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Rechercher..." />
        </label>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <Avatar user={user} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a>
                  Profile
                </a>
              </li>
              <li>
                <a onClick={logout}>Deconnexion</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav
