import React from 'react'

function Avatar({user}) {
  return (
    <>
        {user.profile_picture ?
            <div className="w-32">
                <img src={`http://localhost:8000/storage/${user.profile_picture}`} className="rounded-full"/>
            </div>
        : 
            <div className="w-24">
                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}  className="rounded-full"/>
            </div>
        }
    </>
  )
}

export default Avatar
