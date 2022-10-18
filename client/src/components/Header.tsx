import React from 'react'


function Header() {
  return (
    <div className='bg-blue-400 text-white flex justify-between p-2'>
            <h3 className='text-3xl'>MernAuth</h3>
            <div className='flex w-2/12 justify-evenly'>
                <h4 className='rounded-xl p-2 hover:bg-blue-300 cursor-pointer'>Login</h4>
                <h4 className='rounded-xl p-2 hover:bg-blue-300 cursor-pointer'>Signup</h4>
            </div>
    </div>
  )
}

export default Header
