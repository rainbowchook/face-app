import React from 'react'

const Navigation: React.FC = () => {
  return (
    <nav className="flex justify-end">
      {/* <p className="text-2xl no-underline ease-in transition opacity-100 hover:opacity-50 hover:underline p-3 cursor-pointer"> */}
      <p className="text-2xl link">
        <span role="link" >
          {'Sign Out'}
        </span>
      </p>
    </nav>
  )
}

export default Navigation
