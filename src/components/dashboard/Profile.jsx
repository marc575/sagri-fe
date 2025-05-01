import React from 'react';
import img from '../../assets/img/1.jpg'
import Avatar from '../ui/Avatar';
import { FiPhone, FiMail, FiFolder, FiMapPin } from 'react-icons/fi';

function Profile({user}) {
  return (
    <div>
        <div className="card bg-base-100 w-full shadow-sm border-2 border-[#FDFAD0]">
            <figure>
                <img
                src={img}
                alt="Shoes"
                className='h-64 w-full'
                />
            </figure>
            <div className="card-body">
                <div className='absolute top-54'>
                    <Avatar user={user} className='w-98'/>
                </div>
                <h2 className="card-title text-2xl pt-5">
                    {user?.name}
                <div className="badge badge-secondary"><FiFolder /> {user?.role}</div>
                </h2>
                <p>{user?.bio}</p>
                <div className="card-actions flex justify-between mt-3">
                    <div className="badge badge-outline italic p-2 border-[#FDFAD0]"><FiMapPin /> {user?.address}</div>
                    <div className='space-x-4'>
                        <div className="badge badge-outline italic p-2 border-[#FDFAD0]"><FiMail /> {user?.email}</div>
                        <div className="badge badge-outline italic p-2 border-[#FDFAD0]"><FiPhone /> {user?.phone}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
