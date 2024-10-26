import React, { useState } from 'react'

const Header = () => {
    const [room, setRoom] = useState("Room name")
  return (
    <div className='bg-slate-700 px-3 py-2'>
        <span className='text-xl font-bold text-white'>{room}</span>
    </div>
  )
}

export default Header