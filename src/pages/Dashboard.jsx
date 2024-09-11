import React from 'react'
import Container from '../components/Container'
import ModuleBtn from '../components/ModuleBtn'
import { HiChevronRight, HiCircleStack, HiComputerDesktop, HiDocumentDuplicate, HiExclamationCircle } from 'react-icons/hi2'
import { HiCash } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import AutoTyped from '../AutoTyped.jsx'


const Dashboard = () => {

  return (
    <div>
        <Container>
          <AutoTyped/>
            <div className=" grid grid-cols-1 md:grid-cols-3 grid-rows-3  gap-5">
                <div className="col-span-1 row-span-1">
                <ModuleBtn icon={<HiCircleStack className='w-10 h-10'/>} name={"PRODUCT"} url={"/product"}/>
                </div>
                <div className="col-span-1 ">
                <ModuleBtn icon={<HiComputerDesktop className='w-10 h-10'/>} name={"SALE"} url={"/sale"}/>
                </div>
                <div className="col-span-1 ">
                <ModuleBtn icon={<HiDocumentDuplicate className='w-10 h-10'/>} name={"VOUCHER"} url={"/voucher"}/>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Dashboard