import React from 'react'
import img from '../../assets/img/6.jpg'
import Activity from './Activity'
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { user } = useAuth();
  return (
    <div>
      <a href=''>
        <div className="card bg-base-100 image-full w-96 shadow-sm">
          <figure>
            <img
              src={img}
              alt="sagri" />
          </figure>
          <div className="card-body justify-end items-start">
            <h2 className="card-title bg-[#FDFAD0] text-secondary px-4 py-2 font-bold text-xs">CONNECTEZ-VOUS</h2>
            <h2 className='card-title bg-[#FDFAD0] text-secondary px-4 py-2 font-bold text-xs'>A DE NOUVEAU PARTENAIRES !</h2>
          </div>
        </div>
      </a>

      <div className='w-96'> <Activity userId={user?.id} /> </div>
    </div>
  )
}

export default Sidebar
