import React from 'react'

const ShowDate = ({created_at}) => {
    const currentDate = new Date(created_at).toLocaleDateString("en-US",Option={
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      const currentTime = new Date(created_at).toLocaleTimeString("en-US",Option={
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });

  return (
    <div>
         <p>{currentDate}</p>
         <p>{currentTime}</p>
    </div>
  )
}

export default ShowDate
