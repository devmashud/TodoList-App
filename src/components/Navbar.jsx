import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around items-center bg-violet-900 text-white px-5 p-3'>
        <h2 className='font-bold text-2xl'>iTask</h2>
        <ul className='flex gap-5 font-bold'>
            <li className='cursor-pointer px-5'>Home</li>
            <li className='cursor-pointer '>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
