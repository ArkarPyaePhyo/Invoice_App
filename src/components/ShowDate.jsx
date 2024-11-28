import React from 'react'

const ShowDate = ({time}) => {
    const currentDate = new Date(time).toLocaleDateString("en-US",Option={
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      const currentTime = new Date(time).toLocaleTimeString("en-US",Option={
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
