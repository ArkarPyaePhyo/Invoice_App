import React from 'react'
import Container from '../components/Container'
import ModuleBtn from '../components/ModuleBtn'
import { HiChevronRight, HiCircleStack, HiComputerDesktop, HiDocumentDuplicate, HiExclamationCircle, HiUser } from 'react-icons/hi2'
import AutoTyped from '../AutoTyped.jsx'
import Logout from '../components/Logout.jsx'


const Dashboard = () => {

  return (
    <div>
        <Container>
          <AutoTyped/>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="col-span-1 ">
                <ModuleBtn icon={<HiCircleStack className='w-10 h-10'/>} name={"PRODUCT"} url={"/dashboard/product"}/>
                </div>
                <div className="col-span-1 ">
                <ModuleBtn icon={<HiComputerDesktop className='w-10 h-10'/>} name={"SALE"} url={"/dashboard/sale"}/>
                </div>
                <div className="col-span-1 ">
                <ModuleBtn icon={<HiDocumentDuplicate className='w-10 h-10'/>} name={"VOUCHER"} url={"/dashboard/voucher"}/>
                </div>
                <div className="col-span-1 ">
                <ModuleBtn icon={<HiUser className='w-10 h-10'/>} name={"USER PROFILE"} url={"/dashboard/user-profile"}/>
                </div>
            </div>
            <div>
              <Logout/>
            </div>
        </Container>
    </div>
  )
}

export default Dashboard