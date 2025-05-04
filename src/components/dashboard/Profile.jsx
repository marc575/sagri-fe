import React from 'react';
import img from '../../assets/img/1.jpg'
import Avatar from '../ui/Avatar';
import { FiPhone, FiMail, FiFolder, FiMapPin, FiActivity } from 'react-icons/fi';

function Profile({user}) {
  return (
    <div>
        <div className="card bg-base-100 w-full shadow-sm border border-[#FDFAD0]">
            <figure>
                <img
                src={img}
                alt="Shoes"
                className='h-64 w-full'
                />
            </figure>
            <div className="card-body">
                <div className='absolute top-54'>
                    <Avatar user={user} className='w-100 rounded-full'/>
                </div>
                <h2 className="card-title text-secondary text-2xl pt-8 capitalize">
                    {user?.name}
                    <span className="badge badge-secondary"><FiActivity /> {user?.role}</span>
                </h2>
                <p>{user?.bio}</p>
                <div className="card-actions flex justify-between mt-3">
                    <div className="badge bg-[#FDFAD0] italic p-4 text-secondary"><FiMapPin /> {user?.address}</div>
                    <div className='space-x-4 space-y-2 md:space-y-0'>
                        <div className="badge bg-[#FDFAD0] italic p-4 text-secondary"><FiMail /> {user?.email}</div>
                        <div className="badge bg-[#FDFAD0] italic p-4 text-secondary"><FiPhone /> {user?.phone}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
