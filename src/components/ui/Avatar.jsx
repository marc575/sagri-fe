import React from 'react'

function Avatar({user}) {
  return (
    <>
        {user.profile_picture ?
            <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        : 
            <div className="w-24 rounded-full">
                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} className="rounded-full" />
            </div>
        }
    </>
  )
}

export default Avatar
