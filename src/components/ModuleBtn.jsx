import React from 'react'
import { Link } from 'react-router-dom'

const ModuleBtn = ({icon,name,url}) => {
  return (
    <Link to={url} className="text-white h-full p-5 bg-blue-600 flex flex-col items-center justify-center rounded-lg ">
        {icon}
        <br/>
        {name}
    </Link>
  )
}

export default ModuleBtn