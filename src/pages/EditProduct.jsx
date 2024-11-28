import React from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumb'
import { HiCircleStack } from 'react-icons/hi2'
import EditProductCard from '../components/EditProductCard'

const EditProduct = () => {
  return (
    <section>
        <Container>
            <Breadcrumb currentPageTitle={"EditProduct"} links={[{previous_title:"Product",path:"/dashboard/product"}]} icons={<HiCircleStack className='size-4'/>}></Breadcrumb>
            <EditProductCard/>
        </Container>
    </section>
  )
}

export default EditProduct